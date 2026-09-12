<?php
require_once __DIR__ . '/../config/db.php';

header('Content-Type: application/json');

// Session start for auth checks
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Get request method
$method = $_SERVER['REQUEST_METHOD'];

// Parse route endpoints (e.g., /api/admin/login or /api/services)
$requestUri = $_SERVER['REQUEST_URI'];
$path = parse_url($requestUri, PHP_URL_PATH);
$segments = explode('/', trim($path, '/'));

// Find the segment after 'api'
$apiIndex = array_search('api', $segments);
$endpoint = '';
$subEndpoint = '';

if ($apiIndex !== false) {
    if (isset($segments[$apiIndex + 1])) {
        $endpoint = strtolower($segments[$apiIndex + 1]);
    }
    if (isset($segments[$apiIndex + 2])) {
        $subEndpoint = strtolower($segments[$apiIndex + 2]);
    }
} else {
    $endpoint = strtolower(end($segments));
}

// Clean endpoint from query string
$endpoint = explode('?', $endpoint)[0];
$subEndpoint = explode('?', $subEndpoint)[0];

$db = Database::getInstance()->getConnection();

// Auth check helper
function require_auth() {
    if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        exit();
    }
}

// Helper to read JSON payload
function get_json_payload() {
    return json_decode(file_get_contents('php://input'), true) ?? [];
}

// Helper to handle image file uploads
function handle_file_upload($file_input, $prefix = 'upload_') {
    if (!isset($_FILES[$file_input]) || $_FILES[$file_input]['error'] !== UPLOAD_ERR_OK) {
        return null;
    }

    $upload_dir = __DIR__ . '/../../uploads/';
    if (!file_exists($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }

    $file_tmp = $_FILES[$file_input]['tmp_name'];
    $file_name = $_FILES[$file_input]['name'];
    $file_size = $_FILES[$file_input]['size'];
    $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

    $allowed_exts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    if (!in_array($file_ext, $allowed_exts)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid file extension. Only JPG, PNG, WEBP, and SVG allowed.']);
        exit();
    }

    if ($file_size > 5 * 1024 * 1024) { // 5MB
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'File size exceeds 5MB limit.']);
        exit();
    }

    $new_name = $prefix . uniqid() . '.' . $file_ext;
    if (move_uploaded_file($file_tmp, $upload_dir . $new_name)) {
        return '/uploads/' . $new_name;
    }

    return null;
}

// ROUTING
try {
    // 1. ADMIN AUTH ENDPOINTS
    if ($endpoint === 'admin') {
        if ($subEndpoint === 'login' && $method === 'POST') {
            $input = get_json_payload();
            $username = trim($input['username'] ?? '');
            $password = trim($input['password'] ?? '');

            if (empty($username) || empty($password)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Missing username or password']);
                exit();
            }

            $stmt = $db->prepare("SELECT * FROM admin_users WHERE username = ?");
            $stmt->execute([$username]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password_hash'])) {
                $_SESSION['admin_logged_in'] = true;
                $_SESSION['admin_id'] = $user['id'];
                $_SESSION['admin_username'] = $user['username'];
                echo json_encode([
                    'success' => true, 
                    'message' => 'Login successful', 
                    'user' => ['username' => $user['username']]
                ]);
            } else {
                http_response_code(401);
                echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
            }
            exit();
        }

        if ($subEndpoint === 'check' && $method === 'GET') {
            $authenticated = isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true;
            echo json_encode([
                'success' => true, 
                'authenticated' => $authenticated,
                'user' => $authenticated ? ['username' => $_SESSION['admin_username']] : null
            ]);
            exit();
        }

        if ($subEndpoint === 'logout' && $method === 'POST') {
            $_SESSION = [];
            if (ini_get("session.use_cookies")) {
                $params = session_get_cookie_params();
                setcookie(session_name(), '', time() - 42000,
                    $params["path"], $params["domain"],
                    $params["secure"], $params["httponly"]
                );
            }
            session_destroy();
            echo json_encode(['success' => true, 'message' => 'Logout successful']);
            exit();
        }

        if ($subEndpoint === 'profile' && $method === 'PUT') {
            require_auth();
            $input = get_json_payload();
            $current_pwd = $input['current_password'] ?? '';
            $new_pwd = $input['new_password'] ?? '';

            if (empty($current_pwd) || empty($new_pwd)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Missing password fields']);
                exit();
            }

            $stmt = $db->prepare("SELECT password_hash FROM admin_users WHERE id = ?");
            $stmt->execute([$_SESSION['admin_id']]);
            $hash = $stmt->fetchColumn();

            if (password_verify($current_pwd, $hash)) {
                $new_hash = password_hash($new_pwd, PASSWORD_BCRYPT);
                $update = $db->prepare("UPDATE admin_users SET password_hash = ? WHERE id = ?");
                $update->execute([$new_hash, $_SESSION['admin_id']]);
                echo json_encode(['success' => true, 'message' => 'Password updated successfully']);
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Incorrect current password']);
            }
            exit();
        }
    }

    // 2. SERVICES ENDPOINTS
    if ($endpoint === 'services') {
        if ($method === 'GET') {
            $stmt = $db->query("SELECT * FROM services ORDER BY order_index ASC");
            echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
        } elseif ($method === 'POST') {
            require_auth();
            $input = get_json_payload();
            
            // Support form-data file upload or normal JSON
            $image_url = handle_file_upload('image', 'service_') ?? $input['image_url'] ?? '';

            $stmt = $db->prepare("INSERT INTO services (slug, name, icon, description, content, image_url, order_index) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $input['slug'],
                $input['name'],
                $input['icon'] ?? 'FaRunning',
                $input['description'] ?? '',
                $input['content'] ?? '',
                $image_url,
                intval($input['order_index'] ?? 0)
            ]);
            echo json_encode(['success' => true, 'message' => 'Service created successfully']);
        } elseif ($method === 'PUT') {
            require_auth();
            $input = get_json_payload();
            
            $image_url = handle_file_upload('image', 'service_') ?? $input['image_url'] ?? '';

            $stmt = $db->prepare("UPDATE services SET name = ?, icon = ?, description = ?, content = ?, image_url = ?, order_index = ? WHERE slug = ?");
            $stmt->execute([
                $input['name'],
                $input['icon'] ?? 'FaRunning',
                $input['description'] ?? '',
                $input['content'] ?? '',
                $image_url,
                intval($input['order_index'] ?? 0),
                $input['slug']
            ]);
            echo json_encode(['success' => true, 'message' => 'Service updated successfully']);
        } elseif ($method === 'DELETE') {
            require_auth();
            $slug = $_GET['slug'] ?? '';
            $stmt = $db->prepare("DELETE FROM services WHERE slug = ?");
            $stmt->execute([$slug]);
            echo json_encode(['success' => true, 'message' => 'Service deleted successfully']);
        }
        exit();
    }

    // 3. DOCTORS ENDPOINTS
    if ($endpoint === 'doctors') {
        if ($method === 'GET') {
            $stmt = $db->query("SELECT * FROM doctors");
            echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
        } elseif ($method === 'POST') {
            require_auth();
            $input = get_json_payload();
            $stmt = $db->prepare("INSERT INTO doctors (id, name, qualification, experience, specialty, bio, initials, accent) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $input['id'],
                $input['name'],
                $input['qualification'] ?? '',
                $input['experience'] ?? '',
                $input['specialty'] ?? '',
                $input['bio'] ?? '',
                $input['initials'] ?? '',
                $input['accent'] ?? 'from-[#D4AF37] to-[#8b6b1a]'
            ]);
            echo json_encode(['success' => true, 'message' => 'Doctor created successfully']);
        } elseif ($method === 'PUT') {
            require_auth();
            $input = get_json_payload();
            $stmt = $db->prepare("UPDATE doctors SET name = ?, qualification = ?, experience = ?, specialty = ?, bio = ?, initials = ?, accent = ? WHERE id = ?");
            $stmt->execute([
                $input['name'],
                $input['qualification'] ?? '',
                $input['experience'] ?? '',
                $input['specialty'] ?? '',
                $input['bio'] ?? '',
                $input['initials'] ?? '',
                $input['accent'] ?? 'from-[#D4AF37] to-[#8b6b1a]',
                $input['id']
            ]);
            echo json_encode(['success' => true, 'message' => 'Doctor updated successfully']);
        } elseif ($method === 'DELETE') {
            require_auth();
            $id = $_GET['id'] ?? '';
            $stmt = $db->prepare("DELETE FROM doctors WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true, 'message' => 'Doctor deleted successfully']);
        }
        exit();
    }

    // 4. TESTIMONIALS ENDPOINTS
    if ($endpoint === 'testimonials') {
        if ($method === 'GET') {
            $stmt = $db->query("SELECT * FROM testimonials ORDER BY id DESC");
            echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
        } elseif ($method === 'POST') {
            require_auth();
            $input = get_json_payload();
            $stmt = $db->prepare("INSERT INTO testimonials (name, role, quote, rating) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $input['name'],
                $input['role'] ?? '',
                $input['quote'] ?? $input['review'] ?? '',
                intval($input['rating'] ?? 5)
            ]);
            echo json_encode(['success' => true, 'message' => 'Testimonial created successfully']);
        } elseif ($method === 'PUT') {
            require_auth();
            $input = get_json_payload();
            $stmt = $db->prepare("UPDATE testimonials SET name = ?, role = ?, quote = ?, rating = ? WHERE id = ?");
            $stmt->execute([
                $input['name'],
                $input['role'] ?? '',
                $input['quote'] ?? $input['review'] ?? '',
                intval($input['rating'] ?? 5),
                intval($input['id'])
            ]);
            echo json_encode(['success' => true, 'message' => 'Testimonial updated successfully']);
        } elseif ($method === 'DELETE') {
            require_auth();
            $id = intval($_GET['id'] ?? 0);
            $stmt = $db->prepare("DELETE FROM testimonials WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true, 'message' => 'Testimonial deleted successfully']);
        }
        exit();
    }

    // 5. GALLERY ENDPOINTS
    if ($endpoint === 'gallery') {
        if ($method === 'GET') {
            $stmt = $db->query("SELECT * FROM gallery ORDER BY id DESC");
            echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
        } elseif ($method === 'POST') {
            require_auth();
            // Handle file upload
            $image_url = handle_file_upload('image', 'gallery_');
            if (!$image_url) {
                // Check JSON fallback
                $input = get_json_payload();
                $image_url = $input['image_url'] ?? '';
            }

            if (empty($image_url)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Image upload required.']);
                exit();
            }

            // Read variables from POST (if uploaded via form-data)
            $title = $_POST['title'] ?? $input['title'] ?? '';
            $tag = $_POST['tag'] ?? $input['tag'] ?? 'Facility';
            $h = $_POST['h'] ?? $input['h'] ?? 'medium';

            $stmt = $db->prepare("INSERT INTO gallery (title, tag, image_url, h) VALUES (?, ?, ?, ?)");
            $stmt->execute([$title, $tag, $image_url, $h]);
            echo json_encode(['success' => true, 'message' => 'Gallery image uploaded successfully', 'data' => ['image_url' => $image_url]]);
        } elseif ($method === 'DELETE') {
            require_auth();
            $id = intval($_GET['id'] ?? 0);
            
            // Delete file from disk first
            $stmt = $db->prepare("SELECT image_url FROM gallery WHERE id = ?");
            $stmt->execute([$id]);
            $row = $stmt->fetch();
            if ($row && !empty($row['image_url'])) {
                $file = __DIR__ . '/../..' . $row['image_url'];
                if (file_exists($file) && is_file($file)) {
                    unlink($file);
                }
            }

            $stmt = $db->prepare("DELETE FROM gallery WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true, 'message' => 'Gallery image deleted successfully']);
        }
        exit();
    }

    // 6. FAQ ENDPOINTS
    if ($endpoint === 'faq') {
        if ($method === 'GET') {
            $stmt = $db->query("SELECT * FROM faq ORDER BY order_index ASC");
            echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
        } elseif ($method === 'POST') {
            require_auth();
            $input = get_json_payload();
            $stmt = $db->prepare("INSERT INTO faq (question, answer, category, order_index) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $input['question'] ?? $input['q'] ?? '',
                $input['answer'] ?? $input['a'] ?? '',
                $input['category'] ?? 'General',
                intval($input['order_index'] ?? 0)
            ]);
            echo json_encode(['success' => true, 'message' => 'FAQ created successfully']);
        } elseif ($method === 'PUT') {
            require_auth();
            $input = get_json_payload();
            $stmt = $db->prepare("UPDATE faq SET question = ?, answer = ?, category = ?, order_index = ? WHERE id = ?");
            $stmt->execute([
                $input['question'] ?? $input['q'] ?? '',
                $input['answer'] ?? $input['a'] ?? '',
                $input['category'] ?? 'General',
                intval($input['order_index'] ?? 0),
                intval($input['id'])
            ]);
            echo json_encode(['success' => true, 'message' => 'FAQ updated successfully']);
        } elseif ($method === 'DELETE') {
            require_auth();
            $id = intval($_GET['id'] ?? 0);
            $stmt = $db->prepare("DELETE FROM faq WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true, 'message' => 'FAQ deleted successfully']);
        }
        exit();
    }

    // 7. APPOINTMENTS ENDPOINTS
    if ($endpoint === 'appointments') {
        if ($method === 'GET') {
            require_auth();
            $stmt = $db->query("SELECT * FROM appointments ORDER BY created_at DESC");
            echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
        } elseif ($method === 'POST') {
            // Patient booking (No auth required)
            $input = get_json_payload();
            
            if (empty($input['name']) || empty($input['email']) || empty($input['phone']) || empty($input['date']) || empty($input['time'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Missing required fields']);
                exit();
            }

            $stmt = $db->prepare("INSERT INTO appointments (patient_name, patient_email, patient_phone, preferred_date, preferred_time, service_slug, doctor_id, notes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending')");
            $stmt->execute([
                htmlspecialchars(strip_tags($input['name'])),
                filter_var($input['email'], FILTER_VALIDATE_EMAIL),
                htmlspecialchars(strip_tags($input['phone'])),
                htmlspecialchars(strip_tags($input['date'])),
                htmlspecialchars(strip_tags($input['time'])),
                htmlspecialchars(strip_tags($input['service'] ?? '')),
                htmlspecialchars(strip_tags($input['doctor'] ?? '')),
                htmlspecialchars(strip_tags($input['notes'] ?? ''))
            ]);
            echo json_encode(['success' => true, 'message' => 'Appointment request submitted successfully']);
        } elseif ($method === 'PUT') {
            require_auth();
            $input = get_json_payload();
            $stmt = $db->prepare("UPDATE appointments SET status = ?, patient_name = ?, patient_phone = ?, patient_email = ?, preferred_date = ?, preferred_time = ?, notes = ? WHERE id = ?");
            $stmt->execute([
                $input['status'] ?? 'Pending',
                $input['patient_name'] ?? '',
                $input['patient_phone'] ?? '',
                $input['patient_email'] ?? '',
                $input['preferred_date'] ?? '',
                $input['preferred_time'] ?? '',
                $input['notes'] ?? '',
                intval($input['id'])
            ]);
            echo json_encode(['success' => true, 'message' => 'Appointment updated successfully']);
        } elseif ($method === 'DELETE') {
            require_auth();
            $id = intval($_GET['id'] ?? 0);
            $stmt = $db->prepare("DELETE FROM appointments WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true, 'message' => 'Appointment deleted successfully']);
        }
        exit();
    }

    // 8. CONTACT MESSAGES ENDPOINTS
    if ($endpoint === 'contact') {
        if ($method === 'GET') {
            require_auth();
            $stmt = $db->query("SELECT * FROM contact_messages ORDER BY created_at DESC");
            echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
        } elseif ($method === 'POST') {
            // Patient submission (No auth required)
            $input = get_json_payload();
            if (empty($input['name']) || empty($input['email']) || empty($input['message'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Missing required fields']);
                exit();
            }

            $stmt = $db->prepare("INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)");
            $stmt->execute([
                htmlspecialchars(strip_tags($input['name'])),
                filter_var($input['email'], FILTER_VALIDATE_EMAIL),
                htmlspecialchars(strip_tags($input['phone'] ?? '')),
                htmlspecialchars(strip_tags($input['subject'] ?? 'General Inquiry')),
                htmlspecialchars(strip_tags($input['message']))
            ]);
            echo json_encode(['success' => true, 'message' => 'Message submitted successfully']);
        } elseif ($method === 'PUT') {
            require_auth();
            $input = get_json_payload();
            $stmt = $db->prepare("UPDATE contact_messages SET is_read = ? WHERE id = ?");
            $stmt->execute([
                intval($input['is_read'] ?? 1),
                intval($input['id'])
            ]);
            echo json_encode(['success' => true, 'message' => 'Message updated successfully']);
        } elseif ($method === 'DELETE') {
            require_auth();
            $id = intval($_GET['id'] ?? 0);
            $stmt = $db->prepare("DELETE FROM contact_messages WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true, 'message' => 'Message deleted successfully']);
        }
        exit();
    }

    // 9. SETTINGS ENDPOINTS
    if ($endpoint === 'settings') {
        if ($method === 'GET') {
            $stmt = $db->query("SELECT setting_key, setting_value FROM settings");
            $settings = [];
            while ($row = $stmt->fetch()) {
                $settings[$row['setting_key']] = $row['setting_value'];
            }
            echo json_encode(['success' => true, 'data' => $settings]);
        } elseif ($method === 'PUT') {
            require_auth();
            $input = get_json_payload();
            
            // If upload logo file exists (via multipart/form-data)
            $logo_url = handle_file_upload('logo_file', 'logo_');
            if ($logo_url) {
                $input['logo'] = $logo_url;
            }

            // Handle hero background image upload
            $hero_image_url = handle_file_upload('hero_image_file', 'hero_');
            if ($hero_image_url) {
                $input['hero_image'] = $hero_image_url;
            }

            // Save key-value config
            $stmt = $db->prepare("INSERT INTO settings (setting_key, setting_value, group_name) VALUES (?, ?, 'general') ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)");
            foreach ($input as $key => $value) {
                if (is_array($value)) {
                    $value = json_encode($value);
                }
                $stmt->execute([$key, $value]);
            }
            echo json_encode(['success' => true, 'message' => 'Settings updated successfully', 'data' => $input]);
        }
        exit();
    }

    // Default 404
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Endpoint not found']);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Internal server error: ' . $e->getMessage()]);
}

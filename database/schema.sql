-- MySQL Schema for PROACTIVE Premium Physiotherapy & Rehabilitation Clinic

CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value TEXT,
  group_name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(50),
  description TEXT,
  content TEXT,
  image_url VARCHAR(255),
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS doctors (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  qualification VARCHAR(100),
  experience VARCHAR(50),
  specialty VARCHAR(100),
  bio TEXT,
  initials VARCHAR(10),
  accent VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150),
  tag VARCHAR(50),
  image_url VARCHAR(255),
  h VARCHAR(10) DEFAULT 'medium'
);

CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100),
  quote TEXT NOT NULL,
  rating INT DEFAULT 5
);

CREATE TABLE IF NOT EXISTS faq (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(50) DEFAULT 'General',
  order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_name VARCHAR(100) NOT NULL,
  patient_email VARCHAR(100) NOT NULL,
  patient_phone VARCHAR(50) NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time VARCHAR(20) NOT NULL,
  service_slug VARCHAR(100),
  doctor_id VARCHAR(100),
  notes TEXT,
  status VARCHAR(20) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(150),
  message TEXT NOT NULL,
  is_read TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed default admin credentials (username: admin, password: admin@123)
INSERT INTO admin_users (username, password_hash)
VALUES ('admin', '$2y$10$9TkVwu8toRPu15Z9nmyZNexrDgti7mt3rnxUcCeMth40biFkMfgzK')
ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash);

-- Seed default settings
INSERT INTO settings (setting_key, setting_value, group_name) VALUES
('logo', '/src/assets/logo.webp', 'general'),
('hero_image', '/src/assets/hero.webp', 'general'),
('website_name', 'ProActive Physiotherapy and Sports Rehab', 'general'),
('hero_headline', 'ProActive\nMOVE BETTER.\nLIVE STRONGER.', 'hero'),
('hero_subtitle', 'ProActive is a premium physiotherapy and sports rehabilitation clinic where clinical excellence meets personal attention. We design personalized, evidence-based healing plans for athletes and individuals to restore movement and strength.', 'hero'),
('about_title', 'A Walk Through ProActive.', 'about'),
('about_subtitle', 'Sleek design, state-of-the-art clinical equipment, and dedicated recovery spaces.', 'about'),
('about_content', 'At ProActive, we provide expert, senior-led physical therapy designed for permanent outcomes. Under the guidance of Dr. B. Selvakumar, we combine advanced manual therapy, sports rehabilitation, and cutting-edge electrotherapy modalities to accelerate your healing.', 'about'),
('footer_text', '© 2026 ProActive Physiotherapy and Sports Rehab. All rights reserved.', 'general'),
('contact_email', 'proactiveselvakumar@gmail.com', 'contact'),
('contact_phone', '9578678917', 'contact'),
('contact_address', 'Door No. 1 & 2, 1st Street, Kasthuribai Gandhi Nagar, Uppilipalayam, Coimbatore, Tamil Nadu – 641015', 'contact'),
('business_hours', 'Mon - Sat: 8 AM - 8 PM', 'contact'),
('social_instagram', 'https://instagram.com/proactivephysio_cbe', 'social'),
('social_facebook', 'https://facebook.com/proactivephysio_cbe', 'social'),
('social_linkedin', 'https://linkedin.com/company/proactivephysio_cbe', 'social'),
('seo_title', 'ProActive Physiotherapy and Sports Rehab | Coimbatore', 'seo'),
('seo_description', 'Premium physiotherapy and sports rehabilitation clinic in Coimbatore. Led by Dr. B. Selvakumar (MPT Sports), specializing in pain management, sports rehab, orthopedic, and post-surgical recovery.' , 'seo')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

-- Seed services
INSERT INTO services (slug, name, icon, description, content, order_index) VALUES
('pain-management', 'Pain Management', 'FaHeartbeat', 'Rapid, evidence-based relief from acute and chronic pain.', 'A clinical, multi-modal approach combining diagnostic assessment, joint decompression, electrotherapy, and soft-tissue mobilization to break the chronic pain cycle and restore fluid, pain-free movement.', 1),
('sports-rehabilitation', 'Sports Rehabilitation', 'FaRunning', 'Performance-oriented recovery and biomechanical correction.', 'Engineered for athletes of all levels. We combine high-performance strengthening, functional motion analysis, and milestone-based testing to ensure a safe, robust return to active competition.', 2),
('orthopedic-rehabilitation', 'Orthopedic Rehabilitation', 'FaBone', 'Restore joint stability, bone density, and muscle balance.', 'Comprehensive treatment for musculoskeletal conditions, including arthritis, disc pathologies, fractures, and severe sprains. Designed to rebuild bone alignment and joint mechanics.', 3),
('neurological-rehabilitation', 'Neurological Rehabilitation', 'FaBrain', 'Regain coordinate control, balance, and physical autonomy.', 'Specialized neurological physiotherapy for stroke recovery, Parkinson''s disease, balance disorders, and nerve injuries, leveraging neuroplasticity to restore motor control.', 4),
('manual-therapy', 'Manual Therapy', 'FaHandsHelping', 'Hands-on clinical joint mobilization and manipulation.', 'Highly specific joint mobilization, myofascial release, and passive stretching performed by senior clinical hands to release structural locks and calm hyperactive tissues.', 5),
('exercise-therapy', 'Exercise Therapy', 'FaDumbbell', 'Prescriptive corrective exercise for structural longevity.', 'Individually tailored therapeutic exercise regimens focused on correcting muscle imbalances, strengthening stabilizers, and establishing long-term functional posture.', 6),
('electrotherapy', 'Electrotherapy', 'FaBolt', 'Advanced clinical modalities for accelerated healing.', 'State-of-the-art non-invasive modalities including Interferential Therapy (IFT), TENS, therapeutic ultrasound, and muscle stimulation to manage severe pain and accelerate cellular repair.', 7),
('post-surgical-rehabilitation', 'Post Surgical Rehabilitation', 'FaBriefcaseMedical', 'Milestone-driven recovery from surgery to full function.', 'Structured rehabilitation following orthopedic and spinal surgeries (ACL reconstruction, total knee/hip replacement, spinal fusion, arthroscopy) in close coordination with your surgeon.', 8)
ON DUPLICATE KEY UPDATE name=VALUES(name), icon=VALUES(icon), description=VALUES(description), content=VALUES(content), order_index=VALUES(order_index);

-- Seed doctors
INSERT INTO doctors (id, name, qualification, experience, specialty, bio, initials, accent) VALUES
('dr-b-selvakumar', 'Dr. B. Selvakumar', 'MPT (Sports)', '3+ Years', 'Sports Physiotherapy & Advanced Musculoskeletal Rehab', 'Dr. B. Selvakumar is a pioneering Sports Physiotherapist with over a decade of clinical experience guiding athletes and individuals back to peak performance. Holding a Master of Physiotherapy in Sports, he specializes in biomechanical dysfunction correction, manual therapy, and milestone-based rehabilitation protocols.', 'BS', 'from-blue-brand to-navy-deep')
ON DUPLICATE KEY UPDATE name=VALUES(name), qualification=VALUES(qualification), experience=VALUES(experience), specialty=VALUES(specialty), bio=VALUES(bio), initials=VALUES(initials), accent=VALUES(accent);

-- Seed testimonials
INSERT INTO testimonials (name, role, quote, rating) VALUES
('Sanjay Arumugam', 'Patient', 'The physiotherapist was patient and attentive to my concerns. I had a great experience with the physiotherapy sessions. The treatment plan was effective, and I noticed steady improvement in my mobility and strength. Thank you for the excellent care.', 5),
('Ranji Rahul', 'Patient', 'It''s a complete magic... I never thought I could recover from frozen shoulder. Been to two orthos and two physios in the past. But nothing worked out..', 5),
('Udhaya S', 'Patient', 'I came here for stroke rehabilitation, and I''m really grateful for the care I received. Dr. Selvakumar was kind, patient, and always motivated me during my recovery. I can see a big improvement in my strength and movement. Thank you 😊.', 5),
('Dharick Dharick', 'Patient', 'The clinic is well-maintained, and the staff are friendly and supportive. Thanks to their expertise and personalized treatment, I experienced significant improvement in my pain and mobility. I would highly recommend this center.', 5),
('Wilson', 'Patient', 'Excellent place for physiotherapy and rehabilitation. The therapists focus on long-term recovery rather than just temporary pain relief.', 5)
ON DUPLICATE KEY UPDATE name=VALUES(name), role=VALUES(role), quote=VALUES(quote), rating=VALUES(rating);

-- Seed gallery
INSERT INTO gallery (title, tag, image_url, h) VALUES
('Advanced Physiotherapy Treatment Bay', 'Treatment Suite', '/src/assets/physio_studio_1.webp', 'medium'),
('Electrotherapy & Pain Management Suite', 'Clinical Modality', '/src/assets/physio_therapy_2.webp', 'short'),
('Strength & Conditioning Lab', 'Movement Studio', '/src/assets/movement_studio_3.webp', 'tall'),
('Rehabilitation & Movement Studio', 'Facility', '/src/assets/hero.webp', 'medium'),
('ProActive Official Signage & Clinic Front', 'Branding', '/src/assets/logo.webp', 'short')
ON DUPLICATE KEY UPDATE title=VALUES(title), tag=VALUES(tag), image_url=VALUES(image_url), h=VALUES(h);

-- Seed FAQ
INSERT INTO faq (question, answer, category, order_index) VALUES
('Do I need a doctor''s referral to start physiotherapy?', 'No referral is required. You can book a consultation directly and our therapist will assess whether physiotherapy is right for you — and coordinate with your doctor when needed.', 'General', 1),
('How long is each session?', 'Initial assessments run 60 minutes so we can build a complete picture of your condition. Follow-up sessions are typically 45 minutes.', 'General', 2),
('How many sessions will I need?', 'It depends on your condition, goals and how your body responds. Most patients see meaningful improvement within 4–8 sessions; complex or post-surgical cases may require a longer program.', 'General', 3),
('Do you offer home visits?', 'Absolutely. Our home physiotherapy program brings senior therapists and portable equipment to your door — ideal for post-surgical, elderly or mobility-limited patients.', 'General', 4),
('What should I wear to my first appointment?', 'Comfortable, loose clothing that allows access to the area being treated. We also have private changing rooms and gowns available.', 'General', 5),
('Is dry needling painful?', 'Most patients feel only a brief pinch followed by a mild ache. Our therapist is certified in dry needling and always works within your comfort.', 'General', 6),
('Can I book an appointment online?', 'Yes — our Book Appointment page lets you select your service, date and time in under a minute. Confirmation arrives instantly.', 'General', 7)
ON DUPLICATE KEY UPDATE question=VALUES(question), answer=VALUES(answer), category=VALUES(category), order_index=VALUES(order_index);

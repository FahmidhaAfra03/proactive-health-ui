export default function MapComponent() {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.331201449339!2d77.0016487!3d11.0003058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859ec1a49930f%3A0x6b77b72db7ebec18!2sUppilipalayam%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="absolute inset-0 h-full w-full object-cover opacity-30 pointer-events-auto"
    />
  );
}

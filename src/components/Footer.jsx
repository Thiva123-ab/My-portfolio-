export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Thiva. Designed &amp; built with care.</p>
      <a href="#hero" className="footer-top" data-cursor="hover">
        Back to top ↑
      </a>
    </footer>
  );
}

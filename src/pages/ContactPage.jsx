import Seo from "../components/Seo.jsx";
import Contact from "../components/Contact.jsx";

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact"
        description="Email, WhatsApp, LinkedIn, and GitHub for Thivanka Tharuka — Software Engineering intern candidate."
        path="/contact"
      />
      <div className="page-section-pad">
        <Contact />
      </div>
    </>
  );
}

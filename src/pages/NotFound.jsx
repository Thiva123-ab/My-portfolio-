import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function NotFound() {
  return (
    <>
      <Seo title="Not found" path="/404" />
      <section className="section page-section">
        <h1 className="section-title">Page not found</h1>
        <p className="page-lead">That route is not on this portfolio.</p>
        <Link to="/" className="btn btn-primary" data-cursor="hover">Home</Link>
      </section>
    </>
  );
}

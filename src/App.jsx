import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectCase from "./pages/ProjectCase.jsx";
import Experience from "./pages/Experience.jsx";
import Certifications from "./pages/Certifications.jsx";
import ResumePage from "./pages/ResumePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import HackerRank from "./pages/HackerRank.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<ProjectCase />} />
        <Route path="experience" element={<Experience />} />
        <Route path="certifications" element={<Certifications />} />
        <Route path="resume" element={<ResumePage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="hackerrank" element={<HackerRank />} />
        <Route path="work" element={<Navigate to="/projects" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

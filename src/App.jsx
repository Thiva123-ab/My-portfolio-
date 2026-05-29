import Background from "./components/Background.jsx";
import Cursor from "./components/Cursor.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Loader from "./components/Loader.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Work from "./components/Work.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Background />
      <Cursor />
      <ScrollProgress />
      <Loader />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

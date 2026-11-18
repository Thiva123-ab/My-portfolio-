import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Background from "./Background.jsx";
import Cursor from "./Cursor.jsx";
import ScrollProgress from "./ScrollProgress.jsx";
import Loader from "./Loader.jsx";
import VoiceIntro from "./VoiceIntro.jsx";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";
import CommandPalette from "./CommandPalette.jsx";

export default function Layout() {
  const { pathname, hash } = useLocation();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      return localStorage.getItem("thiva_sound_pref") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 120);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("thiva_sound_pref", String(next));
      } catch {
        // storage disabled
      }
      return next;
    });
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Background />
      <Cursor />
      <ScrollProgress />
      <Loader />
      <CommandPalette isOpen={cmdOpen} onClose={setCmdOpen} />
      <Nav
        onOpenCmd={setCmdOpen}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />
      <main id="main-content">
        <Outlet />
      </main>
      <VoiceIntro soundEnabled={soundEnabled} onToggleSound={toggleSound} />
      <Footer />
    </>
  );
}

import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Background from "./Background.jsx";
import Cursor from "./Cursor.jsx";
import ScrollProgress from "./ScrollProgress.jsx";
import Loader from "./Loader.jsx";
import VoiceIntro from "./VoiceIntro.jsx";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Background />
      <Cursor />
      <ScrollProgress />
      <Loader />
      <VoiceIntro />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

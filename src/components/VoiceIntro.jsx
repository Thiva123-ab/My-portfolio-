import { useCallback, useEffect, useRef, useState } from "react";

const INTRO_TEXT =
  "Hi, I'm Thivanka Tharuka — a Full-Stack Developer and Designer.";

export default function VoiceIntro() {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const autoplayedRef = useRef(false);

  const pickVoice = useCallback(() => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    if (!voices.length) return null;
    return (
      voices.find((v) => /^en[-_](US|GB|IN|AU)/i.test(v.lang) && /google|natural|premium/i.test(v.name)) ||
      voices.find((v) => v.lang.toLowerCase().startsWith("en")) ||
      voices[0]
    );
  }, []);

  const speak = useCallback(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(INTRO_TEXT);
    u.rate = 0.98;
    u.pitch = 1;
    u.volume = 1;
    const voice = pickVoice();
    if (voice) u.voice = voice;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    synth.speak(u);
  }, [pickVoice]);

  const toggle = useCallback(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (synth.speaking) {
      synth.cancel();
      setSpeaking(false);
    } else {
      speak();
    }
  }, [speak]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);

    // Preload voices (they populate asynchronously in some browsers).
    pickVoice();
    window.speechSynthesis.onvoiceschanged = () => pickVoice();

    const playOnce = () => {
      if (autoplayedRef.current) return;
      autoplayedRef.current = true;
      speak();
    };

    // Try once the loader has cleared; if the browser blocks it, the first
    // user gesture below will start it instead.
    const timer = setTimeout(playOnce, 2200);

    const onGesture = () => playOnce();
    window.addEventListener("pointerdown", onGesture, { once: true });
    window.addEventListener("keydown", onGesture, { once: true });
    window.addEventListener("scroll", onGesture, { once: true, passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
      window.removeEventListener("scroll", onGesture);
      window.speechSynthesis.cancel();
    };
  }, [pickVoice, speak]);

  if (!supported) return null;

  return (
    <button
      type="button"
      className={`voice-intro ${speaking ? "is-speaking" : ""}`}
      onClick={toggle}
      data-cursor="hover"
      aria-label={speaking ? "Stop voice introduction" : "Play voice introduction"}
      title={speaking ? "Stop introduction" : "Play introduction"}
    >
      <span className="voice-bars" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <svg className="voice-speaker" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          d="M4 9v6h4l5 4V5L8 9H4Z"
          fill="currentColor"
        />
        <path
          d="M16 8.5a4 4 0 0 1 0 7M18.5 6a7.5 7.5 0 0 1 0 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}

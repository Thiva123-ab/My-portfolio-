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

    const en = voices.filter((v) => v.lang.toLowerCase().startsWith("en"));
    const pool = en.length ? en : voices;

    // Rank by how natural/clear the voice tends to be.
    const score = (v) => {
      const n = `${v.name} ${v.voiceURI}`.toLowerCase();
      let s = 0;
      if (/natural|neural|premium|enhanced|online/.test(n)) s += 60;
      if (/google/.test(n)) s += 40;
      if (/microsoft|aria|jenny|guy|ava|emma|libby|sonia/.test(n)) s += 35;
      if (/\b(samantha|daniel|karen|moira|tessa)\b/.test(n)) s += 25; // Apple voices
      if (/en[-_]us/i.test(v.lang)) s += 10;
      if (/en[-_]gb/i.test(v.lang)) s += 6;
      if (!v.localService) s += 8; // cloud voices are usually higher quality
      return s;
    };

    return [...pool].sort((a, b) => score(b) - score(a))[0] || voices[0];
  }, []);

  const speakNow = useCallback(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(INTRO_TEXT);
    u.rate = 0.92;
    u.pitch = 1.05;
    u.volume = 1;
    const voice = pickVoice();
    if (voice) {
      u.voice = voice;
      u.lang = voice.lang;
    }
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    synth.speak(u);
  }, [pickVoice]);

  // Make sure the (async) voice list is ready before speaking, so we get the
  // clear high-quality voice instead of the default robotic fallback.
  const speak = useCallback(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (synth.getVoices().length) {
      speakNow();
      return;
    }
    let tries = 0;
    const wait = setInterval(() => {
      tries += 1;
      if (synth.getVoices().length || tries > 20) {
        clearInterval(wait);
        speakNow();
      }
    }, 100);
  }, [speakNow]);

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

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const INTRO_TEXT =
  "Hi, I'm Thivanka Tharuka — a Full Stack Developer and Computer Science undergraduate at NSBM Green University.";

export default function VoiceIntro({ soundEnabled, onToggleSound }) {
  const [speaking, setSpeaking] = useState(false);

  const speakNow = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();

    const u = new SpeechSynthesisUtterance(INTRO_TEXT);
    u.rate = 0.95;
    u.pitch = 0.95;
    u.volume = 1;

    const voices = synth.getVoices();
    const enVoice = voices.find((v) => v.lang.startsWith("en") && !v.name.toLowerCase().includes("female"));
    if (enVoice) u.voice = enVoice;

    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);

    synth.speak(u);
  }, []);

  const handleToggle = () => {
    if (speaking) {
      window.speechSynthesis?.cancel();
      setSpeaking(false);
      return;
    }

    if (!soundEnabled) {
      onToggleSound();
    }
    speakNow();
  };

  return (
    <div className="voice-dock">
      <button
        type="button"
        className={`voice-pill ${speaking ? "speaking" : ""} ${soundEnabled ? "enabled" : ""}`}
        onClick={handleToggle}
        data-cursor="hover"
        aria-label="Play spoken introduction"
      >
        <span className="voice-icon-box">
          {speaking || soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
        </span>
        <span className="voice-label">
          {speaking ? "Playing Intro..." : "Voice Introduction"}
        </span>
      </button>
    </div>
  );
}

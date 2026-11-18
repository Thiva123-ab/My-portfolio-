import { useState, useEffect } from "react";

/**
 * Custom hook to get live Sri Lanka time (Asia/Colombo, UTC+5:30)
 * Hydration-safe: initializes with an SSR-friendly string, then computes on mount.
 */
export default function useSriLankaTime() {
  const [timeString, setTimeString] = useState("UTC+5:30");

  useEffect(() => {
    const update = () => {
      try {
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Colombo",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        setTimeString(formatter.format(new Date()));
      } catch {
        setTimeString("UTC+5:30");
      }
    };

    update();
    const interval = setInterval(update, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  return timeString;
}

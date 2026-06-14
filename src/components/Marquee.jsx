const ITEMS = ["Web Design", "React", "TypeScript", "AI Apps", "UI / UX", "Creative Code"];

export default function Marquee() {
  // Flat list of [text, ◆, text, ◆, ...], doubled for a seamless loop.
  const single = ITEMS.flatMap((item) => [item, "◆"]);
  const loop = [...single, ...single];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span key={i}>{item}</span>
        ))}
      </div>
    </div>
  );
}

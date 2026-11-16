const ITEMS = [
  "Full Stack Developer",
  "Java",
  "Spring Boot",
  "React",
  "Kotlin",
  "Open to Opportunities",
];

export default function Marquee() {
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

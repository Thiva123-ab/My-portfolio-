const ITEMS = [
  "Software Engineering Intern",
  "Java",
  "Spring Boot",
  "React",
  "Kotlin",
  "Open to internships",
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

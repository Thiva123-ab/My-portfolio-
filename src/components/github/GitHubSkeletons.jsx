import Card from "../Card.jsx";

export function ProfileCardSkeleton() {
  return (
    <Card className="gh-card gh-profile-card animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-white/10 shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-5 w-36 rounded bg-white/10" />
          <div className="h-3.5 w-24 rounded bg-white/5" />
        </div>
      </div>
      <div className="h-4 w-4/5 rounded bg-white/5 mb-4" />
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="h-8 rounded-lg bg-white/5" />
        <div className="h-8 rounded-lg bg-white/5" />
      </div>
    </Card>
  );
}

export function StatGridSkeleton() {
  return (
    <div className="gh-stat-grid">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="gh-stat-tile animate-pulse">
          <div className="h-4 w-16 rounded bg-white/10 mb-2" />
          <div className="h-7 w-20 rounded bg-white/15 mb-1" />
          <div className="h-3 w-12 rounded bg-white/5" />
        </Card>
      ))}
    </div>
  );
}

export function HeatmapSkeleton() {
  return (
    <Card className="gh-card gh-heatmap-card animate-pulse">
      <div className="h-6 w-48 rounded bg-white/10 mb-4" />
      <div className="h-32 rounded-xl bg-white/5 w-full" />
    </Card>
  );
}

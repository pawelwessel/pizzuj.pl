import PioneerBadge from "./PioneerBadge";

export default function AchievementsList({ achievements = [] }) {
  if (!achievements.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {achievements.includes("Pionier") && <PioneerBadge />}
    </div>
  );
}

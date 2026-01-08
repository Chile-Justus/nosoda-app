export default function StreakCard({ current, best }) {
  return (
    <div className="streak-card">
      <h2>
        <span>{current}</span> Days
      </h2>
      <div className="label">Current Streak</div>
      <div className="best">
        <div className="label">Best Streak</div>
        <h2>{best}</h2>
      </div>
    </div>
  );
}

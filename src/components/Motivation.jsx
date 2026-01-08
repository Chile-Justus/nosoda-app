export default function Motivation({ checkedIn }) {
  return (
    <div className="motivation">
      {checkedIn
        ? "Great job! Keep it going tomorrow!"
        : "Don’t break your streak today!"}
    </div>
  );
}

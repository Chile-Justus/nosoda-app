export default function CheckInButton({ checkedIn, onCheckIn }) {
  return (
    <button className="checkin-btn" onClick={onCheckIn}>
      {checkedIn ? "Checked In!" : "Check In"}
    </button>
  );
}

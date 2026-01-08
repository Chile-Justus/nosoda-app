import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import InstallButton from "./InstallButton";

import "./App.css";

// Sounds
import checkinSoundFile from "./sounds/checkin.mp3";
import milestoneSoundFile from "./sounds/milestone.mp3";

const checkinSound = new Audio(checkinSoundFile);
const milestoneSound = new Audio(milestoneSoundFile);

function App() {
  const today = new Date().toISOString().split("T")[0];

  const [animate, setAnimate] = useState(false);
  const [glow, setGlow] = useState(false);
  const [showPlusOne, setShowPlusOne] = useState(false);
  const [showMilestoneMsg, setShowMilestoneMsg] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("nosoda-data");
    return saved
      ? JSON.parse(saved)
      : {
          lastCheckInDate: null,
          currentStreak: 0,
          bestStreak: 0,
          history: [],
        };
  });

  // Update localStorage
  useEffect(() => {
    localStorage.setItem("nosoda-data", JSON.stringify(data));
  }, [data]);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const getMotivation = (streak) => {
    if (streak === 0) return "Let’s start your streak today!";
    if (streak < 3) return "Great start! Keep it going!";
    if (streak < 7) return "Awesome! You’re building momentum!";
    if (streak < 14) return "Amazing! Keep that streak alive!";
    return "Legendary! You’re unstoppable!";
  };

  const launchConfetti = (big = false) => {
    confetti({
      particleCount: big ? 200 : 100,
      spread: big ? 120 : 70,
      origin: { y: 0.6 },
      colors: ["#00e676", "#1de9b6", "#ffffff"],
    });
  };

  const handleCheckIn = () => {
    if (data.lastCheckInDate === today) return;

    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split("T")[0];

    const newStreak =
      data.lastCheckInDate === yesterday ? data.currentStreak + 1 : 1;

    const newBest = Math.max(data.bestStreak, newStreak);

    checkinSound.currentTime = 0;
    checkinSound.play();

    if (newStreak > data.bestStreak) {
      launchConfetti();
      setGlow(true);
      setTimeout(() => setGlow(false), 800);
    }

    const milestones = [7, 14, 30];
    if (milestones.includes(newStreak)) {
      launchConfetti(true);
      milestoneSound.currentTime = 0;
      milestoneSound.play();
      setShowMilestoneMsg(true);
      setShowBadge(true);

      setTimeout(() => setShowMilestoneMsg(false), 1500);
      setTimeout(() => setShowBadge(false), 2000);
    }

    setData({
      lastCheckInDate: today,
      currentStreak: newStreak,
      bestStreak: newBest,
      history: [today, ...data.history],
    });

    setAnimate(true);
    setShowPlusOne(true);

    setTimeout(() => setAnimate(false), 400);
    setTimeout(() => setShowPlusOne(false), 800);
  };

  const handleReset = () => {
    if (!window.confirm("Reset all streaks?")) return;

    setData({
      lastCheckInDate: null,
      currentStreak: 0,
      bestStreak: 0,
      history: [],
    });
  };

  const milestones = [7, 14, 30];
  const nextMilestone =
    milestones.find((m) => data.currentStreak < m) ?? 30;

  const progressPercent = Math.min(
    (data.currentStreak / nextMilestone) * 100,
    100
  );

  return (
    <div className="app">
      {/* Offline banner */}
      {!isOnline && (
        <div className="offline-banner">
          ⚠️ You are offline. Check-ins will be saved locally.
        </div>
      )}

      <h1>NoSoda</h1>

      <div className="card-wrapper">
        <div className={`card ${animate ? "pop" : ""} ${glow ? "glow" : ""}`}>
          <h2>
            <span>{data.currentStreak}</span> day streak
          </h2>
          <p className="muted">Best: {data.bestStreak}</p>
        </div>

        {showPlusOne && <div className="plus-one">+1 day</div>}
        {showBadge && <div className="streak-badge">🏆 Milestone!</div>}
      </div>

      {showMilestoneMsg && (
        <div className="milestone-msg">🎉 Milestone Achieved! 🎉</div>
      )}

      <div className="progress-bar-wrapper">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="milestone-text">
          {data.currentStreak} / {nextMilestone} days to next milestone
        </p>
      </div>

      <div className="motivation">
        <p>{getMotivation(data.currentStreak)}</p>
      </div>

      <button
        className="checkin-btn"
        onClick={handleCheckIn}
        disabled={data.lastCheckInDate === today}
      >
        {data.lastCheckInDate === today ? "Checked in today ✅" : "Check in"}
      </button>

      <button
        className="checkin-btn danger"
        onClick={handleReset}
      >
        Reset Streaks
      </button>

      <div className="history">
        <h3>Check-in History</h3>
        <ul>
          {data.history.length === 0
            ? <li>No check-ins yet</li>
            : data.history.map((date, idx) => (
                <li key={idx}>{date}</li>
              ))}
        </ul>
      </div>

      {/* Install button */}
      <InstallButton />
    </div>
  );
}

export default App;

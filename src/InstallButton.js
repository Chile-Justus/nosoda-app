// src/InstallButton.js
import React, { useEffect, useState } from "react";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIos, setIsIos] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(ios);

    // Detect if app is already installed
    const standalone = window.matchMedia("(display-mode: standalone)").matches;

    if (!standalone) {
      setShowButton(true);
    }

    // Listen for Android install prompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      console.log("User choice:", choiceResult.outcome);
      setDeferredPrompt(null);
      setShowButton(false);
    }
  };

  if (!showButton) return null;

  return (
    <div>
      {isIos ? (
        <p style={{ color: "#ff5722", fontWeight: "bold" }}>
          To install, tap the share button in Safari and select "Add to Home Screen"
        </p>
      ) : (
        <button
          onClick={handleInstall}
          style={{
            backgroundColor: "#ff5722",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Install App
        </button>
      )}
    </div>
  );
};

export default InstallButton;

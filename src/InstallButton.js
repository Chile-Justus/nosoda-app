import React, { useState, useEffect } from "react";

function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // delay showing the button by 2 seconds
      setTimeout(() => setShowButton(true), 2000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    console.log("User choice:", choiceResult.outcome);

    setDeferredPrompt(null);
    setShowButton(false);
  };

  if (!deferredPrompt || !showButton) return null;

  return (
    <button
      onClick={handleInstall}
      className="install-btn slide-in"
    >
      Install NoSoda
    </button>
  );
}

export default InstallButton;

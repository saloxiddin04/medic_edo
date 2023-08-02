import React, { useState, useEffect } from "react";

const Timer = ({ onReset }) => {
  const [seconds, setSeconds] = useState(3600);

  useEffect(() => {
    const storedStartTime = sessionStorage.getItem("startTime");
    let startTime;

    if (storedStartTime) {
      startTime = new Date(storedStartTime);
      const now = new Date();
      const elapsedSeconds = Math.floor((now - startTime) / 1000);
      setSeconds(Math.max(0, 3600 - elapsedSeconds));
    } else {
      startTime = new Date();
      sessionStorage.setItem("startTime", startTime);
    }

    const intervalId = setInterval(() => {
      const now = new Date();
      const elapsedSeconds = Math.floor((now - startTime) / 1000);
      const remainingSeconds = Math.max(0, 3600 - elapsedSeconds);
      setSeconds(remainingSeconds);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    const pad = (num) => num.toString().padStart(2, "0");
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const handleReset = () => {
    sessionStorage.removeItem("startTime");
    setSeconds(3600);
    onReset();
  };

  return (
    <div>
      <h2 className="font-bold text-white">
        Timer:{" "}
        <span class="rounded-full bg-warning px-6 pb-1 pt-0.5 text-white ">
          {formatTime(seconds)}{" "}
        </span>
      </h2>
    </div>
  );
};

export default Timer;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startTimer, tick } from "../features/Timer/timerSlice";

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const Timer = () => {
  const dispatch = useDispatch();
  const { seconds, startTime } = useSelector(({ timer }) => timer);

  useEffect(() => {
    if (startTime === null) {
      dispatch(startTimer());
    }

    const intervalId = setInterval(() => {
      dispatch(tick());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, startTime]);

  useEffect(() => {
    const timerState = { seconds, startTime };
    sessionStorage.setItem("timerState", JSON.stringify(timerState));
  }, [seconds, startTime]);

  return (
    <div>
      <h2 className="text-lg text-white">
        Timer:{" "}
        <span class="rounded-full font-semibold bg-warning px-6 pb-1  text-white ">
          {formatTime(seconds)}
        </span>
      </h2>
    </div>
  );
};

export default Timer;

import React, { useState, useEffect } from "react";

const Timer = ({ addResponseToUserFunc }) => {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    // Set up an interval to increment the seconds
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // The empty dependency array ensures that the effect runs only once on mount

  if (seconds === 0) {
    addResponseToUserFunc();
  }

  return (
    <div className="m-2">
      <p>Timer: {seconds} seconds</p>
    </div>
  );
};

export default Timer;

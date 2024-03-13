import React, { useState, useEffect } from 'react';
// import { Home } from  "./front-end\src\components\api.js";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // let data = Home ()
      // setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    

    // Cleanup functie om de interval te stoppen bij het unmounten van het component
    return () => clearInterval(intervalId);
  }, []); // Lege dependency array zorgt ervoor dat useEffect alleen bij het mounten wordt uitgevoerd

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div>
      <h1>Timer: {formatTime(seconds)}</h1>
    </div>
  );
};

export default Timer;

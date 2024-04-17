// WaterUsage.tsx

import BarChart from "./BarChart";
import callAPI from "./get-sensor";
import destructurer from "./sensor-destructurer";
import React, { useState, useEffect } from "react";

const WaterUsage: React.FC = () => {
   const [pastDays, setPastDays] = useState<Array<number | null>>([]);
   const [error, setError] = useState<null | string>(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const data = await callAPI();
            if (data) {
               const parsedData = destructurer(data);
               if (parsedData !== null) {
                  // Find the index of the current day
                  const currentDayIndex = new Date().getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
                  // Adjust currentDayIndex to start from Monday (1)
                  const adjustedIndex = (currentDayIndex === 0) ? 6 : currentDayIndex - 1;
                  // Create a new array with the updated value for the current day and the rest of the days unchanged
                  const updatedPastDays = [...pastDays];
                  updatedPastDays[adjustedIndex] = parsedData;
                  setPastDays(updatedPastDays);
               } else {
                  setError("Error parsing data. Please try again later.");
               }
            } else {
               setError("Error fetching data. Please try again later.");
            }
         } catch (error) {
            setError("An error occurred. Please try again later.");
         }
      };

      // Call fetchData when the component mounts
      fetchData();

      // Set up interval to call fetchData every 10 seconds
      const timerId = setInterval(fetchData, 10000);

      // Cleanup function to clear the interval
      return () => clearInterval(timerId);
   }, []); // Empty dependency array ensures that the effect runs only once after mount

   return (
      <>
         {error && <p>{error}</p>}
         <BarChart data={pastDays} />
      </>
   );
};

export default WaterUsage;

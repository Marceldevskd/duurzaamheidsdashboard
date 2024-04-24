import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import callAPI from "./get-sensor";
import destructurer from "./sensor-destructurer";
import getDays from "./get-days"

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
                  // Update pastDays array with today's reading
                  setPastDays(parsedData);
                  const days = getDays();
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

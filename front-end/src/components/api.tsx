// import { useState, useEffect, Dispatch, SetStateAction } from "react";
// import styles from "../app/page.module.css";

// const API: React.FC = () => {
// 	const [amount, setAmount] = useState(null);
// 	const [error, setError] = useState<null | string>(null);

	

	

// 	useEffect(() => {
// 		const timerId = setInterval(async () => {
// 			const data = await callAPI();
// 			if (data)
// 				destructurer(data);
// 			else {
// 				setAmount(null);
// 				setError("Error fetching data. Please try again later.");
// 			}
// 		}, 10000);

// 		return () => clearInterval(timerId);
// 	}, []);

// 	useEffect(() => {
// 		const result = async () => {
// 			const data = await callAPI();
// 			if (data)
// 				destructurer(data);
// 			else {
// 				setAmount(null);
// 				setError("Error fetching data. Please try again later.");
// 			}
// 		}
// 		result()
// 	}, []);

// 	return (
// 		<>
// 			{error && <div className={styles.error}>{error}</div>}
// 			{amount && (
// 				<div className={styles.amount}>
// 					{amount}
// 					{/* Weergave van de verkregen sensorgegevens */}

// 				</div>
// 			)}
// 		</>
// 	);
// };

// export default API;
const API: React.FC = () => {
  const [amount, setAmount] = useState(null);
  const [error, setError] = useState<null | string>(null);

  async function callAPI() {
    try {
      const res = await fetch(
        `http://localhost:4000/get-readings?sensorName=Water-1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setError(null);
        console.log(data);
        return data;
      } else {
        throw new Error("Error fetching data. Please try again later.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Error fetching data. Please try again later.");
      if (error) throw new Error(error);
    }
  }

  function destructurer(data: any) {
    const currentDate = new Date();
    currentDate.setUTCHours(-1, 0, 0, 0); // Set current date to midnight (UTC+0)
    if (!data[0]) {
      return setError("");
    }
    const dataToday = data[data.length - 1];
    let todayTotalAmount;

    // Verwijder tijdzone-informatie uit dataToday.date
    const dataTodayDate = dataToday.date.split("T")[0];

    console.log(
      "Data datum:",
      dataTodayDate,
      "Huidige datum:",
      currentDate.toISOString().split("T")[0]
    );

    if (dataTodayDate === currentDate.toISOString().split("T")[0]) {
      todayTotalAmount = dataToday.totalAmount;
    } else {
      todayTotalAmount = 0;
    }
    setAmount(todayTotalAmount);
  }

  useEffect(() => {
    const timerId = setInterval(async () => {
      const data = await callAPI();
      if (data) destructurer(data);
      else {
        setAmount(null);
        setError("Error fetching data. Please try again later.");
      }
    }, 10000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const result = async () => {
      const data = await callAPI();
      if (data) destructurer(data);
      else {
        setAmount(null);
        setError("Error fetching data. Please try again later.");
      }
    };
    result();
  }, []);

  return (
    <>
      {error && <div className={styles.error}>{error}</div>}
      {amount && (
        <div className={styles.amount}>
          {amount}
          {/* Weergave van de verkregen sensorgegevens */}
        </div>
      )}
    </>
  );
};

export default API;


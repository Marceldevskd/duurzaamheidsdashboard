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


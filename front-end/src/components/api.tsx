import { useState, useEffect } from 'react';
import styles from '../app/page.module.css';

const API: React.FC = () => {
    const [amount, setAmount] = useState(null);
    const [error, setError] = useState(null);

    async function callAPI() {
        try {
            const res = await fetch(
                `http://localhost:4000/get-readings?sensorName=Water-1`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "http://localhost:3000"
                    },
                }
            );
            const data = await res.json();
            setError(null);
            return data;
        } catch (err) {
            console.error("Error fetching data:", err);
            throw new Error("Error fetching data. Please try again later.");
        }
    };

    function destructurer(data: any) {
        const currentDate = new Date();
        currentDate.setUTCHours(-1, 0, 0, 0); // Set current date to midnight (UTC+0)

        const dataToday = data[data.length - 1];
        let todayTotalAmount;

        // Verwijder tijdzone-informatie uit dataToday.date
        const dataTodayDate = dataToday.date.split('T')[0];

        console.log("Data datum:", dataTodayDate, "Huidige datum:", currentDate.toISOString().split('T')[0]);

        if (dataTodayDate === currentDate.toISOString().split('T')[0]) {
            todayTotalAmount = dataToday.totalAmount;
        } else {
            todayTotalAmount = 0;
        }
        setAmount(todayTotalAmount);
    }



    useEffect(() => {
        const timerId = setInterval(async () => {
            const data = await callAPI();
            destructurer(data);
        }, 10000);

        return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
        const result = async () => {
            const data = await callAPI();
            destructurer(data);
        }
        result()
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



















// import { useState, useEffect } from 'react';
// import styles from '../app/page.module.css';

// const API: React.FC = () => {
//     const [timerId, setTimerId] = useState(null);

//     const callAPI = async () => {
//         try {
//             const res = await fetch(
// 					`http://localhost:4000/get-readings?sensorName=Water-1`, // Voeg de query parameters toe aan de URL
//                 {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
// 								"Access-Control-Allow-Origin": "http://localhost:3000"
//                     },
//                 }
//             );
//             const data = await res.json();
//             console.log(data);
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     useEffect(() => {
//         // Start de timer wanneer het component gemonteerd wordt
//         const id: any = setInterval(callAPI, 10000); // Voer de API-call elke 10 seconden uit
//         setTimerId(id);

//         // Stop de timer wanneer het component wordt verwijderd
//         return () => {
//             if (timerId)
//                 clearInterval(timerId);
//         };
//     }, []); // Voer deze effect alleen uit bij de eerste render
//     useEffect(() => {
//         callAPI();
//     }, []);

//     return (
//         <>

//         </>
//     )
// }
// export default API


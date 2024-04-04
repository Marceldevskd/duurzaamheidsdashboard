import { useState, useEffect } from 'react';
import styles from '../app/page.module.css';

export default function Home() {
    const [timerId, setTimerId] = useState(null);

    const callAPI = async () => {
        try {
            const res = await fetch(
					`http://localhost:4000/get-readings?sensorName=test1`, // Voeg de query parameters toe aan de URL
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
								"Access-Control-Allow-Origin": "http://localhost:3000"
                    },
                }
            );
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        // Start de timer wanneer het component gemonteerd wordt
        const id = setInterval(callAPI, 10000); // Voer de API-call elke 10 seconden uit
        setTimerId(id);

        // Stop de timer wanneer het component wordt verwijderd
        return () => {
            clearInterval(timerId);
        };
    }, []); // Voer deze effect alleen uit bij de eerste render
}

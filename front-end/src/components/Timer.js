"use client"
import React, { useState, useEffect } from 'react';

const Timer = () => {
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setSeconds(prevSeconds => prevSeconds + 1);
		}, 1000);
		console.log(seconds);

		if (seconds % 10 == 0) {
			console.log("10 seconds have passed");
		}
	}, []);

	return (
		<div>	
			<h6>Timer: {seconds}</h6>
		</div>
	);
};

export default Timer;

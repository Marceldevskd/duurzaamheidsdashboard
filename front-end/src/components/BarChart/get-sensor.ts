// Fetching de data van de back-end
async function callAPI() {
	try {
		const res = await fetch(
			`https://duurzaam-dashboard.nl/api/get-readings?sensorName=Water-1`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin": "http://localhost:3000"
				},
			}
		);
		if (res.ok) {
			const data = await res.json();
			return data;
		} else {
			throw new Error("Error fetching data. Please try again later.");
		}
	} catch (err) {
		console.error("Error fetching data:", err);
		return null
	}
};

export default callAPI;
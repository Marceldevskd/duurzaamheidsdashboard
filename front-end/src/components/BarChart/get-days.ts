// deze functie zorgt dat de data op de goede plek kom te staan in de bar chart
function getDays() {
	const days = [];
	const daysOfWeek = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']
	let today = new Date();
	for (let i = 1; i <= 7; i++) {
		const index = (today.getDay() - i + 7) % 7; // Calculate the index for the previous days
		days.unshift(daysOfWeek[index]); // Add the day to the beginning of the array
	}

	return days;
}
export default getDays;
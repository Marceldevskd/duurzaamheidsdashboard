import { SensorProps } from '../types/sensorsTypes';
import { getTodayDate } from './get-today-date';

const calculateDailyLightReadings = (sensor: SensorProps, currentTime: number): SensorProps => {
	if (!sensor.lightReadings) {
		sensor.lightReadings = {
			totalTime: 0,
			timer: 0,
			lastUpdateUnix: Date.now(),
			sunShines: false,
			lightsOn: false,
			perDay: [],
		};
	}

	const today = new Date().toISOString().split('T')[0];
	const oneDayInMillis = 24 * 60 * 60 * 1000;
	let currentDayUnix = new Date(today).setHours(2, 0, 0, 0);
	let lastReading = sensor.lightReadings.lastUpdateUnix;

	// Loop through each day from the last reading to the current day
	while (lastReading <= currentTime) {
		const day = getTodayDate(new Date(currentDayUnix));
		let difference: number;

		if (currentDayUnix === new Date(today).setHours(2, 0, 0, 0)) {
			// If it's today, calculate the difference from the last reading to the current time
			difference = currentTime - lastReading;
		} else {
			// For past days, the difference is one full day
			difference = oneDayInMillis;
		}

		difference = difference / 1000; // Convert to seconds

		const existingEntry = sensor.lightReadings.perDay.find((item) => item.date === day);

		if (sensor.lightReadings.sunShines && sensor.lightReadings.lightsOn) {
			if (existingEntry) {
				existingEntry.unnecessaryLight += difference;
				sensor.lightReadings.totalTime += difference;
				sensor.lightReadings.timer += difference;
			} else {
				sensor.lightReadings.perDay.push({
					day: new Date(currentDayUnix).toLocaleDateString('nl-NL', { weekday: 'long' }),
					date: day,
					necessaryLight: 0,
					unnecessaryLight: difference
				});
				sensor.lightReadings.totalTime += difference;
				sensor.lightReadings.timer += difference;
			}
		} else if (!sensor.lightReadings.sunShines && sensor.lightReadings.lightsOn) {
			if (existingEntry) {
				existingEntry.necessaryLight += difference;
				sensor.lightReadings.timer = 0;
			} else {
				sensor.lightReadings.perDay.push({
					day: new Date(currentDayUnix).toLocaleDateString('nl-NL', { weekday: 'long' }),
					date: day,
					necessaryLight: difference,
					unnecessaryLight: 0
				});
				sensor.lightReadings.timer = 0;
			}
		}

		if (currentDayUnix === new Date(today).setHours(2, 0, 0, 0)) {
			// If today is processed, break the loop
			break;
		}

		lastReading += oneDayInMillis; // Move to the next day
		currentDayUnix += oneDayInMillis; // Move to the next day
	}

	sensor.lightReadings.lastUpdateUnix = currentTime;

	return sensor;
};

export default calculateDailyLightReadings;

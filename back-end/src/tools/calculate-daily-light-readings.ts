// Function to calculate daily light readings

import { SensorProps } from '../types/sensorsTypes';
import { getTodayDate } from './get-today-date';

const calculateDailyLightReadings = (sensor: SensorProps, currentTime: number): void => {
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
	const lastReading = sensor.lightReadings.lastUpdateUnix;
	const oneDayInMillis = 24 * 60 * 60 * 1000;
	let currentDayUnix = new Date(today).setHours(2, 0, 0, 0);
 
	while (lastReading <= currentDayUnix) {
	  const day = getTodayDate(new Date(currentDayUnix));
	  let difference: number;
 
	  if (currentDayUnix === new Date(today).setHours(2, 0, 0, 0)) {
		 difference = currentTime - lastReading;
	  } else {
		 difference = oneDayInMillis;
	  }
 
	  difference = difference / 1000; // Convert to seconds
 
	  const existingEntry = sensor.lightReadings.perDay.find((item) => item.date === day);
 
	  if (sensor.lightReadings.sunShines && sensor.lightReadings.lightsOn) {
		 if (existingEntry) {
			existingEntry.unnecessaryLight += difference;
		 } else {
			sensor.lightReadings.perDay.push({
			  day: new Date(currentDayUnix).toLocaleDateString('nl-NL', { weekday: 'long' }),
			  date: day,
			  necessaryLight: 0,
			  unnecessaryLight: difference
			});
		 }
	  } else if (!sensor.lightReadings.sunShines && sensor.lightReadings.lightsOn) {
		 if (existingEntry) {
			existingEntry.necessaryLight += difference;
		 } else {
			sensor.lightReadings.perDay.push({
			  day: new Date(currentDayUnix).toLocaleDateString('nl-NL', { weekday: 'long' }),
			  date: day,
			  necessaryLight: difference,
			  unnecessaryLight: 0
			});
		 }
	  }
	  sensor.lightReadings.timer = 0;
	  currentDayUnix -= oneDayInMillis;
	}
 
	sensor.lightReadings.lastUpdateUnix = currentTime;
 };

export default calculateDailyLightReadings;
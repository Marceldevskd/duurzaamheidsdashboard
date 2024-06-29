import express, { Request, Response } from 'express';
import Sensors from '../models/sensorsModel';
import { ReadingProps } from '../types/sensorsTypes';
import { GetReadingsProps } from '../types/getReadingsTypes';

const app = express.Router();
interface dayReadingsProps {
	date: string;
	totalAmount: number;
}

function giveLastWeek(readings: Array<ReadingProps>) {
	let lastWeekReadings: Array<dayReadingsProps> = [];
	let today = new Date(); // Use current time if time is not provided
	today.setUTCHours(today.getUTCHours() + 1); // Add 1 hour to get UTC+1 time
	today.setUTCHours(0, 0, 0, 0); // Set time to midnight
	const todayString = today.toISOString().split('T')[0]; // Convert to ISO string and get only the date

	for (let i = 6; i >= 0; i--) {
		for (let i = 6; i >= 0; i--) {
			const date = new Date(today);
			date.setDate(date.getDate() - i);
			const dateString = date.toISOString().split('T')[0];
			let totalAmount: number = 0;
			for (const reading of readings) {
				if (reading.date === dateString) {
					totalAmount += reading.totalAmount;
				}
			}
			lastWeekReadings.push({
				date: dateString,
				totalAmount: totalAmount,
			});
		}
		return lastWeekReadings as Array<dayReadingsProps>;
	}
}
app.get('/', async (req: Request, res: Response) => {
	try {
		const data: GetReadingsProps = {
			sensorName: req.query.sensorName as string,
			type: req.query.type as string
		};

		if (!data.sensorName && !data.type) {
			return res.status(400).json({ error: 'Invalid data received' });
		}

		// returns only one sensor's readings when a specific sensorName is provided
		if (data.sensorName) {
			const sensor = await Sensors.findOne({ name: data.sensorName });

			if (!sensor) {
				return res.status(400).json({ error: 'Invalid sensor name' });
			}
			const lastWeekReadings = giveLastWeek(sensor.readings);
			res.status(200).json(lastWeekReadings as Array<dayReadingsProps>);
			return;
		}

		// returns multiple sensors' readings in one 'reading' when a type is provided
		const sensors = await Sensors.find({ type: data.type });

		if (!sensors) {
			return res.status(400).json({ error: 'Invalid sensor type' });
		}

		let readings: Array<ReadingProps> = [];
		for (const sensor of sensors) {
			for (const sensorReading of sensor.readings) {
				// checks if the date already exists in the readings array
				let existingReadingI: number = readings.findIndex((reading) => {
					return reading.date === sensorReading.date
				});

				let existingReading: undefined | ReadingProps = readings[existingReadingI];

				if (existingReading) {
					// adds the new sensorReading to the existingReading
					let readingCopy = {
						date: existingReading.date,
						totalAmount: 0,
						sensorReadings: existingReading.sensorReadings,
					};

					readingCopy.totalAmount = existingReading.totalAmount + sensorReading.totalAmount;
					readingCopy.sensorReadings.push(...sensorReading.sensorReadings);

					readings[existingReadingI] = readingCopy as ReadingProps;
					continue; // goes to next sensor
				};
				// if the date does not exist, it adds the sensorReading to the readings array
				readings.push(sensorReading);
			};
		};
		const lastWeekReadings = giveLastWeek(readings);
		res.status(200).json(lastWeekReadings as Array<dayReadingsProps>);
	} catch (err) {
		console.error('Error reading data:', err);
		res.status(500).send('Internal Server Error');
	};
});

export default app;
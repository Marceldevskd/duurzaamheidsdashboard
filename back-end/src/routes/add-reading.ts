import express, { Request, Response } from 'express';
import Sensors from '../models/sensorsModel';
import { ReadingDataProps } from '../models/postModels';
import { ReadingProps, SensorReadingsProps, UsagePerHourProps } from '../models/sensorsModel';

const app = express.Router();

app.post('/', async (req: Request, res: Response) => {
	try {
		const readingData = req.body as ReadingDataProps;

		if (!readingData.sensorName || !readingData.amount || typeof readingData.amount !== 'number') {
			return res.status(400).json({ error: 'Invalid data received' });
		}

		const sensor = await Sensors.findOne({ name: readingData.sensorName });
		if (!sensor) {
			return res.status(400).json({ error: 'Invalid sensor name' });
		}

		let today = new Date(readingData.time || Date.now()); // Use current time if time is not provided
		today.setUTCHours(-1, 0, 0, 0) // Subtract 1 hour to get UTC+1 midnight
		today.toISOString(); // Convert to ISO string to get rid of timezone offset

		let hour = new Date(readingData.time || Date.now()).getHours(); // Get current hour

		const dayTemplate: ReadingProps = {
			date: today,
			totalAmount: 0,
			sensorReadings: [],
			usagePerHour: Array.from({ length: 24 }, () => ({ amount: 0 } as UsagePerHourProps)) // Initialize usagePerHour array with UsagePerHourProps objects
		};

		let existingReading = sensor.readings.find((reading) => reading.date.getTime() === today.getTime());
		if (!existingReading) {
			sensor.readings.push(dayTemplate);
			existingReading = dayTemplate;
		}

		existingReading.totalAmount += readingData.amount;
		existingReading.sensorReadings.push({ unixTime: readingData.time || Date.now(), amount: readingData.amount } as SensorReadingsProps);
		existingReading.usagePerHour[hour].amount += readingData.amount;

		await sensor.save();
		console.log('Reading added successfully', sensor);
		res.status(200).send('Reading added successfully');
	} catch (err) {
		console.error('Error adding data:', err);
		res.status(500).send('Internal Server Error');
	}
});

export default app;

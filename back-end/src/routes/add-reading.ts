import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ReadingDataProps } from '../models/postModels';
import { ReadingProps, SensorReadingsProps, UsagePerHourProps, SensorProps, SensorsSchema } from '../models/sensorsModel';

declare module 'express-serve-static-core' {
	interface Request {
		companyID?: string;
	}
}

const app = express.Router();

app.post('/', async (req: Request, res: Response) => {
	try {
		const readingData = req.body as ReadingDataProps;
		if (!readingData.sensorName || !readingData.amount || typeof readingData.amount !== 'number' || typeof readingData.sensorName !== 'string') {
			return res.status(400).json({ error: 'Invalid data received' });
		}

		// selects correct collection based on companyID
		const collectionName: string | undefined = req.companyID;
		if (!collectionName) {
			return res.status(500).send('Internal server error');
		}
		const Sensors = mongoose.model<SensorProps>(collectionName, SensorsSchema);

		const sensor = await Sensors.findOne({ name: readingData.sensorName });
		if (!sensor) {
			return res.status(400).json({ error: 'Invalid sensor name' });
		}

		let today = new Date(readingData.time || Date.now()); // Use current time if time is not provided
		today.setUTCHours(-1, 0, 0, 0); // Subtract 1 hour to get UTC+1 midnight
		today.toISOString(); // Convert to ISO string to get rid of timezone offset

		let hour = new Date(readingData.time || Date.now()).getHours(); // Get current hour

		const dayTemplate: ReadingProps = {
			date: today,
			totalAmount: 0,
			sensorReadings: [],
			usagePerHour: Array.from({ length: 24 }, () => ({ amount: 0 } as UsagePerHourProps)) // Initialize usagePerHour array with UsagePerHourProps objects
		};

		let existingReadingI: number = sensor.readings.findIndex((reading) => reading.date == today);

		let existingReading: undefined | ReadingProps = sensor.readings[existingReadingI];

		if (!existingReading) {
			sensor.readings.push(dayTemplate);
			existingReadingI = sensor.readings.length - 1;
		}

		if (existingReadingI > -1) {
			sensor.readings[existingReadingI].totalAmount += readingData.amount;
			sensor.readings[existingReadingI].sensorReadings.push({ unixTime: readingData.time || Date.now(), amount: readingData.amount } as SensorReadingsProps);
			sensor.readings[existingReadingI].usagePerHour[hour].amount += readingData.amount;
		} else {
			console.log(existingReading, existingReadingI)
			throw new Error('Error adding data');
		}

		await sensor.save();
		console.log('Reading added successfully', sensor);
		res.status(200).send('Reading added successfully');
	} catch (err) {
		console.error('Error adding data:', err);
		res.status(500).send('Internal Server Error');
	}
});

export default app;

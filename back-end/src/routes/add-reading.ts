import express, {Request, Response} from 'express';
import Sensors from '../models/sensorsModel';
import { ReadingDataProps } from '../models/postModels';
import { ReadingProps, SensorReadingsProps } from '../models/sensorsModel';

const app = express.Router();

app.post('/', async (req: Request, res: Response) => {
	try {
		// check the recieved data
		const readingData = req.body as ReadingDataProps;

		// Validate the received data
		if (!readingData.sensorName || !readingData.amount) {
			return res.status(400).json({ error: 'Invalid data received' });
		}
		
		// adds the unix timestamp to the readingData object if its not already there
		if (!readingData.time || typeof readingData.time !== 'number') {
			readingData.time = Date.now();
		}

		// Process the received data
		// Find the sensor in the database
		const sensor = await Sensors.findOne({ name: readingData.sensorName });
		if (!sensor) {
			return res.status(400).json({ error: 'Invalid sensor name' });
		}

		const today = new Date(readingData.time);
		today.setUTCHours(0, 0, 0, 0);

		const hour = new Date(readingData.time).getUTCHours();

		const dayTemplate: ReadingProps = {
			date: today,
			totalML: 0,
			sensorReadings: [],
			usagePerHour: []
		};

		// Check if the date already exists
		if (!sensor.readings.has(today)) {
			// add the date to the sensor
			sensor.readings.set(today, dayTemplate);
		}
		// Add the reading to the sensor object in the db
		const sensorReading: SensorReadingsProps = {
			unixTime: readingData.time,
			mL: readingData.amount
		};

		if (sensor.readings.get(today)) {
			const readings = sensor.readings.get(today);
			if (!readings) {
				throw new Error('No readings found');
			}
			readings.totalML += readingData.amount;
			readings.sensorReadings.push(sensorReading as SensorReadingsProps);
			readings.usagePerHour[hour].mL = (readings.usagePerHour[hour].mL || 0) + readingData.amount;

			// Saves it to the sensor object
			sensor.readings.set(today, readings);
		}

		// Pushes the sensor object to the database
		await sensor.save();
		res.status(200).send('Reading added successfully');
	} catch (err) {
		console.error('Error adding data:', err);
		res.status(500).send('Internal Server Error');
	}
});

export default app;
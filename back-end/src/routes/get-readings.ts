import express, { Request, Response } from 'express';
import Sensors, { ReadingProps } from '../models/sensorsModel';
import { GetReadingsProps } from '../models/getModels';

const app = express.Router();

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
			res.status(200).json(sensor.readings);
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
					return reading.date.toISOString() === sensorReading.date.toISOString();
			  	});

				let existingReading: undefined | ReadingProps = readings[existingReadingI];

				if (existingReading) {
					// adds the new sensorReading to the existingReading
					let readingCopy = {
						date: existingReading.date,
						totalAmount: 0,
						sensorReadings: existingReading.sensorReadings,
						usagePerHour: existingReading.usagePerHour
					}
					
					readingCopy.totalAmount = existingReading.totalAmount + sensorReading.totalAmount;
					readingCopy.sensorReadings.push(...sensorReading.sensorReadings);
					
					for (let i = 0; i < 24; i++) {
						readingCopy.usagePerHour[i].amount += sensorReading.usagePerHour[i].amount;
					}

					readings[existingReadingI] = readingCopy as ReadingProps; 
					continue; // goes to next sensor
				} 
				// if the date does not exist, it adds the sensorReading to the readings array
				readings.push(sensorReading);	
			}
		}

		res.status(200).json(readings as Array<ReadingProps>);
	} catch (err) {
		console.error('Error reading data:', err);
		res.status(500).send('Internal Server Error');
	}
});

export default app;
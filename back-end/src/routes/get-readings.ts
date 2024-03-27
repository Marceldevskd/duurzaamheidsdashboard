import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ReadingProps, SensorProps, SensorsSchema } from '../models/sensorsModel';
import { GetReadingsProps } from '../models/getModels';

const app = express.Router();

app.get('/', async (req: Request, res: Response) => {
	try {
		const data: GetReadingsProps = {
			sensorName: req.query.sensorName as string,
			type: req.query.type as string
		};
		console.log('Data:', data)
		
		// Validate the received data
		if (!data.sensorName){
			if (!data.type) {
				return res.status(400).json({ error: 'Invalid data received' });
			} else if (typeof data.type !== 'string') {
				return res.status(400).json({ error: 'Invalid data received' });
			}
		} else if (typeof data.sensorName !== 'string') {
			return res.status(400).json({ error: 'Invalid data received' });
		}

		// Selects correct collection based on companyID
		const collectionName: string | undefined = req.companyID;
		if (!collectionName) {
			return res.status(500).send('Internal server error');
		}
		const Sensors = mongoose.model<SensorProps>(collectionName, SensorsSchema);

		// Returns only one sensor's readings when a specific sensorName is provided
		if (data.sensorName) {
			// Find the sensor
			const sensor = await Sensors.findOne({ name: data.sensorName });

			// If the sensor does not exist, return an error
			if (!sensor) {
				return res.status(400).json({ error: 'Invalid sensor name' });
			}
			// Return readings to the client
			res.status(200).json(sensor.readings);
		} 
		
		// Returns multiple sensors' readings in one 'reading' when a type is provided
		const sensors = await Sensors.find({ type: data.type });

		// Check if there are sensors of that type
		if (!sensors) {
			return res.status(400).json({ error: 'Invalid sensor type' });
		}

		// Combines the readings of all sensors of the same type
		let readings: Array<ReadingProps> = [];
		for (const sensor of sensors) {
			for (const sensorReading of sensor.readings) {
				// Checks if the date already exists in the readings array
				let existingReadingI: number = readings.findIndex((reading) => {
					return reading.date.toISOString() === sensorReading.date.toISOString();
			  	});

				let existingReading: undefined | ReadingProps = readings[existingReadingI];

				if (existingReading) {
					// Adds the new sensorReading to the existingReading
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
					continue; // Goes to next sensor
				} 
				// If the date does not exist, it adds the sensorReading to the readings array
				readings.push(sensorReading);	
			}
		}

		// Returns the combined readings to the client
		res.status(200).json(readings as Array<ReadingProps>);
	} catch (err) {
		console.error('Error reading data:', err);
		res.status(500).send('Internal Server Error');
	}
});

export default app;
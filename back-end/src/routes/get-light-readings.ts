import express, { Request, Response } from 'express';
import Sensors from '../models/sensorsModel';
import { Document } from 'mongodb';
import { SensorProps, LightReadingProps } from '../types/sensorsTypes';
import { getTodayDate } from '../tools/get-today-date';
import calculateDailyLightReadings from '../tools/calculate-daily-light-readings';

const app = express.Router();

// GET endpoint for retrieving sensor light readings
app.get('/', async (req: Request, res: Response) => {
	try {
		const sensorName: string = req.query.sensorName as string;
		if (!sensorName || typeof sensorName !== 'string') {
			return res.status(400).json({ error: 'No sensor name received' });
		}

		let sensor: SensorProps | null = await Sensors.findOne({ name: sensorName });

		if (!sensor || sensor.type.toLowerCase() !== 'light') {
			return res.status(400).json({ error: 'Invalid sensor name or type' });
		}

		if (!sensor.lightReadings) {
			sensor.lightReadings = {
				totalTime: 0,
				timer: 0,
				lastUpdateUnix: Date.now(),
				sunShines: false,
				lightsOn: false,
				perDay: [{
					day: getTodayDate(),
					date: new Date(Date.now()).toLocaleDateString('nl-NL', { weekday: 'long' }),
					necessaryLight: 0,
					unnecessaryLight: 0
				}],
			} as LightReadingProps;
		}

		// Check if perDay array is initialized
		if (!sensor.lightReadings.perDay) {
			sensor.lightReadings.perDay = [];
		}

		sensor = calculateDailyLightReadings(sensor, Date.now());
		
		if (!sensor || !sensor.lightReadings) {
			throw Error('Error calculating daily light readings');
		}

		sensor.lightReadings.lastUpdateUnix = Date.now();
		
		await (sensor as Document).save();
		res.status(200).json(sensor.lightReadings);
	} catch (err) {
		console.error('Error reading data:', err);
		res.status(500).send('Internal Server Error');
	}
});

export default app;
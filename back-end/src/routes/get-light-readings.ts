/**
 * Retrieves the light readings for a specific sensor.
 * @param req - The request object.
 * @param res - The response object.
 * @returns The light readings for the specified sensor.
 */

import express, { Request, Response } from 'express';
import Sensors from '../models/sensorsModel';
import { Document } from 'mongodb';
import { SensorProps, LightReadingProps } from '../types/sensorsTypes';
import { getTodayDate } from '../tools/get-today-date';

interface ResponseProps {
	totalTime: number;
	timer: number;

	sunShines: boolean;
	lightsOn: boolean;
	perDay: Array<PerDayProps>;
}

interface PerDayProps {
	day: string;
	date: string;
	necessaryReading: number;
	unnecessaryReading: number;
}

const app = express.Router();

// Update the LightReadingProps type

app.get('/', async (req: Request, res: Response) => {
	try {
		const sensorName: string = req.query.sensorName as string;

		if (!sensorName || typeof sensorName !== 'string') {
			return res.status(400).json({ error: 'No data received' });
		}

		const sensor: SensorProps | null = await Sensors.findOne({ name: sensorName });
		if (!sensor || sensor.type.toLowerCase() !== 'light') {
			return res.status(400).json({ error: 'Invalid sensor name' });
		}

		if (!sensor.lightReadings) {
			sensor.lightReadings = {
				totalTime: 0,
				timer: 0,
				lastUpdateUnix: Date.now(),
				sunShines: false,
				lightsOn: false,
				perDay: [{ day: getTodayDate(), date: new Date().toISOString().split('T')[0], noodzakelijkReading: 0, overbodigReading: 0 }],
			} as unknown as LightReadingProps;
		}

		if (sensor.lightReadings.perDay.length === 0 || sensor.lightReadings.perDay[sensor.lightReadings.perDay.length - 1].date !== new Date().toISOString().split('T')[0]) {
			sensor.lightReadings.perDay.push({ day: new Date().toLocaleDateString('en-US', { weekday: 'long' }), date: new Date().toISOString().split('T')[0], noodzakelijkReading: 0, overbodigReading: 0 });
		}

		// update the data to reflect the current state

		// system to calculate if yesterday and the day before that have a state change or not
		const lastReading: number = sensor.lightReadings.lastUpdateUnix;
		

		let i = 0;
		while (lastReading < new Date().setHours(0, (i * -24), 0, 0)) {
			
		}
		


		await (sensor as Document).save();
		res.status(200).json(sensor.lightReadings);
	} catch (err) {
		console.error('Error reading data:', err);
		res.status(500).send('Internal Server Error');
	}
});

export default app;



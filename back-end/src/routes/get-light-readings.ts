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
				perDay: [],
			} as LightReadingProps;
		}

		if (sensor.lightReadings.sunShines && sensor.lightReadings.lightsOn) {
			sensor.lightReadings.timer += (Date.now() - sensor.lightReadings.lastUpdateUnix) / 1000;
			// Add to unnecessary light for the current day
			const today = getTodayDate();
			const unnecessaryDay = sensor.lightReadings.unnecessaryLight.find(day => day.day === today);
			if (unnecessaryDay) {
				unnecessaryDay.total += sensor.lightReadings.timer;
			} else {
				sensor.lightReadings.unnecessaryLight.push({ day: today, total: sensor.lightReadings.timer });
			}
		} else if (!sensor.lightReadings.sunShines && sensor.lightReadings.lightsOn) {
			sensor.lightReadings.totalTime += sensor.lightReadings.timer;
			// Add to necessary light for the current day
			const today = getTodayDate();
			const necessaryDay = sensor.lightReadings.necessaryLight.find(day => day.day === today);
			if (necessaryDay) {
				necessaryDay.total += sensor.lightReadings.timer;
			} else {
				sensor.lightReadings.necessaryLight.push({ day: today, total: sensor.lightReadings.timer });
			}
			sensor.lightReadings.timer = 0;
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
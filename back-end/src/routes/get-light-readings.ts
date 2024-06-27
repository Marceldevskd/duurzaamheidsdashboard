import express, { Request, Response } from 'express';
import Sensors from '../models/sensorsModel';
import { Document } from 'mongodb';
import { SensorProps, LightReadingProps } from '../types/sensorsTypes';
const app = express.Router();

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
				lightsOn: false
			} as LightReadingProps;
		}

		if (sensor.lightReadings.sunShines && sensor.lightReadings.lightsOn) {
			sensor.lightReadings.timer += (Date.now() - sensor.lightReadings.lastUpdateUnix) / 1000;
		} else {
			sensor.lightReadings.totalTime += sensor.lightReadings.timer;
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
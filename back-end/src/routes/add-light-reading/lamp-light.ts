import express, { Request, Response } from 'express';
import Sensors from '../../models/sensorsModel';
import { Document } from 'mongodb';
import { SensorProps, LightReadingProps } from '../../types/sensorsTypes';
import calculateDailyLightReadings from '../../tools/calculate-daily-light-readings';

const app = express.Router();

app.post('/', async (req: Request, res: Response) => {
	try {
		const sensorName: string = req.query.sensorName as string;

		if (!sensorName || typeof sensorName !== 'string') {
			return res.status(400).json({ error: 'No sensor name received' });
		}

		if (req.body.reading === undefined) {
			return res.status(400).json({ error: 'No reading received' });
		}

		let sensor: SensorProps | null = await Sensors.findOne({ name: sensorName });

		if (!sensor) {
			return res.status(400).json({ error: 'Invalid sensor name' });
		}

		if (sensor.type.toLowerCase() !== 'light') {
			return res.status(400).json({ error: 'Invalid sensor type (type must be "Light")' });
		}

		if (!sensor.lightReadings) {
			sensor.lightReadings = {
				totalTime: 0,
				timer: 0,
				lastUpdateUnix: Date.now(),
				sunShines: false,
				lightsOn: false,
				perDay: [],
				necessaryLight: [],
				unnecessaryLight: [],
			} as LightReadingProps;
		}

		sensor.lightReadings.lightsOn = (req.body.reading === 1) as boolean;
		sensor.lightReadings.lastUpdateUnix = Date.now();

		calculateDailyLightReadings(sensor, Date.now());

		await (sensor as Document).save();
		res.status(200).json(sensor.lightReadings);
	} catch (err) {
		console.error('Error updating data:', err);
		res.status(500).send('Internal Server Error');
	}
});

export default app;
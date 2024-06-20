import express, { Request, Response } from 'express';
import Sensors from '../../models/sensorsModel';
import { LightReadingProps, SensorProps} from '../../types/sensorsTypes';
import { LightRequestBodyProps } from './types/types';
import { Document } from 'mongodb';

const app = express.Router();

app.post('/', async (req: Request, res: Response) => {
	try {
		let { sensorName, reading }: LightRequestBodyProps = req.body;

		if (!sensorName || reading == undefined || reading == null || typeof reading !== 'number' || typeof sensorName !== 'string') {
			return res.status(400).json({ error: 'Invalid data received' });
		}

		if (reading !== 0 && reading !== 1) {
			return res.status(400).json({ error: 'Invalid reading value' });
		}

		const sensor: SensorProps | null = await Sensors.findOne({ name: sensorName });
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
			} as LightReadingProps;
		}

		sensor.lightReadings.sunShines = (reading === 1) as boolean;

		if (sensor.lightReadings.sunShines && sensor.lightReadings.lightsOn) {
			sensor.lightReadings.timer += (Date.now() - sensor.lightReadings.lastUpdateUnix) / 1000;
		} else {
			sensor.lightReadings.totalTime += sensor.lightReadings.timer;
			sensor.lightReadings.timer = 0;
		}

		sensor.lightReadings.lastUpdateUnix = Date.now();
		await (sensor as Document).save();
		return res.status(200).send('Reading added successfully');
	} catch (err) {
		console.error('Error adding data:', err);
		return res.status(500).send('Internal Server Error');
	}
});

export default app;

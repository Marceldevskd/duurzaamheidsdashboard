import express, { Request, Response } from 'express';
import Sensors from '../models/sensorsModel';

const app = express.Router();

app.get('/', async (req: Request, res: Response) => {
	try {
		const sensorName: string = req.query.sensorName as string;
		if (!sensorName) {
			return res.status(400).json({ error: 'No data received' });
		}

		const sensor = await Sensors.findOne({ name: sensorName });
		if (!sensor || sensor.type.toLowerCase() !== 'light') {
			return res.status(400).json({ error: 'Invalid sensor name' });
		}

		res.status(200).json(sensor.lightReadings);
	} catch (err) {
		console.error('Error reading data:', err);
		res.status(500).send('Internal Server Error');
	}
});

export default app;
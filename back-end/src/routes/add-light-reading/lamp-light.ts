import express, { Request, Response } from 'express';
import Sensors from '../../models/sensorsModel';
import { ReadingProps, SensorReadingsProps, UsagePerHourProps } from '../../models/sensorsModel';

const app = express.Router();


app.post('/', async (req: Request, res: Response) => {
	try {
		let { sensorName, reading } = req.body;

		if (!sensorName || reading == undefined || reading == null || typeof reading !== 'number' || typeof sensorName !== 'string') {
			return res.status(400).json({ error: 'Invalid data received' });
		}

		if (reading !== 0 && reading !== 1) {
			return res.status(400).json({ error: 'Invalid reading value' });
		}

		const sensor = await Sensors.findOne({ name: sensorName });
		if (!sensor || sensor.type !== 'Light') {
			return res.status(400).json({ error: 'Invalid sensor name' });
		}

		if (!sensor.lightReadings) {
			sensor.lightReadings = { 
				totalTime: 0,
				timer: 0,
				lastUpdateUnix: Date.now(), 
				sunShines: false,
				lightsOn: false
			};
		}

		sensor.lightReadings.lightsOn = reading === 1;

		if (sensor.lightReadings.sunShines && sensor.lightReadings.lightsOn) {
			sensor.lightReadings.timer += (Date.now() - sensor.lightReadings.lastUpdateUnix) / 1000;
		} else {
			sensor.lightReadings.totalTime += sensor.lightReadings.timer;
			sensor.lightReadings.timer = 0;
		}

		sensor.lightReadings.lastUpdateUnix = Date.now();
		await sensor.save();
		return res.status(200).send('Reading added successfully');
	} catch (err) {
		console.error('Error adding data:', err);
		return res.status(500).send('Internal Server Error');
	}
});

export default app;

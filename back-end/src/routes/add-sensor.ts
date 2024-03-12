import express, {Request, Response} from 'express';
import Sensors from '../models/sensorsModel';
import { AddSensorProps } from '../models/postModels';

const app = express.Router();

app.post('/', async (req: Request, res: Response) => {
	try {
		const addSensorData = req.body as AddSensorProps; // Update variable name

		// Validate the received data
		if (!addSensorData.name || !addSensorData.type || !addSensorData.unit) { // Update variable names
			return res.status(400).json({ error: 'Invalid data received' });
		}

		const sensor = await Sensors.findOne({ name: addSensorData.name });
		if (sensor) {
			return res.status(400).json({ error: 'Sensor already exists' });
		}

		// Process the received data
		addSensorData.readings = [];
		await Sensors.create(addSensorData);
		res.status(200).send('Sensor added successfully');
	} catch (err) {
		console.error('Error adding data:', err);
		res.status(500).send('Internal Server Error');
	}
});

export default app;
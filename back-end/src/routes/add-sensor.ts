import express, { Response, Request } from 'express';
import { AddSensorProps } from '../models/postModels';
import mongoose from 'mongoose';
import { SensorProps, SensorsSchema } from '../models/sensorsModel';
declare module 'express-serve-static-core' {
	interface Request {
		companyID?: string;
	}
}

const app = express.Router();

app.post('/', async (req: Request, res: Response) => {
	try {
		const addSensorData = req.body as AddSensorProps;

		// Validate the received data
		if (
			!addSensorData.name ||
			!addSensorData.type ||
			!addSensorData.unit ||
			typeof addSensorData.name !== 'string' ||
			typeof addSensorData.type !== 'string' ||
			typeof addSensorData.unit !== 'string'
		) {
			return res.status(400).json({ error: 'Invalid data received' });
		}

		// selects correct collection based on companyID
		const collectionName: string | undefined = req.companyID;
		if (!collectionName) {
			return res.status(500).send('Internal server error');
		}
		const Sensors = mongoose.model<SensorProps>(collectionName, SensorsSchema);

		// check if sensor name is not too short
		if (addSensorData.name.length < 5) {
			return res.status(400).json({ error: 'Sensor name too short' });
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
		res.status(500).send('Internal server error');
	}
});

export default app;

import express, {Request, Response} from 'express';
import Sensors from '../models/sensorsModel';
import { ReadingDataProps } from '../models/postModels';

const app = express.Router();

app.post('/add-reading', async (req: Request, res: Response) => {
	try {
		// check the recieved data
		const readingData = req.body as ReadingDataProps;

		console.log(readingData);
		// Validate the received data
		if (!readingData.sensorName || !readingData.time || !readingData.ML) {
			return res.status(400).json({ error: 'Invalid data received' });
		}

		// Process the received data
		// Find the sensor in the database
		const sensor = await Sensors.findOne({ name: readingData.sensorName });
		if (!sensor) {
			return res.status(400).json({ error: 'Invalid sensor name' });
		}

		// send a response to the client
		res.status(200).send('Data added successfully');
	} catch (err) {
		console.error('Error adding data:', err);
		res.status(500).send('Internal Server Error');
	}
});

export default app;
import express, {Request, Response} from 'express';
import Sensors from '../models/sensorsModel';
import { GetReadingsProps } from '../models/getModels';

const app = express.Router();

app.get('/', async (req: Request, res: Response) => {
	try {
        const data: GetReadingsProps = req.body;
		const sensor = await Sensors.findOne({ name: data.sensorName });
        if (!sensor) {
            return res.status(400).json({ error: 'Invalid sensor name' });
        }
        
        res.status(200).json(sensor.readings);
	} catch (err) {
        console.error('Error reading data:', err);
        res.status(500).send('Internal Server Error');
	}
});

export default app;
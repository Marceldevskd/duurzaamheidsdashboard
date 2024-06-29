import express, { Request, Response } from 'express';
import Sensors from '../models/sensorsModel';
import { ReadingDataProps } from '../types/addReadingTypes';
import { ReadingProps, SensorReadingsProps} from '../types/sensorsTypes';
import { getTodayDate } from '../tools/get-today-date';

const app = express.Router();

app.post('/', async (req: Request, res: Response) => {
    try {
        const readingData = req.body as ReadingDataProps;

        if (!readingData.sensorName || !readingData.amount || typeof readingData.amount !== 'number') {
            return res.status(400).json({ error: 'Invalid data received' });
        }

        const sensor = await Sensors.findOne({ name: readingData.sensorName });
        if (!sensor) {
            return res.status(400).json({ error: 'Invalid sensor name' });
        }

        let todayString: string = getTodayDate(readingData.time);

        const dayTemplate: ReadingProps = {
            date: todayString,
            totalAmount: 0,
            sensorReadings: []
        };

        let existingReadingI: number = sensor.readings.findIndex((reading) => reading.date == todayString);

        let existingReading: undefined | ReadingProps = sensor.readings[existingReadingI];

        if (!existingReading) {
            sensor.readings.push(dayTemplate);
            existingReadingI = sensor.readings.length - 1;
        }

        if (existingReadingI > -1) {
            sensor.readings[existingReadingI].totalAmount += readingData.amount;
            sensor.readings[existingReadingI].sensorReadings.push({ unixTime: readingData.time || Date.now(), amount: readingData.amount } as SensorReadingsProps);
        } else {
            throw new Error('Error adding data');
        }

        await sensor.save();
        res.status(200).send('Reading added successfully');
    } catch (err) {
        console.error('Error adding data:', err);
        res.status(500).send('Internal Server Error');
    }
});

export default app;

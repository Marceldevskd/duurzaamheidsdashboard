import express from 'express';
import { ObjectId } from 'mongodb';
import mongoose, { Schema, Document } from 'mongoose';

// Define a Mongoose schema for the data
interface SensorProps extends Document {
	_id: ObjectId;
	name: string;
	type: string;
	unit: string;
	readings: ReadingProps[];
}

interface ReadingProps extends Document {
	date: Date;
	totalML: number;
	sensorReadings: SensorReadingsProps[];
	usagePerHour: UsagePerHourProps[];
}

interface SensorReadingsProps extends Document {
	unixTime: number;
	ML: number;
}

interface UsagePerHourProps extends Document {
	hour: number;
	UnixStart: number;
	UnixEnd: number;
	ML: number;
}

const SensorSchema: Schema<SensorProps> = new Schema({
	name: String,
	type: String,
	unit: String,
	readings: [{
		type: Schema.Types.ObjectId,
		ref: 'Reading'
	}]
});

const ReadingSchema: Schema<ReadingProps> = new Schema({
	date: Date,
	totalML: Number,
	sensorReadings: [{
		type: Schema.Types.ObjectId,
		ref: 'SensorReading'
	}],
	usagePerHour: [{
		type: Schema.Types.ObjectId,
		ref: 'UsagePerHour'
	}]
});

const SensorReadingSchema: Schema<SensorReadingsProps> = new Schema({
	unixTime: Number,
	ML: Number
});

const UsagePerHourSchema: Schema<UsagePerHourProps> = new Schema({
	hour: Number,
	UnixStart: Number,
	UnixEnd: Number,
	ML: Number
});

const Sensor = mongoose.model<SensorProps>('Sensor', SensorSchema);
const Reading = mongoose.model<ReadingProps>('Reading', ReadingSchema);
const SensorReading = mongoose.model<SensorReadingsProps>('SensorReading', SensorReadingSchema);
const UsagePerHour = mongoose.model<UsagePerHourProps>('UsagePerHour', UsagePerHourSchema);

const User = mongoose.model<SensorProps>('Sensor', SensorSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/')
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.error('Error connecting to MongoDB:', err));

// Express.js app
const app = express();

app.get('/add-reading', async (req, res) => {
	try {
		
		// Save the data to the database
		await Sensor.insertMany([]);
		res.status(200).send('Data added successfully.');
	} catch (err) {
		console.error('Error adding data:', err);
		res.status(500).send('Internal Server Error');
	}
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`); 
});
console.log('ello world!');
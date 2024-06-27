import mongoose, { Schema, Document } from 'mongoose';
import { SensorReadingsProps, ReadingProps, LightReadingProps, SensorProps } from '../types/sensorsTypes';

const SensorReadingSchema: Schema<SensorReadingsProps> = new Schema({
	unixTime: Number,
	amount: Number
});

const ReadingSchema: Schema<ReadingProps> = new Schema({
	date: String,
	totalAmount: Number,
	sensorReadings: [SensorReadingSchema],
});

const LightReadingSchema: Schema<LightReadingProps> = new Schema({
	totalTime: Number,
	timer: Number,
	lastUpdateUnix: Number,
	sunShines: Boolean,
	lightsOn: Boolean
});

const SensorsSchema: Schema<SensorProps> = new Schema({
	name: String,
	type: String,
	unit: String,
	readings: [ReadingSchema],
	lightReadings: {
		type: LightReadingSchema,
		default: undefined
	}
});

const Sensors = mongoose.model<SensorProps>('Sensors', SensorsSchema);

export default Sensors;
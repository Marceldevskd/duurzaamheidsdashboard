import mongoose, { Schema, Document } from 'mongoose';
import { SensorReadingsProps, UsagePerHourProps, ReadingProps, LightReadingProps, SensorProps } from '../types/sensorsTypes';

const SensorReadingSchema: Schema<SensorReadingsProps> = new Schema({
	unixTime: Number,
	amount: Number
});

const UsagePerHourSchema: Schema<UsagePerHourProps> = new Schema({
	amount: Number
});

const ReadingSchema: Schema<ReadingProps> = new Schema({
	date: Date,
	totalAmount: Number,
	sensorReadings: [SensorReadingSchema],
	usagePerHour: [UsagePerHourSchema]
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
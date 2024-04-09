import mongoose, { Schema, Document } from 'mongoose';

export interface SensorProps extends Document {
	name: string;
	type: string;
	unit: string;
	readings: ReadingProps[];
	lightReadings?: LightReadingProps;
}

export interface LightReadingProps {
	totalTime: number; // since April 9th 2024
	timer: number; // in seconds
	lastUpdateUnix: number; // last update in unix Ms
	sunShines: boolean; // if the sun is shining
	lightsOn: boolean; // if the lights are on
}

export interface ReadingProps {
	date: Date;
	totalAmount: number;
	sensorReadings: SensorReadingsProps[];
	usagePerHour: UsagePerHourProps[];
}

export interface SensorReadingsProps extends Document {
	unixTime: number;
	amount: number;
}

export interface UsagePerHourProps extends Document {
	amount: number;
}

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

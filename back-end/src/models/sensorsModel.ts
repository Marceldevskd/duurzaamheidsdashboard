import mongoose, { Schema, Document } from 'mongoose';

export interface SensorProps extends Document {
	name: string;
	type: string;
	unit: string;
	readings: ReadingProps[];
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

export const SensorsSchema: Schema<SensorProps> = new Schema({
	name: String,
	type: String,
	unit: String,
	readings: [ReadingSchema]
});

const Sensors = mongoose.model<SensorProps>('Sensors', SensorsSchema);

export default Sensors;

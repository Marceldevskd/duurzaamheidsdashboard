import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface SensorProps {
	_id: ObjectId;
	name: string;
	type: string;
	unit: string;
	readings: Map<Date, ReadingProps>;
}

export interface ReadingProps{
	date: Date;
	totalML: number;
	sensorReadings: SensorReadingsProps[];
	usagePerHour: UsagePerHourProps[];
}

export interface SensorReadingsProps {
	unixTime: number;
	mL: number;
}

export interface UsagePerHourProps {
	mL: number;
}

const SensorsSchema: Schema<SensorProps> = new Schema({
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
	mL: Number
});

const UsagePerHourSchema: Schema<UsagePerHourProps> = new Schema({
	mL: Number
});

const Sensors = mongoose.model<SensorProps>('Sensors', SensorsSchema);

export default Sensors;
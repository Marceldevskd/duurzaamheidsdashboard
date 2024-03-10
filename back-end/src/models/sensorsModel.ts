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
	ML: number;
}

export interface UsagePerHourProps {
	hour: number;
	UnixStart: number;
	UnixEnd: number;
	ML: number;
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
	ML: Number
});

const UsagePerHourSchema: Schema<UsagePerHourProps> = new Schema({
	hour: Number,
	UnixStart: Number,
	UnixEnd: Number,
	ML: Number
});

const Sensors = mongoose.model<SensorProps>('Sensors', SensorsSchema);

export default Sensors;
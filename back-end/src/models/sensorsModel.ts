import mongoose, { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';

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
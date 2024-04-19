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
	date: string;
	totalAmount: number;
	sensorReadings: SensorReadingsProps[];
}

export interface SensorReadingsProps extends Document {
	unixTime: number;
	amount: number;
}
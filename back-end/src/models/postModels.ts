export interface AddSensorProps {
	name: string;
	type: string;
	unit: string;
	readings?: [];
}

export interface ReadingDataProps {
	sensorName: string;
	time: number;
	ML: number;
}
# Documentation for all the back-end API endpoints

## /add-sensor POST
### Description
Used to register extra sensors and makes a document for it the sensor in de database.
### Expects
json body  
{  
&nbsp;&nbsp;&nbsp; name: string, descriptive name  
&nbsp;&nbsp;&nbsp; type: string, "water", "electricity" etc.  
&nbsp;&nbsp;&nbsp; unit: string, "mL", "kW" etc.  
}  
### Returns 
Status: 400, Error: Invalid data recieved  
Status: 400, Error: Sensor already exists  
Status: 200, Error: None  
Status: 500, Error: Internal server error  
&nbsp;

## /add-reading POST
### Description
Used to add readings from sensor to the database
### Expects
json body  
{  
&nbsp;&nbsp;&nbsp; sensorName: string, name of the sensor  
&nbsp;&nbsp;&nbsp; amount: number, reading uses the default unit of the sensor  
&nbsp;&nbsp;&nbsp; time?: number, unix timestamp is optional  
}  
### Returns 
Status: 400, Error: Invalid data recieved  
Status: 400, Error: Invalid sensor name  
Status: 200, Error: None  
Status: 500, Error: Internal server error  
&nbsp;

## /get-readings GET (temporary)
### Description
With this API endpoint you can get all the sensordata with the name of the sensor
### Expects
json body  
{  
&nbsp;&nbsp;&nbsp; sensorName: string, name of the sensor  
} 
### Returns
Status: 400, Error: Invalid data recieved  
Status: 400, Error: Invalid sensor name  
Status: 500, Error: Internal server error  
Status: 200, Error: None, Json: {  
&nbsp;&nbsp;&nbsp; name: string, descriptive name  
&nbsp;&nbsp;&nbsp; type: string, "water", "electricity" etc.  
&nbsp;&nbsp;&nbsp; unit: string, "mL", "kW" etc.  
&nbsp;&nbsp;&nbsp; readings: [{  
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; date: Date, the date, a js date at 00:00   
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; totalML: Number, total mL that day  
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; sensorReadings: [{  
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; unixTime: Number, time when the reading was done  
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; mL: Number, amount of water in the sensor detected was used  
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; },],  
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; usagePerHour: [undefined, {  
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; mL: Number, amount of water used in that hour.   
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }]  
&nbsp;&nbsp;&nbsp; }]  
}
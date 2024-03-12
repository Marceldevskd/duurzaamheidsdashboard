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
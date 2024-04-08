# Documentation for all the back-end API endpoints

## /add-sensor POST

### Description

Used to register extra sensors and creates a document for it in the database.

### Expects

JSON body:

```json
{  
   "name": "string", // Descriptive name  
   "type": "string", // "water", "electricity", etc.  
   "unit": "string"  // "mL", "kW", etc.  
}
```

#### Example

```json
{  
   "name": "WatersensorVerdieping1",  
   "type": "water",  
   "unit": "mL"  
}
```

### Returns

Status: 200, Error: None  
Status: 400, Error: Invalid data received  
Status: 400, Error: Sensor already exists  
Status: 500, Error: Internal server error  

## /add-reading POST

### Description

Used to add readings from sensors to the database.

### Expects

JSON body:

```json
{  
   "sensorName": "string", // Name of the sensor  
   "amount": "number",     // Reading using the default unit of the sensor  
   "time": "number"        // Unix timestamp (optional)  
}
```

#### Example

```json
{  
   "sensorName": "WatersensorVerdieping1",
   "amount": 2013,  
   "time": 1711204872000  
}
```

### Returns

Status: 200, Error: None  
Status: 400, Error: Invalid data received  
Status: 400, Error: Invalid sensor name  
Status: 500, Error: Internal server error  

## /get-readings GET

### Description

This API endpoint retrieves all the readings from the sensor(s) by sensor name or sensor type.

### Expects

URL parameters:

/get-readings?sensorName=: string, name of the sensor for readings  
or  
/get-readings?type=: string, the type of sensor for readings  

#### Examples

/get-readings?sensorName=WatersensorVerdieping1  
or  
/get-readings?type=water  

### Returns

Status: 200, Error: None  
Status: 400, Error: Invalid data received  
Status: 400, Error: Invalid sensor name  
Status: 400, Error: Invalid sensor type  
Status: 500, Error: Internal server error  

#### Example

```json
[
  {
    "date": "2024-03-19T23:00:00.000Z",
    "totalAmount": 227,
    "sensorReadings": [
      {
        "unixTime": 1710943485403,
        "amount": 3,
        "_id": "65faecfd5c4a05cb6a65abf6"
      },
      // More readings...
    ],
    "usagePerHour": [
      {
        "amount": 0,
        "_id": "65faecc05c4a05cb6a65aba8"
      },
      // More hourly readings...
    ]
  },
  // More date entries...
]
```

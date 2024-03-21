import express from "express";
import mongoose from "mongoose";
import addReading from "./routes/add-reading";
import addSensor from "./routes/add-sensor";
import getReadings from "./routes/get-readings";
import middleware from "./middleware";
// ...

// Connect to MongoDB
mongoose
	.connect("mongodb://127.0.0.1:27017/")
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Error connecting to MongoDB:", err));

// Express.js app
const app = express();
app.use(express.json());

app.use("/add-reading/", addReading);
app.use("/add-sensor", addSensor);
app.use("/get-readings", getReadings);

// app.get('/read-reading', async (req, res) => {
// 	try {
// 		// Read the data from the database
// 		const data = await Test.find({ name: "Number" });
// 		const result = data[0].number;
// 		res.status(200).json(result);
// 	} catch (err) {
// 		console.error('Error reading data:', err);
// 		res.status(500).send('Internal Server Error');
// 	}
// });

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

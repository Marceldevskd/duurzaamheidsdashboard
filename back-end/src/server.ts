import express from "express";
import mongoose from "mongoose";
import addReading from "./routes/add-reading";
import addSensor from "./routes/add-sensor";
import getReadings from "./routes/get-readings";
import middleware from "./middleware";
import cors from 'cors';

// Connect to MongoDB
mongoose
	.connect("mongodb://localhost:27017/")
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Error connecting to MongoDB:", err));


// Express.js app
const app = express();
app.use(express.json());
app.use(cors());

app.use("/add-reading", addReading);
app.use("/add-sensor", addSensor);
app.use("/get-readings", getReadings);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

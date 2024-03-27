import express from "express";
import mongoose from "mongoose";
import addReading from "./routes/add-reading";
import addSensor from "./routes/add-sensor";
import getReadings from "./routes/get-readings";
import addCompany from "./routes/add-company";
import middleware from "./middleware";


// Connect to MongoDB
mongoose
	.connect("mongodb://localhost:27017/")
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Error connecting to MongoDB:", err));


// Express.js app
const app = express();
app.use(express.json());

app.use("/add-company", addCompany);
app.use("/add-reading", middleware, addReading);
app.use("/add-sensor", middleware, addSensor);
app.use("/get-readings", middleware, getReadings);


// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

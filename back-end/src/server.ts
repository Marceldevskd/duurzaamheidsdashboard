// Import the necessary modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Import all the request handlers
import addReading from "./routes/add-reading";
import addSensor from "./routes/add-sensor";
import getReadings from "./routes/get-readings";
import lampLight from "./routes/add-light-reading/lamp-light";
import sunLight from "./routes/add-light-reading/sun-light";
import getLightReadings from "./routes/get-light-readings";

const corsOptions = {
  origin: "*", // Allows all origins
  methods: ["GET", "POST"], // Allows specific HTTP methods
  allowedHeaders: ["Content-Type"], // Allows specific headers
};

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Express.js app
const app = express();

app.use(cors(corsOptions));

// Middleware to log every request to console
app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  next();
});
// Enable parsing of JSON bodies
app.use(express.json());

// Enable parsing of URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Enable CORS

// Routes
app.use("/add-reading", addReading);
app.use("/add-sensor", addSensor);
app.use("/get-readings", getReadings);
app.use("/add-light-reading/lamps-on", lampLight);
app.use("/add-light-reading/sun-light", sunLight);
app.use("/get-light-readings", getLightReadings);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import express from 'express';
import mongoose, { Schema, Document } from 'mongoose';

// Define a Mongoose schema for the data
interface IUser extends Document {
    name: string;
    email: string;
    age: number;
}

const userSchema: Schema<IUser> = new Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model<IUser>('User', userSchema);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Express.js app
const app = express();

// Route to add dummy data
app.get('/add-dummy-data', async (req, res) => {
    try {
        // Create instances of the User model with dummy data
        const users = [
            { name: 'John Doe', email: 'john@example.com', age: 30 },
            { name: 'Jane Smith', email: 'jane@example.com', age: 25 }
        ];

        // Save the dummy data to the database
        await User.insertMany(users);

        res.status(200).send('Dummy data added successfully.');
    } catch (err) {
        console.error('Error adding dummy data:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

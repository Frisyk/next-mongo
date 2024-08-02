import mongoose from "mongoose";
const connection: { isConnected: number } = { isConnected: 0 }; // Initialize with 0
const connecttoDB = async () => {
    try {
        if (connection.isConnected) {
            console.log('Already connected to database');
            return;
        }
        const db = await mongoose.connect(process.env.MONGODB_URI!)
        connection.isConnected = db.connections[0].readyState;
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
};

export default connecttoDB;

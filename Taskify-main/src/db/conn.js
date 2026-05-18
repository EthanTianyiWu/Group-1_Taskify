const mongoose = require("mongoose");

const connectDB = async (retries = 5, delay = 3000) => {
    let attempt = 0;

    while (attempt < retries) {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            console.log("MongoDB connected successfully");
            return true;
        } catch (error) {
            attempt++;
            console.error(`MongoDB connection attempt ${attempt}/${retries} failed:`, error.message);

            if (attempt < retries) {
                console.log(`Retrying in ${delay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    console.error("Failed to connect to MongoDB after multiple attempts");
    return false;
};

module.exports = connectDB;

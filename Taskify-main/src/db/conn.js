const connectDB = async () => {
    console.warn("MongoDB is not available. Using memory-based storage.");
    return false;
};

module.exports = connectDB;

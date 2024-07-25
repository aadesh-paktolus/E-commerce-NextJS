import mongoose from "mongoose";

const url = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_DB_NAME;

if (!url) {
  throw new Error("Please connect to Database");
}

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(url, {
      dbName,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectToDatabase;

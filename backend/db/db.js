import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connect ho gaya bsdk 😎");
    } catch (error) {
        console.error("MongoDB me error hai ya fir db.js me:", error);
        process.exit(1);
    }
};

export default connectDB;
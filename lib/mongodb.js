import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB", res);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
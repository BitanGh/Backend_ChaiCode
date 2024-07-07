import mongoose from "mongoose";

const DB_NAME = 'videotube'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`database connected:${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB
import mongoose, { connect } from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(
      `Connected to the Mongo DB Database ${conn.connection.host}`.bgBlack.green
    );
  } catch (error) {
    console.log(`Error in MongoDB: ${error}`.bgRed.white);
  }
};

export default connectDB;

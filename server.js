import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
//config env
dotenv.config();
//databaseconfig
connectDB();
//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);
// rest API
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to E-commerce App",
  });
});

//PORT

const PORT = process.env.PORT;

//app run listen
app.listen(PORT, () => {
  console.log(
    `It is running on ${process.env.DEV_MODE} mode on Port ${PORT}`.bgCyan.white
  );
});

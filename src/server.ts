import express from "express";
import productsRouter from "./routes/product.routes";
import db from "./config/db";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";

dotenv.config();

const server = express();

export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.cyan("Connection Succesful to DB"));
  } catch (error) {
    console.error(
      colors.red("An error has ocurred while connecting to DB:"),
      error
    );
  }
}

// Configure CORS
const allowedOrigins = [
  process.env.FRONTEND_URL, 
  "http://localhost" // Allow requests with no origin (like Thunder Client or local tools) or from allowed origins
];
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS error: Origin ${origin} not allowed`);
      callback(new Error("CORS error: This origin is not allowed by CORS policy"), false);
    }
  },
};

connectDB();

// Middlewares
server.use(express.json());
server.use(cors(corsOptions));

//Routing.
server.use("/api/products", productsRouter);
server.use("/api", (req, res) => {
  res.json({ msg: "Hi!!!" });
});

export default server;

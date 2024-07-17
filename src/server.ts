import express from "express";
import productsRouter from "./routes/product.routes";
import db from "./config/db";
import colors from "colors";

const server = express();

async function connectDB() {
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

connectDB();

// Middlewares
server.use(express.json());

//Routing.
server.use("/api/products", productsRouter);

export default server;

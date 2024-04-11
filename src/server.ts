import express from "express";
import productsRouter from "./router";
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
      colors.red("An erro has ocurred while connectin to DB:"),
      error
    );
  }
}

// DB connection.
connectDB();

//Routing.
server.use("/products", productsRouter);

export default server;

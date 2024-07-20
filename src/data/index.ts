/**
 * This script checks if the command-line argument `--clear` is provided,
 * and if so, it calls the `clearDB` function to clear the database.
 */

import { exit } from "node:process";
import db from "../config/db";

const clearDB = async () => {
  try {
    await db.sync({ force: true });
    console.log("Data deleted succesfully");
    exit(0);
  } catch (error) {
    console.error(error);
    exit(1);
  }
};

if (process.argv[2] === "--clear") {
  clearDB();
}

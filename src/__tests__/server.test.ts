import request from "supertest";
import server, { connectDB } from "../server";
//import db from "../config/db";

describe("GET / api", () => {
  test("Should send back a JSON response", async () => {
    const res = await request(server).get("/api");

    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toMatchObject({ msg: "Hi!!!" });

    expect(res.statusCode).not.toBe(404);
    expect(res.body.msg).not.toBe("desde api");
  });
});

// jest.mock("../config/db");

// describe("connectDB", () => {
//   test("database connection error", async () => {
//     jest
//       .spyOn(db, "authenticate")
//       .mockRejectedValueOnce(
//         new Error("An error has ocurred while connecting to DB:")
//       );

//       const consoleSpy = jest.spyOn(console, 'log');

//       await connectDB();

//       expect(consoleSpy).toHaveBeenCalledWith(
//         expect.stringContaining("An error has ocurred while connecting to DB:")
//       )
//   });
// });

import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  try {
    res.send("Hola mundo con express");
  } catch (error) {
    console.error(error);
  }
});

export default router;

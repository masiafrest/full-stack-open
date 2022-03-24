import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/", (_req, res) => {
  res.send("hello");
});

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/bmi", (req, res) => {
  try {
    const { height, weight } = req.query;
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
      const result = calculateBmi(Number(height), Number(weight));
      res.json(result);
    } else {
      throw new Error("malformatted parameters");
    }
  } catch (error: unknown) {
    let errorMessage = "something went bad";
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    res.send(errorMessage);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

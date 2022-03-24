import express from "express";

import { calculateBmi } from "./bmiCalculator";
import {
  // getArrayInputFromArgs,
  calculateExersices,
} from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.body);
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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  try {
    const { daily_exercises } = req.body;
    if (
      req.body.hasOwnProperty("daily_exercises") &&
      req.body.hasOwnProperty("target")
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      // const getNumArray = getArrayInputFromArgs(daily_exercises);
      // const result = calculateExersices(getNumArray);
      const result = calculateExersices(daily_exercises);
      res.json(result);
    } else {
      throw new Error("parameter missing");
    }
  } catch (error) {
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

import express from "express";
import diagnosesService from "../services/diagnosesService";
import { toNewDiagnoseEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diagnosesService.getNonSensitiveEntries());
});

router.post("/", (req, res) => {
  try {
    const newDiagnoseEntry = toNewDiagnoseEntry(req.body);
    const addedEntry = diagnosesService.addDiagnose(newDiagnoseEntry);
    res.json(addedEntry);
  } catch (error) {
    let errorMessage = "something went wrong";
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;

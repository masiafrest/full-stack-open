import express from "express";
import patientsService from "../services/patientsService";

import { Entry, EntryWithOutId, NewPatientEntry, Patient } from "../types";
import { toNewPatientEntry, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNoSsnField());
});

router.get("/:id", (req, res) => {
  const patient = patientsService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    // check is have the correct patient entry
    const newPatientEntry: NewPatientEntry = toNewPatientEntry(req.body);

    // add patient entry after a sucessfull check
    const addedPatientEntry: Patient =
      patientsService.addPatient(newPatientEntry);
    res.json(addedPatientEntry);
  } catch (error) {
    let errorMessage = "something went wrong.";
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    console.log(req.params.id, req.body);
    const newEntry: EntryWithOutId = toNewEntry(req.body);

    const addedEntry: Entry = patientsService.addPatientEntry(
      req.params.id,
      newEntry
    );
    res.json(addedEntry);
  } catch (error) {
    let errorMessage = "something went wrong.";
    if (error instanceof Error) {
      errorMessage += ` Error: ${error.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;

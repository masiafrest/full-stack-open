import patients from "../../data/patients";
import { v1 as uuid } from "uuid";

import {
  Patient,
  PublicPatient,
  NewPatientEntry,
  EntryWithOutId,
  Entry,
} from "../types";

const getEntries = (): Patient[] => {
  return patients;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

const getNoSsnField = (): PublicPatient[] => {
  return patients.map(({ dateOfBirth, gender, id, name, occupation }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

const addPatient = (patientEntry: NewPatientEntry): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patientEntry,
  };
  patients.push(newPatient);
  return newPatient;
};

const addPatientEntry = (id: string, newEntry: EntryWithOutId): Entry => {
  const newEntryWithId: Entry = {
    id: uuid(),
    ...newEntry,
  };
  const patientIdx = patients.findIndex((patient) => patient.id === id);
  patients[patientIdx].entries.push(newEntryWithId);
  return newEntryWithId;
};

export default {
  getEntries,
  getNoSsnField,
  findById,
  addPatient,
  addPatientEntry,
};

import patients from "../../data/patients";
import { v1 as uuid } from "uuid";

import { Patient, NonSensitivePatientEntry, NewPatientEntry } from "../types";

const getEntries = (): Patient[] => {
  return patients;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};
const getNoSsnField = (): NonSensitivePatientEntry[] => {
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

export default {
  getEntries,
  getNoSsnField,
  findById,
  addPatient,
};

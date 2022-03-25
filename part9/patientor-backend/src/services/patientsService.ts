import patients from "../../data/patients";

import { Patient, NonSensitivePatientEntry } from "../types";

const getEntries = (): Patient[] => {
  return patients;
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

export default {
  getEntries,
  getNoSsnField,
};

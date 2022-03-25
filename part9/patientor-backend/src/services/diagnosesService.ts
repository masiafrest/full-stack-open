import diagnoses from "../../data/diagnoses";

import { Diagnose, NonSensitiveDiagnoseEntry } from "../types";

const getEntries = (): Array<Diagnose> => {
  return diagnoses;
};

const getNonSensitiveEntries = (): NonSensitiveDiagnoseEntry[] => {
  return diagnoses.map(({ name, code }) => ({
    name,
    code,
  }));
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
};

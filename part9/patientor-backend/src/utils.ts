import { NewPatientEntry, Gender, Diagnose } from "./types";

type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: PatientFields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseData(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseData(ssn),
    gender: parseGender(gender),
    occupation: parseData(occupation),
  };

  return newEntry;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseData = (data: unknown): string => {
  if (!data || !isString(data)) {
    throw new Error("Incorrect or missing");
  }
  return data;
};
// const parseName = (name: unknown): string => {
//   if (!name || !isString(name)) {
//     throw new Error("Incorrect or missing name");
//   }
//   return name;
// };

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date of birth");
  }
  return date;
};

// const parseSsn = (ssn: unknown): string => {
//   if (!ssn || !isString(ssn)) {
//     throw new Error("Incorrent or missing ssn");
//   }
//   return ssn;
// };

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrent or missing gender");
  }
  return gender;
};

// const parseOccupation = (occupation: unknown): string => {
//   if (!occupation || !isString(occupation)) {
//     throw new Error("Incorrent or missing occupation");
//   }
//   return occupation;
// };

const toNewDiagnoseEntry = ({ code, name, latin }: Diagnose): Diagnose => {
  const newDiagnose: Diagnose = {
    code: parseData(code),
    name: parseData(name),
  };
  if (latin) {
    newDiagnose.latin = parseData(latin);
  }

  return newDiagnose;
};

export { toNewPatientEntry, toNewDiagnoseEntry };

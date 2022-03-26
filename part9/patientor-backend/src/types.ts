export interface Diagnose {
  name: string;
  code: string;
  latin?: string;
}

export type NonSensitiveDiagnoseEntry = Omit<Diagnose, "latin">;

//Patient
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export enum Gender {
  Male = "male",
  Female = "female",
}

export type NewPatientEntry = Omit<Patient, "id">;

export interface Diagnose {
  name: string;
  code: string;
  latin?: string;
}

export type NonSensitiveDiagnoseEntry = Omit<Diagnose, "latin">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitivePatientEntry = Omit<Patient, "ssn">;

export type NewPatientEntry = Omit<Patient, "id">;

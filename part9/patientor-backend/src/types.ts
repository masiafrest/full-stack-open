export type Diagnose = {
  name: string;
  code: string;
  latin?: string;
};

export type NonSensitiveDiagnoseEntry = Omit<Diagnose, "latin">;

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
};

export type NonSensitivePatientEntry = Omit<Patient, "ssn">;

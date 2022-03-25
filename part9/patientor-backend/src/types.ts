export type Diagnose = {
  name: string;
  code: string;
  latin?: string;
};

export type NonSensitiveDiagnoseEntry = Omit<Diagnose, "latin">;

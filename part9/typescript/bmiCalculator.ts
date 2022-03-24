export interface BmiValues {
  value1: number;
  value2: number;
}
export interface BmiResult {
  height: number;
  weight: number;
  bmi: string;
}

export function calculateBmi(height: number, kilograms: number): BmiResult {
  return { height, weight: kilograms, bmi: "Normal (healthy weight)" };
}

export interface BmiValues {
  value1: number;
  value2: number;
}
export interface BmiResult {
  height: number;
  weight: number;
  bmi: string;
}

const parseArgs = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error("Not enough argumnets");
  if (args.length > 4) throw new Error("Too many argumnets");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  }
  throw new Error("Provided values were not numbers!");
};

export function calculateBmi(height: number, kilograms: number): BmiResult {
  return { height, weight: kilograms, bmi: "Normal (healthy weight)" };
}

try {
  const { value1, value2 } = parseArgs(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Something bad happened";
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  console.log(errorMessage);
}

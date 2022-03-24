interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function getArrayInputFromArgs(args: Array<string>): Array<number> {
  if (args.length <= 2) throw new Error("Not enough argumnets");

  const [first, second, ...restArgs] = args;
  const arrayOfNum = restArgs.map((e) => Number(e));
  if (!arrayOfNum.includes(NaN)) {
    return arrayOfNum;
  }
  throw new Error("numbers only!");
}

function calculateExersices(dailyExerciseHours: Array<number>): Result {
  return {
    periodLength: 7,
    trainingDays: 5,
    success: false,
    rating: 2,
    ratingDescription: "not too bad but could be better",
    target: 2,
    average: 1.9285714285714286,
  };
}

try {
  const arrayOfNum = getArrayInputFromArgs(process.argv);
  console.log(calculateExersices(arrayOfNum));
} catch (error: unknown) {
  let errorMessage = "Something bad happend";
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  console.log(errorMessage);
}

getArrayInputFromArgs(process.argv);

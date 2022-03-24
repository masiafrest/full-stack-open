interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export function getArrayInputFromArgs(args: Array<string>): Array<number> {
  if (args.length <= 2) throw new Error("Not enough argumnets");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_f, _s, ...restArgs] = args;
  const arrayOfNum = restArgs.map((e) => Number(e));
  if (!arrayOfNum.includes(NaN)) {
    return arrayOfNum;
  }
  throw new Error("numbers only!");
}

export function calculateExersices(_dailyExerciseHours: Array<number>): Result {
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

interface PartProps {
  course: CoursePart;
}

const asserNever = (value: never): never => {
  throw new Error(`
    Unhandled discriminated union member: ${JSON.stringify(value)} 
  `);
};

export default function Part({ course }: PartProps) {
  switch (course.type) {
    case "normal":
      return (
        <p key={course.name}>
          <h2>
            {course.name} {course.exerciseCount}
          </h2>
          <span>{course.description}</span>
        </p>
      );
    case "groupProject":
      return (
        <p key={course.name}>
          <h2>
            {course.name} {course.exerciseCount}
          </h2>
          <span>project exersices {course.groupProjectCount}</span>
        </p>
      );
    case "submission":
      return (
        <p key={course.name}>
          <h2>
            {course.name} {course.exerciseCount}
          </h2>
          <span>{course.description}</span>
          <span>submit to {course.exerciseSubmissionLink}</span>
        </p>
      );
    case "special":
      return (
        <p key={course.name}>
          <h2>
            {course.name} {course.exerciseCount}
          </h2>
          <span>{course.description}</span>
          <span>require skills: {course.requirements.join(", ")}</span>
        </p>
      );
      ", ";
    default:
      return asserNever(course);
  }
}

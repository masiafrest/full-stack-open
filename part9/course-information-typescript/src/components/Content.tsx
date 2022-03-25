import Part from "./Part";

export default function Content({ courseParts }: CoursePartsProps) {
  return (
    <>
      {courseParts.map((course) => (
        <Part key={course.name} course={course} />
      ))}
    </>
  );
}

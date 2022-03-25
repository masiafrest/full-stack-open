/// <reference types="react-scripts" />

interface CoursePartBase {
  type: string;
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription {
  description: string;
}

interface CourseNormalPart extends CoursePartBase, CoursePartDescription {
  type: "normal";
}

interface CourseSubmissionPart extends CoursePartBase, CoursePartDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseGroupProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSpecialPart extends CoursePartBase, CoursePartDescription {
  type: "special";
  requirements: string[];
}

type CoursePart =
  | CourseNormalPart
  | CourseSubmissionPart
  | CourseGroupProjectPart
  | CourseSpecialPart;

interface CoursePartsProps {
  courseParts: CoursePart[];
}

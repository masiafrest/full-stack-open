import React from "react";
import Part from "./Part";

const Content = ({ parts }) => (
  <>
    {parts.map((e) => (
      <Part part={e.name} exercises={e.exercises} />
    ))}
  </>
);

export default Content;

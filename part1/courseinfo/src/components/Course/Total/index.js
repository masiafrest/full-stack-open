import React from "react";
export default function Total({ exercises }) {
  return (
    <strong>
      total of {exercises.reduce((a, v) => a + v.exercises, 0)} exercises{" "}
    </strong>
  );
}

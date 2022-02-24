import React from "react";

export default function Notification({
  notification: { message, error, noti },
}) {
  console.log("message", message, error, noti);
  if (!noti) return null;

  const successStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  return <div style={error ? errorStyle : successStyle}>{message}</div>;
}

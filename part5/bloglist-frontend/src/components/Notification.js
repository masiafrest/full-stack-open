import { useSelector } from "react-redux";

export default function Notifications() {
  const notification = useSelector((state) => state.notification);
  const errorStyle = {
    border: "1px solid red",
    color: "red",
  };
  const successStyle = {
    border: "1px solid black",
  };

  const isError = notification?.error;

  return (
    <div style={isError ? errorStyle : successStyle}>
      {notification?.message}
    </div>
  );
}

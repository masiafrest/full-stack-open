export default function Notifications({ message }) {
  const errorStyle = {
    border: "1px solid red",
    color: "red",
  };
  const successStyle = {
    border: "1px solid black",
  };

  const isError = message?.error;

  return (
    <div style={isError ? errorStyle : successStyle}>{message?.message}</div>
  );
}

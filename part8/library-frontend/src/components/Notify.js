export default function Notify({ errorMessage }) {
  if (!errorMessage) return null;

  return <div>Notify: {errorMessage} </div>;
}

export default function Persons({ persons = [], filter }) {
  return persons
    .filter((e) => e.name.toLowerCase().includes(filter))
    .map((e) => (
      <p>
        {e.name} {e.number}
      </p>
    ));
}

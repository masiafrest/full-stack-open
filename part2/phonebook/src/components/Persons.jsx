import services from "../services/persons";
export default function Persons({
  persons = [],
  setPersons,
  filter,
  setNotification,
}) {
  const onDelete = (person) => () => {
    const res = window.confirm(`Delete ${person.name}?`);
    if (res) {
      services.delPerson(person.id).then(() => {
        setPersons(persons.filter((e) => e.id !== person.id));
        setNotification({
          error: true,
          noti: true,
          message: `Information been remove ${person.name}`,
        });
        setTimeout(() => {
          setNotification({
            error: false,
            noti: false,
            message: ``,
          });
        }, 5000);
      });
    }
  };
  return persons
    .filter((e) => e.name.toLowerCase().includes(filter))
    .map((e) => (
      <p key={e.name}>
        {e.name} {e.number}
        <button onClick={onDelete(e)}>delete</button>
      </p>
    ));
}

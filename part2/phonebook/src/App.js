import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import services from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const notiInitialState = {
    noti: false,
    error: false,
    message: "",
  };
  const [notification, setNotification] = useState(notiInitialState);

  useEffect(() => {
    services.getAllPersons().then((data) => {
      setPersons(data);
    });
  }, []);

  const nameOnChange = (e) => {
    setNewName(e.target.value);
  };
  const phoneOnChange = (e) => {
    setNewPhone(e.target.value);
  };
  const filterOnChange = (e) => {
    setFilter(e.target.value);
  };

  const addName = (e) => {
    e.preventDefault();
    const haveName = persons.find((person) => person.name === newName);
    const newPerson = { name: newName, number: newPhone };
    if (haveName) {
      const res = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (res) {
        services.updatePerson(haveName.id, newPerson).then((data) => {
          setPersons(
            persons.map((person) => (person.id === data.id ? data : person))
          );
          setNotification({
            error: false,
            noti: true,
            message: `Added ${newName}`,
          });
        });
      }
    } else {
      services.savePerson(newPerson).then((data) => {
        setPersons(persons.concat(data));
        setNotification({
          error: false,
          noti: true,
          message: `Added ${newName}`,
        });
      });
    }
    setTimeout(() => {
      setNotification(notiInitialState);
    }, 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notification.noti ? (
        <Notification notification={notification} />
      ) : (
        <Filter filter={filter} onChange={filterOnChange} />
      )}
      <h2>add a new</h2>
      <PersonForm
        values={{ newName, newPhone }}
        onChanges={{ nameOnChange, phoneOnChange }}
        addName={addName}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        filter={filter}
        setNotification={setNotification}
      />
    </div>
  );
};

export default App;

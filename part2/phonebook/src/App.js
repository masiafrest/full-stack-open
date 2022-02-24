import axios from "axios";
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import services from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

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
        });
      }
    } else {
      services.savePerson(newPerson).then((data) => {
        setPersons(persons.concat(data));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={filterOnChange} />
      <h2>add a new</h2>
      <PersonForm
        values={{ newName, newPhone }}
        onChanges={{ nameOnChange, phoneOnChange }}
        addName={addName}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  );
};

export default App;

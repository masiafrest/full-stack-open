import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

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
    const haveName = persons.some((person) => person.name === newName);
    if (haveName) {
      return alert(`${newName} is already added to phonebook`);
    }
    const newPerson = { name: newName, number: newPhone };
    setPersons(persons.concat(newPerson));
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
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;

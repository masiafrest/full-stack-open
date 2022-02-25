const app = require("express")();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});
app.get("/info", (req, res) => {
  res.send(
    "<div>Phonebook has info for 2 people</div><div>" + new Date() + "</div>"
  );
});
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  if (id) {
    const person = persons.find((e) => e.id === id);
    res.json(person);
  }
  res.status(404).end;
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  if (id) {
    persons = persons.filter((e) => e.id !== id);
    res.status(204).json(persons);
  }
  res.status(404).end;
});

app.post("/api/persons/", (req, res) => {
  const generateId = () => {};
  const id = Number(req.params.id);
  if (id) {
    persons = persons.filter((e) => e.id !== id);
    res.status(204).json(persons);
  }
  res.status(404).end;
});

app.listen(3001, () => {
  console.log("listen on port 3001");
});

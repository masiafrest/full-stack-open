require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const Person = require("./models/person");
const { response } = require("express");

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.use(cors());
app.use(express.json());

app.use(express.static("build"));

morgan.token("body", (req, res) => JSON.stringify(req.body));

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.body(req, res),
    ].join(" ");
  })
);

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/info", (req, res) => {
  Person.countDocuments().then((count) => {
    res.send(
      `<div>Phonebook has info for ${count} people</div><div>${new Date()}</div>`
    );
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      }
      res.status(404).end();
    })
    .catch((err) => {
      // consolo.log(error)
      // res.status(400).send({error: 'malformatted id'})
      next(err);
    });
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const { number } = req.body;
  Person.findByIdAndUpdate(
    id,
    { number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((err) => next(err));
});

app.post("/api/persons/", (req, res, next) => {
  const { name, number } = req.body;
  if (name === "" || number === "") {
    return res.status(400).send({ error: "name and number can not be empty" });
  }
  // Person.findOne({ name })
  //   .exec()
  //   .then((res) => {
  //     if (res) {
  //       return res.status(409).send({ error: "name already exist" });
  //     }
  //   });

  const person = new Person({
    name,
    number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((err) => next(err));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});

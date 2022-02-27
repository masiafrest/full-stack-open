const mongoose = require("mongoose");
if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://masiafrest:${password}@cluster0.ibtvd.mongodb.net/phoneBook?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);
const name = process.argv[3];
const number = process.argv[4];
const person = new Person({
  name,
  number,
});

person.save().then((result) => {
  console.log("person saved!", result);
  mongoose.connection.close();
});

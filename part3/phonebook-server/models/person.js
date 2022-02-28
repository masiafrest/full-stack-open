const moongose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

moongose
  .connect(url)
  .then((res) => {
    console.log("connected to MongoDb");
  })
  .catch((err) => {
    console.log("error connecting to MongoDb:", err.message);
  });

const personSchema = new moongose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: function (v) {
        const arr = v.split("-");
        console.log("arr", arr.length);
        if (
          arr.length < 2 ||
          arr.length > 2 ||
          arr[0].length > 3 ||
          isNaN(arr[0]) ||
          isNaN(arr[1])
        ) {
          return false;
        }
      },
      message: (props) => `${props.value} invalid numbers`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = moongose.model("Person", personSchema);

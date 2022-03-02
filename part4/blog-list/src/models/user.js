const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  passwordHash: {
    type: String,
    require: true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.set("toJSON", (doc, returnedObj) => {
  returnedObj.id = returnedObj._id.toString();
  delete returnedObj._id;
  delete returnedObj.__v;
  delete returnedObj.passwordHash;
});

const User = mongoose.model("User", userSchema);

module.exports = User;

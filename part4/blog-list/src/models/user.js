const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    minlength: 3,
    unique: true,
  },
  name: {
    type: String,
    require: true,
    minlength: 3,
  },
  passwordHash: {
    type: String,
    require: true,
    minlength: 3,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.virtual("blogsCount", {
  ref: "Blog",
  localField: "_id",
  foreignField: "user",
  count: true,
});

userSchema.set("toJSON", {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
    delete returnedObj.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

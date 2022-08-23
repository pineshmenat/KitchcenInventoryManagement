const mongoose = require("mongoose");
const { User } = require("./models/User");

mongoose
  .connect("mongodb://localhost/kitchcenInventory")
  .then(() => console.log("Connected to mongoDB..."))
  .catch((err) => console.log("error connecting mongoDB", err));

async function createUser() {
  const user1 = new User({
    // Object
    firstName: "Pinesh",
    lastName: "Menat",
    email: "pineshmenat@gmail.com",
    password: "abcd@1234",
    isAdmin: true,
  });

  const result = await user1.save();
  const user2 = new User({
    firstName: "Vaishnavi",
    lastName: "Panchal",
    email: "vaishnavi.panchalk@gmail.com",
    password: "abcd@1234",
    isAdmin: true,
  });

  const result2 = await user2.save();
  console.log({ result, result2 });
}

// createUser();

async function getUsers() {
  const users = await User.find();
  console.log(users);
}

getUsers();

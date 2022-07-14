const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "Kenal",
    email: "kenal@example.com",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    name: "Vishwa",
    email: "vishwa@example.com",
    password: bcrypt.hashSync("12345", 10),
  },
];

module.exports = users;

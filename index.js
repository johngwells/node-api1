// implement your API here
const express = require("express");
const shortid = require("shortid");
const db = require("./data/db");

const server = express();

let users = [];

server.use(express.json());

// Post: Users
server.post("/api/users", (req, res) => {
  const usersInfo = req.body;
  const { name, bio } = req.body;

  usersInfo.id = shortid.generate();

  // validate user object is complete & not missing fields
  if (!name || !bio) {
    res.status(400).json({ error: "Provide name & bio for the user" });
  }

  // Error Check || Successful: save user to database
  if (users) {
    users.push(usersInfo);
    // return new user document
    res.status(201).json(usersInfo);
  } else {
    res.status(500).json({
      error: "There was an error while saving the user to the database"
    });
  }
});

// Get: All users
server.get("/api/users", (req, res) => {
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(500).json({ error: 'The users information could not be retrieved'});
  }
});

// Get: /api/users/:id


const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

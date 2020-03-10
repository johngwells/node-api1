// implement your API here
const express = require("express");
const shortid = require("shortid");
const db = require("./data/db");

const server = express();

let users = [];
let currentId = 1;

server.use(express.json());

// Post: Users
server.post("/api/users", (req, res) => {
  const usersInfo = req.body;
  const { name, bio } = req.body;

  usersInfo.id = shortid.generate();

  // validate user object is complete & not missing fields
  if (!name || !bio) {
    res.status(400).json({ error: "Provide name & bio for the user" });
  } else {
    const newUser = {
      id: currentId,
      name: name,
      bio: bio
    };
    currentId += 1;

    users.push(newUser);
    res.status(200).json({ message: 'User added successfully', user: newUser});
  };
}) 

// Get: All users
server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// // Get: /api/users/:id
// server.get("/api/users/:id", (req, res) => {
//   const userId = req.params.id;

//   // check for userId
//   if (userId) {
//     db.findById(userId);
//     res.send(userId);
//   } else {
//     res
//       .status(404)
//       .json({ error: "user with the specified ID does not exist" });
//   }
// });

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

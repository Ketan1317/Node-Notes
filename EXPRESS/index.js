const express = require("express");
const app = express();
const fs = require("fs");
const PORT = 8000;
let users = require("./MOCK_DATA.json"); // Load the JSON data

// Plugins / Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((item) => item.id === id);
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }
    res.json(user);
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const updatedUsers = users.filter((item) => item.id !== id);

    // Write updated data to file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(updatedUsers, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ status: "error", message: "Failed to update file" });
      }
      users = updatedUsers; // Update the in-memory users array
      return res.json({ status: "success", message: `User with ID ${id} deleted` });
    });
  })
  .post((req, res) => {
    res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  const newUser = { ...body, id: users.length + 1 };
  const updatedUsers = [...users, newUser];

  // Write updated data to file
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(updatedUsers, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Failed to save user" });
    }
    users = updatedUsers; // Update the in-memory users array
    return res.json({ status: "success", data: newUser });
  });
});

app.get("/api/users", (req, res) => {
  res.json(users); // Sends the user data in JSON format
});

app.get("/users", (req, res) => {
  const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
  res.send(html); // Sends the generated HTML as a response
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const Client = require("./models/Client");
const router = express.Router();

// Get all clients
router.get("/clients", async (req, res) => {
  const clients = await Client.find();
  res.send(clients);
});

// Add new client
router.post("/clients", async (req, res) => {
  const client = new Client({
    title: req.body.title,
    content: req.body.content
  });
  await post.save();
  res.send(post);
});

// Get one client data
router.get("/clients/:id", async (req, res) => {
  try {
    const client = await Client.findOne({ _id: req.params.id });
    res.send(client);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

// Change data
router.patch("/clients/:id", async (req, res) => {
  try {
    const client = await Client.findOne({ _id: req.params.id });

    if (req.body.title) {
      client.title = req.body.title;
    }

    if (req.body.content) {
      client.content = req.body.content;
    }

    await client.save();
    res.send(client);
  } catch {
    res.status(404);
    res.send({ error: "Client doesn't exist!" });
  }
});

router.delete("/clients/:id", async (req, res) => {
  try {
    await Client.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Client doesn't exist!" });
  }
});

module.exports = router;

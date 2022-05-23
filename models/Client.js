const mongoose = require("mongoose");

const schema = mongoose.Schema({
    username: String,
    password: String,
    balance: Number
});

module.exports = mongoose.model("Client", schema);
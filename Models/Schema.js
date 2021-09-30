const mongoose = require("mongoose");

const databSchema = new mongoose.Schema({
    Date: Date,
    payment: String
});

const Datab = mongoose.model("Datab", databSchema);

module.exports = Datab;
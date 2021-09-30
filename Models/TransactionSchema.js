const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    Date:Date,
    amount:Number,
    Description:String,
    comment:String
});

const Transaction= mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
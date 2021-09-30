const mongoose = require("mongoose");
const Transaction = require("./TransactionSchema");

const customerSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    Balance: Number,
    transactions:[{
        type:mongoose.Schema.Types.ObjectId, ref:"Transaction"
    }],
    avatar:String,
    contact:Number,
    about:String
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
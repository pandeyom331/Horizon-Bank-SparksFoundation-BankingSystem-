const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
require('dotenv').config();
const Customer = require("./models/UserSchema");
const Transaction = require("./models/TransactionSchema");
const Datab = require("./models/Schema");

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.URI || "mongodb://localhost:27017/banking", 
    { 
        useUnifiedTopology: true, 
        useNewUrlParser: true
    }
).then(() => {
        console.log("connected");
    })
    .catch((err) => {
        console.log("error", err);
    })

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");


app.get("/", function(req, res){
  res.render("home");
})

app.get("/allCustomers", async (req, res)=>{
    const customer = await Customer.find({});
    if (!customer) {
        console.log("No users exist 401");
    }
    res.render("allCustomers", { customer });
})

app.get("/allTransactions", async(req, res)=>{
    const detail = await Datab.find({});
    res.render("allTransactions", {detail})
})

app.get("/allCustomers/:id", async(req,res)=>{
    const {id} = req.params;
    const customer = await Customer.findById(id);
    const user = customer.username;
    if(!user)
    {
        console.error("User Not Found 401");
    }
    await Customer.findOne({username : user})
        .populate("transactions")
        .exec(function(err, data) {
            //to convert into the object or Json
            data.toObject({getters:true});
            res.render("show", {data});
        });
})

app.get("/allCustomers/:id/transfer", async(req, res) => {
    const { id } = req.params;
    const cs = await Customer.findById(id);
    const cus = await Customer.find({});
    if(!cs || !cus){
        console.error("User Not Found 401");
    }
    res.render("transfer", { cus, cs });
});

app.get("/allCustomers/:id/history", async(req, res) => {
    const {id} = req.params;
    const customer = await Customer.findById(id);
    const user = customer.username;
    
    if(!user){
        console.error("User Not Found 401");
    }

    await Customer.findOne({username : user})
    .populate("transactions")
    .exec(function(err, data) {
        //to convert into the object or Json
        data.toObject({getters:true});
        res.render("history", {data});
    }); 
})

app.post("/allCustomers", async(req, res) => {
    const {username, Amount, From, comment} = req.body;
    const cus = await Customer.findOne({ username: username }); //using findOne Instead Of find so that it return an object not array
    const b = await Customer.findOne({ username: From });
    if (!cus || !b) {
        console.error("User Not Found 401");
    }
    if (b.Balance > 0 && Amount < b.Balance && Amount > 0) {
        const f = new Transaction({ Date: Date(), amount: Amount, Description: `Recieved Rs ${Amount} from ${b.username}`, comment: `${comment}` });
        await f.save();
        const t = new Transaction({ Date: Date(), amount: Amount, Description: `Paid Rs ${Amount} to ${cus.username}`, comment: `${comment}` });
        await t.save() //If we want to use populate we need to use this
        cus.transactions.push(f);
        await cus.save();
        const d = new Datab({ Date: Date(), payment: `${b.username} sends Rs ${Amount} to ${cus.username}` });
        await d.save();
        b.transactions.push(t);
        await b.save();
        const am = parseInt(cus.Balance) + parseInt(Amount);
        await Customer.findOneAndUpdate({ username: From }, { Balance: parseInt(b.Balance) - parseInt(Amount) });
        await Customer.findOneAndUpdate({ username: username }, { Balance: am });
        res.redirect("/");
    } else if (Amount > b.Balance) {
        console.error("You Haven't enough Balance to make payment 500");
    } else {
        console.error("Amount should be positive 500");
    }
})

app.all("*", (req, res) => {
    res.render("Error");
});

app.listen(PORT, (req, res) => {
    console.log(`Connected on server : ${PORT}`);
});
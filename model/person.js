const mongoose = require("mongoose");

// Define persion's Schema
const personShcema  = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number
    },
    work : {
        type : String,
        enum : ["waiter","Manager","Chef"],
        required : true
    },
    mobile : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    adress : {
        type : String
    },
    salary : {
        type : Number,
        required : true
    }
});

// create person model
const person = mongoose.model("person",personShcema);
module.exports = person;
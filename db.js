const mongoose = require("mongoose");

//Define MongoDB connections URL
const mongodburl = "mongodb://127.0.0.1:27017/hotels"; // "hotels" is the name of database

//Set up MongoDB
mongoose.connect(mongodburl,{
    useNewUrlParser : true,
    useUnifiedTopology : true
});

// Get the default Connection
// Mongoose maintains a Default Connection objct representing the MongoDB connection
const db = mongoose.connection;

// Define Event listeners for Database Connection
db.on("connected",()=>{
    console.log("Connected to MOngoDb server");
});

db.on("error",(err)=>{
    console.log("MongoDB connection error",err);
});

db.on("disconnected",()=>{
    console.log("MOngoDb server Disconnected");
});

module.exports = db;
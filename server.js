const express  = require("express");
const app  = express();
const db = require("./db");
let port = 8080;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get("/",function(req,res){
    res.send("Wellcome to our Hotel");
});

// Import the router file
const personRout = require("./routs/personRouts");
const menuItemRout = require("./routs/menuItemRouts");
// Use person routes
app.use("/person",personRout);
// Use MenuItem routes
app.use("/menu",menuItemRout);



app.listen(port,()=>console.log(`App is listening on port: ${port}`));
// comment added for tsting parpus
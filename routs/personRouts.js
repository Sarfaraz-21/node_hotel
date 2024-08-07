const express = require("express");
const router = express.Router();
const person = require("./../model/person");


// post rout and add a person (Create)
router.post("/", async(req,res)=>{
    try{
        const data = req.body; //Asuming the request body contains the person data

    // create a newperson document using mongosh model
    const newPerson = person(data);

    // save new person to db
    const savedPerson = await newPerson.save();
    console.log("data is saved");
    res.status(200).json({savedPerson});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "internal server error"});
    }
});

// Get method to get the person (Read)
router.get("/",async(req,res)=>{
    try{
        const data = await person.findOne();
        res.status(500).json({data});
        console.log("data fatched successfully");
    }catch(err){
        console.log(err);
        res.status(500).json({error: "internal server error"});   
    }
});

// parametrised Routing (Read)
router.get("/:worktype", async(req,res)=>{
    try{
        const worktype = req.params.worktype; // extract the work type from URL parameter
        if(worktype == "chef" || worktype == "manager" || worktype == "waiter"){
            const response = await person.find({work : worktype});
            console.log("response send");
            res.status(200).json(response);
        }else{
            res.status(400).json({error: "Invalid work type"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: "internal server error"});
    }
});

// Update
router.put("/:id",async(req,res)=>{
    try{
        const personId = req.params.id; // extrct the id from URL parameter
        const personUpdatedData = req.body; // Update data for person
        const response = await person.findByIdAndUpdate(personId,personUpdatedData ,{
            new : true, // Return the updated Document
            runValidators : true // Run mongoose validation
        });

        if(!response){
            res.status(404).json({error : "Person not found"});
        }
        console.log("Data Updated");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "internal server error"});
    }
});

// Delete
router.delete("/:id", async(req,res)=>{
    try{
        const personId = req.params.id; // extract the id from URL parameter
        const response = await person.findByIdAndDelete(personId);
        if(!response){
            res.status(404).json({error : "Person not found"});
        }
        console.log("person is Deleted");
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error : "internal server error"});
    }
})
module.exports = router;
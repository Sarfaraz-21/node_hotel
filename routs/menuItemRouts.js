const express = require("express");
const router = express.Router();
const menuItem = require("../model/menu");

// Post request for Menu(Create)
router.post("/", async(req,res)=>{
    try{
        const data = req.body;
        const newMenu = menuItem(data);

        const savedMenu = await newMenu.save();
        console.log("Item saved");
        res.status(200).json({savedMenu});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
});

// get (Read)
router.get("/",async(req,res)=>{
    try{
        const data = await menuItem.findOne();
        console.log("Data fatched Successfully");
        res.status(200).json({data});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
});

// Update
router.put(":/id",async(req,res)=>{
    try{
        const menuId = req.params.id;
        const menuData = req.body;
        const updatedMenu = menuItem.findByIdAndUpdate(menuId,menuData,{
            new : true, // return the Updated Document
            runValidators: true // accept all validators
        })
        if(!updatedMenu){
            res.status(404).json({error:"Item not found"});
        }
        console.log("item Updated Successfully");
        res.status(200).json({updatedMenu});
    }catch(err){
        console.log(err);
        res.status(200).json({error:"internal server error"});
    }
});
// Delete
router.delete(":/id", async(req,res)=>{
    try{
        const itemId = req.params.id; // Extract id from Url parameter
        const deletedItem = await menuItem.findByIdAndDelete(itemId);
        if(!deletedItem){
            res.status(404).json({error:"Item Not Found"})
        }
        console.log("Item Deleted Successfully");
        res.status(200).json({deletedItem})
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
});

router.get(":/taste",async(req,res)=>{
    try{
        const taste = req.params.taste;
        if(taste =="sweet"||taste == "sour"|| taste == "spicy"){
            const response = await menuItem.find({taste:"sweet"});
            console.log("resposse sended");
            res.status(200).json({response});
        }else{
            res.status(404).json({error:"invalid taste type"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
});
module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt=require('bcryptjs');
const Post=require('../models/Post');
const Comment=require('../models/Comment');
const verifyToken = require('../verifyToken');

// UPDATE
router.put("/:id",async (req,res)=>{
    try{
        if(req.body.password){
            const salt=await bcrypt.genSalt(10)
            req.body.password=await bcrypt.hashSync(req.body.password,salt)
        }
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)
    }
    catch(err){
        res.status(500).json(err)
    }
})
// DELETE
router.delete("/:id",  async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        await Post.deleteMany({userId:req.params.id});
        await Comment.deleteMany({userId:req.params.id})
        res.status(200).json("User Has Been Deleted!");
    }
    catch {
        res.status(500).json(err);
    }
})

// GETUS
router.get("/123",(req,res)=>{
    console.log("it's working");
    res.send("hello");
    
})
router.get("/:id", async (req, res) => {
    try{
        // console.log("get user");
        const user =await User.findById(req.params.id);
        const {password,...info}=user._doc;
        res.status(200).json(info);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router
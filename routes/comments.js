const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt=require('bcryptjs');
const Post=require('../models/Post')
const Comment=require('../models/Comment');
const verifyToken = require('../verifyToken');

//CREATE
router.post("/create",verifyToken,async (req,res)=>{
    try{
        const newComment=new Comment(req.body)
        const savedComment=await newComment.save()
        res.status(200).json(savedComment)
    }
    catch(err){
        res.status(500).json(err)
    }
     
})

// UPDATE
router.put("/:id",verifyToken,async (req, res) => {
    try{
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        // with new:true
        // updated doc will be return 
        res.status(200).json(updatedComment);
    }catch(err){
        res.status(200).json(err);
    }
})


// DELETE
router.delete("/:id",verifyToken, async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("Comment Has Been Deleted!");
    }
    catch (err){
        res.status(500).json(err);
    }
})


// get Posts Comments
router.get("/post/:postId",async(req,res)=>{
    try{
        const comments=await Comment.find({postId:req.params.postId});
        res.status(200).json(comments);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router


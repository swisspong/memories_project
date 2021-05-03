import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'

export const getPosts = async (req,res) => {
    try {
        const postMessages = await PostMessage.find()
        // console.log(postMessages)
        res.status(200).json(postMessages)
    }catch(err) {
        res.status(404).json({message:err.message})
    }
}



export const createPosts =async (req,res) => {
    const post= req.body;
    
    const newPostMessage = new PostMessage({...post,creator:req.userId,createAt:new Date().toISOString()})

    try {
        await newPostMessage.save();
        // console.log("create + "+ newPostMessage._id )
        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req,res) => {
    const {id:_id} = req.params
    const post = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
    const updatePost = await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true})
    res.json(updatePost)
}

export const deletePost = async (req,res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id")
    await PostMessage.findByIdAndDelete(id)
    res.json({message:'Post delete successfully'})
}

export const updateLikePost = async (req,res) => {
    const {id} = req.params

    if(!req.userId) return res.json({message:"Unauthenticated"})

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id")
    const post = await PostMessage.findById(id)
    const index = post.likes.findIndex((id) => id === String(req.userId))
    if(index === -1){
        post.likes.push(req.userId);
    }else{
        post.likes = post.likes.filter((id)=> id !== String(req.userId))
    }

    const updateLikePost = await PostMessage.findByIdAndUpdate(id,post,{new:true})
    res.json(updateLikePost)
}
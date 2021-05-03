import express from 'express';
import {createPosts, deletePost, getPosts, updateLikePost, updatePost} from '../controllers/posts.js'
import auth from '../middleware/auth.js'
const router =express.Router();


router.get('/',getPosts)
router.post('/',auth,createPosts)
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost)
router.patch('/:id/likePost',auth,updateLikePost)

export default router
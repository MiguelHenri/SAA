import express from "express";
import {createPost, getPosts, getPost, updatePost, deletePost} from "../controllers/posts.js";
import { uploadImage } from "../middleware/aws.js";

const router = express.Router();
router.post('/', uploadImage, createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.put('/:id', uploadImage, updatePost);
router.delete('/:id', deletePost);

export default router;
import express from "express";
import {createPost, getPosts, getPost, updatePost, deletePost} from "../controllers/posts.js";
import { formDataMiddleware } from "../middleware/aws.js";

const router = express.Router();
router.post('/', formDataMiddleware, createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.put('/:id', formDataMiddleware, updatePost);
router.delete('/:id', deletePost);

export default router;
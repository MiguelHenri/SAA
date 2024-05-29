import mongoose from "mongoose";

const schema = new mongoose.Schema({
    posterUsername: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    imageId: mongoose.ObjectId,
    content: {
        type: String,
        required: true
    }
})

const Blog = new mongoose.Model(schema);
export default Blog;
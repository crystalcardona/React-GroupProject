


const posts = require("express").Router();
const { getPosts, getPostByID, deletePost, editPost } = require("../queries/posts");


posts.get("/", getPosts);

posts.get("/:id", getPostByID);

// posts.post("/", createPost);

posts.delete("/:id", deletePost);

posts.patch("/:id", editPost);

module.exports = posts;

module.exports = posts;
const conn = require("../database");
const { getAllPostsQuery, createNewPostQuery, deletePostQuery, updatePostQuery, getSpecificPostQuery } = require("./queries/query");

getAllPosts = async (req, res, next) => {        // GET POSTS
    try {
        let posts = await getAllPostsQuery(req.params.id);
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error.message);
    };
};

getSpecificPost = async (req, res, next) => {    // GET POST BY ID
    try {
        let post = await getSpecificPostQuery(req.params.id);
        res.status(200).send(post);
    } catch (error) {
            res.status(500).send(error.message)
    };
};

createPost = async (req, res, next) => {         //CREATE NEW POST
    try {
        await createNewPostQuery(req.body);
        res.status(200).send("Post Added");
    } catch (error) {
        res.send(error.message);
    };
};

deletePost = async (req, res, next) => {      // DELETE POST
    try {
        await deletePostQuery(req.params.id);
        res.status(200).send("POST DELETED!");
    } catch (error) {
        res.status(500).send(error.message);
    };
};

updatePost = async(req, res, next) => {   // UPDATE POST
    try {   
        await updatePostQuery(req.body , req.params.id);
        res.status(200).send("Post Updated!");
    } catch (error) {
        res.status(500).send(error.message);
    };
};

module.exports = { getAllPosts, createPost, deletePost, updatePost,getSpecificPost};

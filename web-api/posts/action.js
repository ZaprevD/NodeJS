const conn = require("../database");
const {getAllPostsQuery , createNewPostQuery} = require("./queries/query");

getAllPosts = async (req, res, next) => {      // GET POSTS
    try {
        let posts = await getAllPostsQuery();
        res.status(200).send(posts);

    } catch (error) {
        res.status(500).send(error.message);
    };
};

createPost = async (req, res, next) => {      //CREATE NEW POST
    try {
        await createNewPostQuery(req.body);
        res.status(200).send("Post Added");
    } catch (error) {
        res.send(error.message);
    }
};

deletePost = (req, res, next) => {      // DELETE POST
    try {
        if (parseInt(req.params.id) !== 0) {
            let query = "DELETE FROM posts WHERE Id = ?";
            conn.query(query, [req.params.id], (error, results, fields) => {
                if (error) throw error;
                res.status(200).send("Post Deleted!");
            });
        } else {
            var error = new Error("ID cannot be 0");
            error.status = 400;
            next(error);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

updatePost = (req, res, next) => {   // UPDATE POST
    let query;
    let val = [];
    if (parseInt(req.params.id) !== 0) {
        if (req.body.text) {
            query = "UPDATE posts SET Text = ? WHERE Id = ?";
            val = [req.body.text, req.params.id];
        };
        if (req.body.likes) {
            query = "UPDATE posts SET Likes = ? WHERE Id = ?";
            val = [req.body.likes, req.params.id];
        };
        if (req.body.createdOn) {
            query = "UPDATE posts SET CreatedOn = ? WHERE Id = ?";
            val = [req.body.createdOn, req.params.id];
        };

        conn.query(query, val, (error, results, fields) => {
            if (error) throw error
        });

        res.status(200).send("Post Updated!");
    } else {
        var error = new Error("ID Cannot be 0!");
        error.status = 422;
        next(error);
    };
}

module.exports = { getAllPosts, createPost, deletePost, updatePost };

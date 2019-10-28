const conn = require("../../database");


getAllPostsQuery = () => {
    let query = "SELECT * FROM posts";
    return new Promise((resolve, reject) => {
        conn.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
};


createNewPostQuery = (body) => {
    const query = "INSERT INTO posts (Text , Likes, CreatedOn, UserId) VALUES(?,?,NOW(),?)";
    return new Promise((resolve, reject) => {
        conn.query(query, [body.text, body.likes, body.userId], (error, results, fields) => {
            if (error) {
                reject(error)
            } else {
                resolve();
            };
        });
    });
};

module.exports = {getAllPostsQuery , createNewPostQuery};
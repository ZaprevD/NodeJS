const conn = require("../../database");


getAllPostsQuery = (userId) => {
    let query = "SELECT * FROM posts JOIN user ON user.Id = posts.UserId WHERE UserId = ?";
    return new Promise((resolve, reject) => {
        conn.query(query, [userId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            };
        });
    });
};

getSpecificPostQuery = (paramId) => {
    const query  = "SELECT * FROM posts WHERE ID = ?";
    return new Promise((resolve,reject) => {
        conn.query(query, [paramId] , (error, results, fields) => {
            if(error){
                reject(error);
            }else{
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

deletePostQuery = (paramId) => {
    let query = "DELETE FROM posts WHERE Id = ?";
    return new Promise((resolve,reject) => {
        conn.query(query , [paramId] , (error, results, fields) => {
            if(error){
                reject(error);
            }else{
                resolve();
            };
        }); 
    });
};

updatePostQuery = (body , paramId) => {
    var query = "UPDATE posts SET Text = ? , Likes = ? WHERE Id = ?";
    return new Promise((resolve,reject) => {
        conn.query(query, [body.text, body.likes, paramId], (error, results, fields) => {
            if(error){
                reject(error);
            }else{
                resolve();
            };
        });
    });
};


module.exports = {getAllPostsQuery, createNewPostQuery, deletePostQuery, updatePostQuery, getSpecificPostQuery};
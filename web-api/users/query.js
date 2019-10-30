const conn = require("../database");

getAllUsersQuery = () => {
    let query = "SELECT * FROM user";
    return new Promise((resolve, reject) => {
        conn.query(query , (error, results, fields) => {
            if(error){
                reject(error);
            }else{
                resolve(results);
            };
        });
    });
};

getUserByIdQuery = (userId) => {
    let query = "SELECT * FROM user WHERE Id = ?";
    return new Promise((resolve, reject) => {
        conn.query(query, [userId] , (error, results, fields) => {
            if(error){
                reject(error);
            }else{
                resolve(results);
            };
        });
    });
};

createUserQuery = (body) => {
    let query = "INSERT INTO user (Name, Surname, Email, Age, Is_Active) VALUES (?, ?, ?, ?, ?)";
    let newUser = [body.Name, body.Surname, body.Email, body.Age, body.Is_Active];
    return new Promise((resolve, reject) => {
        conn.query(query, newUser, (error, results, fields) => {
            if(error){
                reject(error);
            }else{
                resolve();
            };
        });
    });
};

updateUserQuery = (body, paramId) => {
    let query = "UPDATE user SET Name =?, Surname =?, Email =?, Age =?, Is_Active =? WHERE ID = ?";
    let updateData = [body.Name, body.Surname, body.Email, body.Age, body.Is_Active, paramId];
    return new Promise((resolve, reject) => {
        conn.query(query, updateData, (error, results, fields) => {
            if(error){
                reject(error);
            }else{
                resolve();
            };
        });
    });
};

deleteUserQuery = (userId) => {
    let query = "DELETE FROM user WHERE ID = ?";
    return new Promise((resolve, reject) => {
        conn.query(query, [userId] , (error, results, fields) =>{
            if(error){
                reject(error);
            }else{
                resolve();
            };
        });
    });
};

getActiveUsersQuery = () =>{
    let query = "SELECT * FROM user WHERE Is_Active = true";
    return new Promise((resolve, reject) => {
        conn.query(query , (error, results, fields) => {
            if(error){
                reject(error);
            }else{
                resolve(results);
            };
        });
    });
};

module.exports  = {getAllUsersQuery, getUserByIdQuery, createUserQuery, updateUserQuery, deleteUserQuery, getActiveUsersQuery};
const fs = require("fs");
const path = require("path");
const { getAllUsersQuery, getUserByIdQuery, createUserQuery, updateUserQuery, deleteUserQuery, getActiveUsersQuery } = require("./query");

getAllUsers = async (req, res) => {                    // GET ALL USERS
    try {
        let data = await getAllUsersQuery();
        res.status(200).send(data);
    } catch (error) {
        res.send(error);
    };
};

getUserById = async (req, res, next) => {              // GET USER BY ID
    try {
        let user = await getUserByIdQuery(req.params.id);
        res.status(200).send(user[0]);
    } catch (error) {
        res.send(error.message);
    };
};

createUser = async (req, res) => {               // CREATE USER
    try {
        await createUserQuery(req.body);
        res.status(200).send("User Added");
    } catch (error) {
        res.send(error);
    };
};

updateUser = async (req, res, next) => {           // UPDATE USER
    try {
        await updateUserQuery(req.body, req.params.id);
        res.status(200).send("User Updated!");
    } catch (error) {
        res.status(500).send(error.message)
    };
};

deleteUser = async (req, res, next) => {           // DELETE USER
    try {
        await deleteUserQuery(req.params.id);
        res.status(200).send("User Deleted!");
    } catch (error) {
        res.status(400).send(error.message);
    };
};

getActiveUsers = async (req, res, next) => {              // GET ACTIVE USERS
    try {
        let data = await getActiveUsersQuery();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error.message);
    };
};

module.exports = {
    getAllUsers, getUserById, createUser, updateUser, deleteUser, getActiveUsers
};


// partialUpdateUser = (req, res, next) => {               // PARTIAL UPDATE
//     let rawdata = fs.readFileSync(path.join(__dirname, "user.json"));
//     let clearData = JSON.parse(rawdata);
//     var input = req.body;
//     const found = clearData.some(member => member.id === parseInt(req.params.id));
//     if (found) {
//         clearData.forEach((current) => {
//             if (current.id === parseInt(req.params.id)) {
//                 current.age = input.age ? input.age : current.age;
//                 current.email = input.email ? input.email : current.email;
//                 current.isActive = input.isActive !== undefined ? input.isActive : current.isActive;
//             };
//         });
//         res.status(200).send("Updated!");
//     } else {
//         var error = new Error(`User not found`);
//         error.status = 404;
//         next(error);
//     }
//     fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(clearData));
// };
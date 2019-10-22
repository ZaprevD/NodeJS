const fs = require("fs");
const path = require("path");

getAllUsers = (req, res) => {                    // GET ALL USERS
    try {
        let rawdata = fs.readFileSync(path.join(__dirname, "user.json"));
        let final = JSON.parse(rawdata);
        res.send(final);
    } catch (error) {
        res.send(error);
    }
};

getUserById =  (req, res, next) => {              // GET USER BY ID
    try {
        let rawdata = fs.readFileSync(path.join(__dirname, "user.json"));
        let clearData = JSON.parse(rawdata);
        const found = clearData.some(element => element.id === parseInt(req.params.id));
        if (found) {
            let result = clearData.filter((current) => current.id === parseInt(req.params.id));
            res.status(200).send(result);
        }else{
            var error = new Error("User does not exist");
            error.status = 400;
            next(error);
        }
    } catch (error) {
        res.send(error);
    }
};

createUser = (req, res) => {               // CREATE USER
    try {
        let rawdata = fs.readFileSync(path.join(__dirname, "user.json"));
        let clearData = JSON.parse(rawdata);
        clearData.push(req.body);
        fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(clearData));
        res.send("User added");
    } catch (error) {
        res.send(error);
    }
};


updateUser = (req, res, next) => {           // UPDATE USER
    let rawdata = fs.readFileSync(path.join(__dirname, "user.json"));
    let clearData = JSON.parse(rawdata);
    const found = clearData.some(element => element.id === parseInt(req.params.id));
    if (found) {
        clearData.forEach((current) => {
            if (current.id == parseInt(req.params.id)) {
                current.name = req.body.name;
                current.surname = req.body.surname;
                current.email = req.body.email;
                current.age = req.body.age;
                current.isActive = req.body.isActive;
            }
        });
        res.status(201).send("USER UPDATED");
    } else {    
        var error = new Error("User not found");
        error.status = 404;
        next(error);
    };
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(clearData));
};

partialUpdateUser =  (req, res, next) => {               // PARTIAL UPDATE
    let rawdata = fs.readFileSync(path.join(__dirname, "user.json"));
    let clearData = JSON.parse(rawdata);
    var input = req.body;
    const found = clearData.some(member => member.id === parseInt(req.params.id));
    if (found) {
        clearData.forEach((current) => {
            if (current.id === parseInt(req.params.id)) {
                current.age = input.age ? input.age : current.age;
                current.email = input.email ? input.email : current.email;
                current.isActive = input.isActive !== undefined ? input.isActive : current.isActive;
            };
        });
        res.status(200).send("Updated!");
    } else {
        var error = new Error(`User not found`);
        error.status = 404;
        next(error);
    }
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(clearData));
};

deleteUser =  (req, res, next) => {           // DELETE USER
    let rawdata = fs.readFileSync(path.join(__dirname, "user.json"));
    let clearData = JSON.parse(rawdata);
    const found = clearData.some(element => element.id === parseInt(req.params.id));
    if (found) {
        clearData.forEach((current) => {
            if (current.id === parseInt(req.params.id)) {
                clearData.splice(clearData.indexOf(current), 1);
            }
        });
        res.status(200).send("USER DELETED");
    } else {
        var error = new Error(`User with id: ${req.params.id} does not exist`);
        error.status = 401;
        next(error);
    }
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(clearData));
};


getActiveUsers = (req, res, next) => {              // GET ACTIVE USERS
    let rawdata = fs.readFileSync(path.join(__dirname, "user.json"));
    let clearData = JSON.parse(rawdata);
    const found = clearData.some(element => element.isActive);
    if (found) {
        let activeUsers = clearData.filter((current) => {
            return current.isActive;
        });
        res.status(200).send(activeUsers);
    } else {
        var error = new Error("no active user found");
        error.status = 404;
        next(error);
    }
};



module.exports = {
    getAllUsers, getUserById, createUser, updateUser, partialUpdateUser, deleteUser,getActiveUsers
}
var express = require('express');
var bodyParser = require('body-parser');

const app = express();
require("dotenv/config");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// app.get('/users', (req, res) => {
//     res.send(req.params);
// });
// app.get('/users/:id', (req, res) => {
//     res.send(req.params.id);
// });

// app.post('/users/', (req, res) => {
//     res.status(201).send(req.body);
// });
// app.put('/users/:number', (req, res) => {
//     res.send(`Napravivte put vrednosta e ${req.params.number}`);
// });

// app.delete('/users/:class', (req, res) => {
//     res.send(`Napravivte DELETE vrednosta e ${req.params.class}`);
// });

// app.patch('/users/:num', (req, res) => {
//     res.send(`Napravivte PATCH vrednosta e ${req.params.num}`);
// });

let data = [
    {
        user: "user1",
        id: "1"
    },
    {
        user: "user2",
        id: "2"
    },
    {
        user: "user3",
        id: "3"
    }
];

app.get("/write", (req, res) => {                // WRITE TO FILE  
    try {
        fs.writeFileSync("web-api/data.json", JSON.stringify(data));
        res.send("Complete!");
    } catch (error) {
        res.send(error)
    }
});

app.get("/read", (req, res) => {                  // READ FROM FILE
    try {
        let rawdata = fs.readFileSync("web-api/data.json");
        let jsonData = JSON.parse(rawdata);
        res.send(jsonData);
    } catch (error) {
        res.send(error);
    }
});

app.get("/users", (req, res) => {                    // GET ALL USERS
    try {
        let rawdata = fs.readFileSync("web-api/user.json");
        let final = JSON.parse(rawdata);
        res.send(final);
    } catch (error) {
        res.send(error)
    }
})

app.get("/users/:id", (req, res) => {              // GET USER BY ID
    try {
        let rawdata = fs.readFileSync("web-api/user.json");
        let clearData = JSON.parse(rawdata);
        let result = clearData.filter((current) => current.id === parseInt(req.params.id));
        res.send(result);
    } catch (error) {
        res.send(error);
    }
})

app.post("/users", (req, res) => {               // CREATE USER
    try {
        let rawdata = fs.readFileSync("web-api/user.json");
        let clearData = JSON.parse(rawdata);
        clearData.push(req.body);
        fs.writeFileSync("web-api/user.json", JSON.stringify(clearData));
        res.send("User added");
    } catch (error) {
        res.send(error)
    }
})


app.put("/users/:id", (req, res) => {           // UPDATE USER
    let rawdata = fs.readFileSync("web-api/user.json");
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
        res.status(402).send("User not found");
    };
    fs.writeFileSync("web-api/user.json", JSON.stringify(clearData));
});

app.patch("/users/:id", (req, res) => {               // PARTIAL UPDATE
    let rawdata = fs.readFileSync("web-api/user.json");
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
        res.status(400).send("User not found");
    }
    fs.writeFileSync("web-api/user.json", JSON.stringify(clearData));
});


app.delete("/users/:id", (req, res) => {           // DELETE USER
    let rawdata = fs.readFileSync("web-api/user.json");
    let clearData = JSON.parse(rawdata);
    const found = clearData.some(element => element.id === parseInt(req.params.id));
    if (found) {
        clearData.forEach((current) => {
            if (current.id === parseInt(req.params.id)) {
                clearData.splice(clearData.indexOf(current), 1);
                res.status(200).send("USER DELETED");
            }
        });
    } else {
        res.status(400).send("User not found");
    }
    fs.writeFileSync("web-api/user.json", JSON.stringify(clearData));
});

app.get("/active", (req, res) => {              // GET ACTIVE USERS
        let rawdata = fs.readFileSync("web-api/user.json");
        let clearData = JSON.parse(rawdata);
        const found = clearData.some(element => element.isActive);
        if(found){
        let activeUsers = clearData.filter((current) => {
            return current.isActive;
        })
        res.status(200).send(activeUsers)
    }else{
        res.status(400).send("no active user found");
    }
});

var port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`API is listenig on port ${port}!`);
});



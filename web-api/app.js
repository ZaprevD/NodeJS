var express = require('express');
require('dotenv/config');
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



var port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`API is listenig on port ${port}!`);
});


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
    let rawdata = fs.readFileSync("web-api/data.json");
    let jsonData = JSON.parse(rawdata);
    try {
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

app.get("/users/:name", (req, res) => {              // GET USER BY NAME
    try {
        let rawdata = fs.readFileSync("web-api/user.json");
        let clearData = JSON.parse(rawdata);
        let result = clearData.filter((current) => current.name.toLowerCase() === req.params.name.toLowerCase());
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

 
app.put("/users/:name", (req, res) => {           // UPDATE USER
    try {
        let rawdata = fs.readFileSync("web-api/user.json");
        let clearData = JSON.parse(rawdata);
        for (var i = 0; i < clearData.length; i++) {
            if (clearData[i].name.toLowerCase() === req.params.name.toLowerCase()) {
                clearData[i] = req.body;
                fs.writeFileSync("web-api/user.json", JSON.stringify(clearData));
                res.send("USER UPDATED");
                return;
            }
        }
        res.send("User not found");
    } catch (error) {
        res.send(error);
    }

});

app.patch("/users/:name", (req, res) => {               // PARTIAL UPDATE
    try {
        let rawdata = fs.readFileSync("web-api/user.json");
        let clearData = JSON.parse(rawdata);
        clearData.forEach((current) => {
            if (current.name.toLowerCase() === req.params.name.toLowerCase()) {
                current.age = req.body.age;
                current.email = req.body.email;
                current.isActive = req.body.isActive;
                fs.writeFileSync("web-api/user.json", JSON.stringify(clearData));
                res.send("Updated!");
                return;
            }
        })
        res.send("User not found");
    } catch (error) {
        res.send(error);
    }
});


app.delete("/users/:name", (req, res) => {           // DELETE USER
    try {
        let rawdata = fs.readFileSync("web-api/user.json");
        let clearData = JSON.parse(rawdata);
        clearData.forEach((current) => {
            if (current.name.toLowerCase() === req.params.name.toLowerCase()) {
                clearData.splice(clearData.indexOf(current), 1);
                fs.writeFileSync("web-api/user.json", JSON.stringify(clearData));
                res.send("USER DELETED");
                return;
            }
        })
        res.send("User not found");
    } catch (error) {
        res.send(error)
    }
})

app.get("/active", (req, res) => {              // GET ACTIVE USERS
    try {
        let rawdata = fs.readFileSync("web-api/user.json");
        let clearData = JSON.parse(rawdata);
        let activeUsers = clearData.filter((current) => {
            return current.isActive;
        })
        res.send(activeUsers)
    } catch (error) {
        res.send(error)
    }
})



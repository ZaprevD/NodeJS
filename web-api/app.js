var express = require('express');
var bodyParser = require('body-parser');
const middlewares = require("./middlewares/common");
const app = express();
let users = require("./users/routes");
require("dotenv/config");


app.use(middlewares.logger);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/users",users);

app.use(middlewares.errorHandler);

app.use(middlewares.wrongRoute);

var port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`API is listenig on port ${port}!`);
});




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

// let data = [
//     {
//         user: "user1",
//         id: "1"
//     },
//     {
//         user: "user2",
//         id: "2"
//     },
//     {
//         user: "user3",
//         id: "3"
//     }
// ];

// app.get("/write", (req, res) => {                // WRITE TO FILE  
//     try {
//         fs.writeFileSync("web-api/data.json", JSON.stringify(data));
//         res.send("Complete!");
//     } catch (error) {
//         res.send(error)
//     }
// });

// app.get("/read", (req, res) => {                  // READ FROM FILE
//     try {
//         let rawdata = fs.readFileSync("web-api/data.json");
//         let jsonData = JSON.parse(rawdata);
//         res.send(jsonData);
//     } catch (error) {
//         res.send(error);
//     }
// });
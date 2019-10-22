var express = require("express");
const routes = express.Router();
const actions = require("./actions");
const {emailValidator} = require("../helper");


routes.get("/", actions.getAllUsers);

routes.get("/:id",actions.getUserById);

routes.post("/", emailValidator, actions.createUser);

routes.put("/:id", actions.updateUser);

routes.patch("/:id", actions.partialUpdateUser);

routes.delete("/:id", actions.deleteUser);

routes.get("/active", actions.getActiveUsers);

module.exports = routes
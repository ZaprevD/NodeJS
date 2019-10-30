var express = require("express");
var router = express.Router();
var action = require("./action");

router.get("/:id/post" , action.getAllPosts);
router.get("/post/:id" , action.getSpecificPost);
router.post("/post" , action.createPost);
router.delete("/post/:id", action.deletePost);
router.put("/post/:id" , action.updatePost);

module.exports  = router;
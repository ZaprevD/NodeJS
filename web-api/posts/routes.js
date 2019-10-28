var express = require("express");
var router = express.Router();
var action = require("./action");

router.get("/" , action.getAllPosts);
router.post("/" , action.createPost);
router.delete("/:id", action.deletePost);
router.put("/:id" , action.updatePost);

module.exports  = router;
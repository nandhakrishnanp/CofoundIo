
const { getMessagesByProjectId } = require("../Controllers/messageController");
const auth = require("../Middleware/auth");

const router = require("express").Router();


router.get("/:projectId",auth, getMessagesByProjectId);



module.exports = router;
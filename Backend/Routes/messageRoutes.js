
const { getMessagesByProjectId, GenerateSummaryByChatData } = require("../Controllers/messageController");
const auth = require("../Middleware/auth");

const router = require("express").Router();


router.get("/:projectId",auth, getMessagesByProjectId);
router.post("/summary",auth, GenerateSummaryByChatData);



module.exports = router;
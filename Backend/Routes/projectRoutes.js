const express = require("express");
const projectModel = require("../Model/projectModel");
const { getAllTeams, newProject, getMyProject, addJoinRequest, getMyNotification, acceptJoinRequest, rejectJoinRequest } = require("../Controllers/projectController");
const auth = require("../Middleware/auth");
const router = express.Router()

router.post("/createProject",auth, newProject)
router.get("/discover" , getAllTeams)
router.post("/joinrequest",auth,addJoinRequest)
router.get("/myProject",auth,  getMyProject)
router.get("/getNotification",auth, getMyNotification)
router.post("/acceptJoinRequest",auth,acceptJoinRequest)
router.post("/rejectJoinRequest",auth,rejectJoinRequest)
module.exports =router
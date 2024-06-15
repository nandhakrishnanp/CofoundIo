const notificationModel = require("../Model/notificationModel");
const projectModel = require("../Model/projectModel");
const userModel = require("../Model/userModel");

const getAllTeams = async (req, res) => {
  const projects = await projectModel.find().sort({ createdOn: -1 }).populate('createdby', 'name profileUrl');
  res.json({ projects });
};

const newProject = async (req, res) => {
  try {
    const { projectId, tittle, theme, discription } = req.body;

    console.log(projectId, tittle, theme, discription);
    if (!projectId || !tittle || !discription || !theme) {
      return res.json({ msg: "All fields are required" }).status(400);
    }
    const userId = req.user.userId;

    const newProject = await new projectModel({
      projectId,
      tittle,
      theme,
      discription,
      createdby: userId,
      members: [userId],
    });
    await newProject.save();
    res.json({ msg: "New Project created Successfully" });
  } catch (error) {
    return res.json({ msg: error.message });
  }
};



const editProject = async (req, res) => {
  try {
    const { projectId, tittle, discription } = req.body;
    const userId = req.user.userId;

    const project = await projectModel.findOne({
      projectId,
      createdby: userId,
    });

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    project.tittle = tittle || project.tittle;
    project.discription = discription || project.discription;

    await project.save();

    res.json({ msg: "Project updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.body;
    const userId = req.user.userId;

    const project = await projectModel.findOneAndDelete({
      projectId,
      createdby: userId,
    });

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res.json({ msg: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getMyProject = async (req, res) => {
  const userId = req.user.userId;
  const projects = await projectModel.find({ members: [userId] });
  res.json({ projects });
};

// to add join req send { projectId}
const addJoinRequest = async (req, res) => {
  try {
    const { projectId } = req.body;
    const userId = req.user.userId;
    const userDetail = await userModel.findOne({ _id: userId });
    const project = await projectModel.findOne({ projectId });
    console.log(projectId);
    if (!project) {
      return res.json({ msg: "Project not found" }).status(404);
    }


    if (project.members.includes(userId) || project.createdby == userId) {
      return res.json({ msg: "You are already a member" }).status(400);
    }
    const isRequest = await notificationModel.findOne({ reqUserId: userId });
   
    if(isRequest && isRequest.projectId == projectId){
      return res.json({ msg: "You Already Requested" }).status(400);
    }
    const newNotification = await new notificationModel({
      userId: project.createdby,
      projectId: project.projectId,
      reqUserId: userId,
      content: `${userDetail.name} wants to join Your team 
      ${project.tittle}`,
      notificatioType: "USERJOINREQUEST",
    });

    await newNotification.save();

    res.json({ msg: "Request sent successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error);
  }
};

const getMyNotification = async (req,res)=>{
  const userId = req.user.userId;
  const notification = await notificationModel.find({userId:userId})
  if(notification.length>0){
      return res.json({notification})
  }
  else{
    return res.json({msg:"No Notifications "})
  }
}
// notification need to shortout the currect notificaton 

const acceptJoinRequest = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { nId } = req.body;

    const notification = await notificationModel.findOne({ nId: nId });

    if (!notification) {
      return res.json({ msg: "Notification not found" }).status(403);
    }

    const project = await projectModel.findOne({ projectId: notification.projectId });

    if (!project) {
      return res.json({ msg: "Project not found" }).status(403);
    }

    if (project.createdby != userId) {
      return res.json({ msg: "You are not the owner of the project" }).status(403);
    }

    project.members.push(notification.reqUserId);
    await project.save();

    await notificationModel.deleteOne({ nId: nId });

    return res.json({ msg: "Added to the Team" });
  } catch (error) {
    return res.json({ msg: "Server Error", error: error.message }).status(500);
  }
};


const rejectJoinRequest = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { nId } = req.body;
console.log(nId);
    const notification = await notificationModel.findOne({ nId: nId });

    if (!notification) {
      return res.json({ msg: "Notification not found" }).status(403);
    }

    

    await notificationModel.deleteOne({ nId: nId });

    return res.json({ msg: "Rejected" });
  } catch (error) {
    return res.json({ msg: "Server Error", error: error.message }).status(500);
  }
}



module.exports = {
  getAllTeams,
  newProject,
  editProject,
  getMyProject,
  deleteProject,
  addJoinRequest,
  getMyNotification,
  acceptJoinRequest,
  rejectJoinRequest
};

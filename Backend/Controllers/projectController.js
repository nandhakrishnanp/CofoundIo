const notificationModel = require("../Model/notificationModel");
const projectModel = require("../Model/projectModel");
const userModel = require("../Model/userModel");

const getAllTeams = async (req, res) => {
  const projects = await projectModel.find().sort({ createdOn: -1 });
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
      return res.status(404).json({ msg: "Project not found" });
    }

    if (project.members.includes(userId)) {
      return res.status(400).json({ msg: "You are already a member" });
    }
    const isRequest = await notificationModel.find({ reqUserId: userId });

    if(isRequest.length>0){
      return res.status(400).json({ msg: "You Already Requested" });
    }
    const newNotification = await new notificationModel({
      userId: project.createdby,
      projectId: project.projectId,
      reqUserId: userId,
      content: `${userDetail.name} wants to join Your team`,
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

const acceptJoinRequest = async(req,res)=>{
  try {
    const userId = req.user.userId;
    const {nId} = req.body;
    const notification = await notificationModel.findOne({nId:nId})

    const project = await projectModel.findOne({projectId: notification.projectId });
  
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
  
    project.members.push(notification.reqUserId)
  
    await project.save();
    
    const deleteNotification = await notificationModel.deleteOne({projectId: notification.projectId })
    return res.json({msg:"Added To the Team"})
  } catch (error) {
    return res.json({msg:error.msg})
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
  acceptJoinRequest
};

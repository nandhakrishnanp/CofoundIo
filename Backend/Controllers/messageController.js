 const { GenerateSummary } = require("../Gemini/gemini.js");
const db = require("../fireBase/dbconfig.js")



 const getMessagesByProjectId = async (req, res) => {
    try {
        console.log("project");
        const projectId = req.params.projectId;
        const messages = await new Promise((resolve, reject) => {
            let msg = []; // Initialize msg outside the forEach loop
            db.ref(`${projectId}`).once('value', (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    msg.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                resolve(msg);
            }, (error) => {
                reject(error); 
            });
        });
        const messageResponse={
            projectId:projectId,
            messages:messages
        }
        res.status(200).json(messageResponse); 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: error.message }); 
    }
};

const GenerateSummaryByChatData = async (req, res) => {
    try {
        const {chatData} = req.body;
        console.log("chatData",chatData);
        const summary = await GenerateSummary(chatData);
        res.json({ summary }).status(200);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: error.message });
    }}

    module.exports ={ getMessagesByProjectId ,GenerateSummaryByChatData}
 const db = require("../fireBase/dbconfig.js")



 const getMessagesByProjectId = async (req, res) => {
        try {
            const projectId = req.params.projectId;
            const messages = [];
            db.ref('/messages').orderByChild('room').equalTo(projectId).on('value', (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    messages.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                res.json(messages);
            });
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }

    module.exports ={ getMessagesByProjectId}
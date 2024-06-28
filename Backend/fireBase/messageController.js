const db = require("./dbconfig.js");

const StoreMessage = async (projectId, messageData) => {
  try {
    console.log(projectId);
    let UserId = messageData.UserId;

    const newMessageId = db.ref(`${projectId}`).child(UserId).push().key;

    // Create the message object
    const newMessage = {
      ...messageData,
      date: Date.now(),
    };

    //setting the message in dB
    await db.ref(`${projectId}`).child(newMessageId).set(newMessage);
    console.log("new message stored in the database");
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

module.exports = StoreMessage;

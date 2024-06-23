 const db = require("./dbconfig.js")


 const StoreMessage= async (messageData)=>{
    try {
         let roomid = messageData.room;
        const newMessageId = db.ref('/messages').child(roomid).push().key;

    // Create the message object 
    const newMessage = {
      ...messageData, // Spread message data from request
      date: Date.now()
    };

   //setting the message in the database
    await db.ref('/messages').child(newMessageId).set(newMessage);
    console.log("new message stored in the database");
    } catch (error) {
        console.log(error.message);
        return error;
    }
 }

 
module.exports = StoreMessage;
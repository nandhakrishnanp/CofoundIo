import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { allTeams } from "../../Store/projectSlice";

import {
  UserData,
  fetchUserDataByID,
  profileUser,
} from "../../Store/userSlice";
import { useRef } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaGear, FaPeopleGroup } from "react-icons/fa6";
import socket from "../../socket.js";
import { allChatMessages } from "../../Store/messageSlice.js";

function ChatNav(props) {
  const [teamName, setTeamName] = useState("Team Name");
  const [teamMembers, setTeamMembers] = useState(["User1", "User2", "User3"]);

  return (
    <div className="flex fixed w-full justify-start   items-center  bg-primary text-white">
      <div className=" flex items-center gap-10 w-3/4">
        <h1 className="text-2xl p-1  font-bold">{props.teamName}</h1>
        <FaPeopleGroup className="  text-2xl" />
        <FaGear className=" text-2xl" />
      </div>
    </div>
  );
}

{
  // // Import the required dependencies
  //
  // // Define the server URL
}
function Chat({ team }) {
  const ChatData = useSelector(allChatMessages)
  const [message, setMessage] = useState("");
  const userDetails = useSelector(UserData);

  const containerRef = useRef(null);

  const userName = userDetails.userDetails.userName;
  const [messages, setMessages] = useState([
   
  ]);
  useEffect(()=>{
     if(ChatData){
       const fillteredChat = ChatData.filter((chat)=>chat.room==team.projectId)
       if(fillteredChat){
          fillteredChat.map((chat)=>{
           setMessages([...messages,chat.message])
          
          }
          )
       }
     }
  },[ChatData])
  // useEffect(() => {
  //   containerRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  function handleInputChange(event) {
    setMessage(event.target.value);
  }

  // Send a message to the team chat room
  useEffect(() => {
    socket.emit("joinroom", team.projectId);
  }, [team]);

  socket.on("message", (message) => {
  
    setMessages([...messages, { sender: message.sender  , text: message.text}]);
  });

  //     // Handle incoming messages

  function handleSendMessage() {
    socket.emit("sendmessage", {room: team.projectId , userId:userDetails.userDetails._id,
       message:{ sender:userName , text:message} });

    setMessages([...messages, { sender: userName, text: message }]);

    setMessage("");
  }

  return (
    <div className=" max-h-screen    overflow-y-scroll   w-full">
      <ChatNav teamName={team.tittle} />
      <div className=" z-6 ">
        <div className=" mt-[44px] min-h-screen pb-8 ">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex z-2 m-3 ${
                message.sender === userName ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender !== userName && (
                // Displays the name of the messager

                <img
                  src={
                    "data:image/webp;base64,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"
                  }
                  alt={`Profile Picture of ${message.sender}`}
                  className=" object-fill w-8 h-8 rounded-full"
                />
              )}
              <div
                className={`p-2 rounded-xl min-w-[30px] mx-2 ${
                  message.sender === userName
                    ? "bg-primary text-white"
                    : " bg-white"
                }`}
              >
                {message.sender !== userName && (
                  <p className="text-sm font-poppins">{message.sender}</p>
                )}
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div ref={containerRef} />
          <form
            className="flex  bottom-2 items-center  justify-center fixed gap-3 m-2 w-[70%] "
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="w-3/4 border rounded-xl border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={message}
              onChange={handleInputChange}
              onSubmit={handleSendMessage}
              placeholder="Type your message..."
            />
            <button type="submit" className="w-1/5" onClick={handleSendMessage}>
              <FaArrowCircleRight className=" text-3xl" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;

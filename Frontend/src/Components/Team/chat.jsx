import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { allTeams } from "../../Store/projectSlice";
import {format} from "date-fns";
import {
  UserData,
  fetchUserDataByID,
  profileUser,
} from "../../Store/userSlice";
import { useRef } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaGear, FaPeopleGroup } from "react-icons/fa6";
import socket from "../../socket.js";
import {
  addMessageToStore,
  allChatMessages,
} from "../../Store/messageSlice.js";

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
  const dispatch = useDispatch();
  const ChatData = useSelector(allChatMessages);
  const [message, setMessage] = useState("");
  const userDetails = useSelector(UserData);

  const containerRef = useRef(null);
  const UserId = userDetails.userDetails._id;
  const userName = userDetails.userDetails.userName;
   const Members = team.members;
  const [messages, setMessages] = useState([]);
  const nav = useNavigate()
  const CurrentProjectId= team.projectId;
  useEffect(() => {
   setMessages(ChatData[CurrentProjectId]);
   console.log(ChatData[CurrentProjectId],"current chat");
  }, [ChatData]);
  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [team.projectId]);

  function handleInputChange(event) {
    setMessage(event.target.value);
  }

  // Send a message to the team chat room


  useEffect(() => {
    socket.emit("joinroom", team.projectId);
  }, [team]);

  const handleOnMessage = useCallback((data) => {
    dispatch(
      addMessageToStore({
        projectId: team.projectId,
        message: data,
      })
    );
  }, [dispatch, team.projectId]);

  useEffect(() => {
    socket.on("message", handleOnMessage);

    return () => {
      socket.off("message", handleOnMessage);
    };
  }, [socket]);
 


  function handleSendMessage() {
    socket.emit("sendmessage", {
      projectId: team.projectId,
      userId: userDetails.userDetails._id,
      message: { UserId: UserId, content: message, date: Date.now() },
    });

    dispatch(
      addMessageToStore({
        projectId: team.projectId,

        message: { UserId: UserId, content: message, date: Date.now() },
      })
    );

    setMessage("");
  }

  return (
    <div className=" max-h-screen    overflow-y-scroll   w-full">
      <ChatNav teamName={team.tittle} />
      <div className=" z-10  mt-28 mb-11 flex flex-col ">
       
        {
          messages.length>0?messages.map((message) => {
            
             const date = message.date;
             
             let currentUser = Members.find((member) => member._id === message.UserId);
            
              if(!currentUser){
                currentUser=team.createdby
              }
             const formattedDate = format(date, 'yy-MM-dd hh:mm a');
            return (
             <div className=" flex mx-2 items-center ">
             <div className={`  flex w-full items-center   ${ message.UserId==UserId ? "  justify-end ":"  justify-start"} `}>
               <div>
                <img src={currentUser.profileUrl} className="w-10 object-cover h-10 rounded-full" />
               </div>
          
             <div className={` ${ message.UserId==UserId ?"bg-primary text-white": "bg-white"} rounded-md my-2 mx-2 p-[5px] px-2`}>
             
             <p  onClick={()=>nav(`/profile/${currentUser._id}`)} className={` cursor-pointer hover:scale-105 font-bold ${ message.UserId==UserId ? "text-white":"text-primary"}`}>{currentUser.name}</p>
            
             <p className=" font-semibold p-1">{ message.content}</p>
             <p className={`${ message.UserId==UserId ?" text-white/20": " text-gray-500"}py-1 text-[10px] font-monsherrat `}>{ formattedDate}</p>
             
             </div>
             </div>
             </div>
           
          )}) : <div className="  grid place-items-center">
               <h1 className=" text-2xl  font-monsherrat font-bold text-primary">Start Innovating.. Start Conversation</h1>
          </div>
        }
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

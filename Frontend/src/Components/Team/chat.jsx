import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { allTeams } from "../../Store/projectSlice";
import { format } from "date-fns";

import {
  UserData,
  fetchUserDataByID,
  profileUser,
} from "../../Store/userSlice";
import { useRef } from "react";
import { FaArrowCircleRight, FaTeamspeak } from "react-icons/fa";
import { FaGear, FaPeopleGroup } from "react-icons/fa6";
import socket from "../../socket.js";
import {
  FetchChatSummary,
  addMessageToStore,
  allChatMessages,
} from "../../Store/messageSlice.js";
import close from "../../assets/close.svg";
import { RiProfileFill } from "react-icons/ri";
import { GiSparkles } from "react-icons/gi";
import { LuSparkle } from "react-icons/lu";
import { IoSparkles } from "react-icons/io5";
import { toast } from "react-toastify";

function ChatNav({ teamTittle, teamMembers, createdby }) {
  const [openTeamMembers, setOpenTeamMembers] = useState(false);

  return (
    <div className="flex fixed w-full justify-start   items-center  bg-primary text-white">
      <div className=" flex items-center justify-end gap-10 w-3/4">
        <h1 className="text-2xl  px-4 py-1  font-semibold">{teamTittle}</h1>

        <RiProfileFill
          onClick={() => setOpenTeamMembers(!openTeamMembers)}
          className="  flex-1 text-xl ml-auto px-3 cursor-pointer   rounded-full hover:scale-105 transition-all duration-150"
        />
      </div>
      {openTeamMembers && (
        <div className="absolute overflow-hidden overflow-y-scroll top-10 left-28 flex  flex-col    w-full  z-50  ">
          <div
            data-aos="zoom-in"
            className="  bg-white  rounded-xl  w-[500px] h-[70vh]"
          >
            <div className=" flex items-center  justify-center">
              <h1 className=" font-bold text-2xl px-4 text-primary ">
                Team Members.
              </h1>
              <img
                onClick={() => setOpenTeamMembers(!openTeamMembers)}
                src={close}
                alt="close-button"
                className="hover:cursor-pointer   w-6"
              />
            </div>
            <div className=" flex flex-col items-start px-2 gap-2">
              <div className=" flex items-center cursor-pointer gap-2">
                <img
                  src={createdby.profileUrl}
                  className="w-10 object-cover h-10 rounded-full"
                />
                <p className=" text-black font-monsherrat">{createdby.name}</p>
                <p className=" flex-1 text-emerald-800 text-xs bg-green-200 px-1 rounded-lg">
                  Admin
                </p>
              </div>
              {teamMembers &&
                teamMembers.map((member) => (
                  <div className=" flex items-center hover:cursor-pointer gap-2">
                    <img
                      src={member.profileUrl}
                      className="w-10 object-cover h-10 rounded-full"
                    />
                    <Link to={`/profile/${member._id}`}>
                      <p className=" text-black font-monsherrat">
                        {member.name}
                      </p>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
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
  const nav = useNavigate();
  const CurrentProjectId = team.projectId;
  useEffect(() => {
    setMessages(ChatData[CurrentProjectId]);
    console.log(ChatData[CurrentProjectId], "current chat");
  }, [ChatData]);
  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [team.projectId]);

  function handleInputChange(event) {
    setMessage(event.target.value);
  }

  const botUser = {
    _id: "bot",
     UserId: "bot",
    name: "ChatBot",
    profileUrl: "data:image/png;base64,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",

  }

  // Send a message to the team chat room

  useEffect(() => {
    socket.emit("joinroom", team.projectId);
  }, [team]);

  const handleOnMessage = useCallback(
    (data) => {
      dispatch(
        addMessageToStore({
          projectId: team.projectId,
          message: data,
        })
      );
    },
    [dispatch, team.projectId]
  );

  useEffect(() => {
    socket.on("message", handleOnMessage);

    return () => {
      socket.off("message", handleOnMessage);
    };
  }, [socket]);

  const generateSummary = (projectId) => {
    if (messages) {
      const lastDayMessages = messages.filter(
        (message) => message.date > Date.now() - 86400000
      );
      if (lastDayMessages.length < 5) {
        toast.error("You need atleast 5 messages to generate a summary");
      } else {
        const chatData = lastDayMessages.map((message) => {
          return {
            role: "user",
            parts: [{ text: message.content }],
          };
        });
        console.log(chatData, "chatdata");
        dispatch(FetchChatSummary({ projectId, chatData }));
      }
    }
  };

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
      <ChatNav
        teamTittle={team.tittle}
        teamMembers={team.members}
        createdby={team.createdby}
      />
      <div className="  mt-28 mb-11 flex flex-col ">
        { messages && messages.length > 0 ? (
          messages.map((message) => {
            const date = message.date;

            let currentUser = Members.find(
              (member) => member._id === message.UserId
            );

            if (!currentUser && message.UserId === "bot") {
              currentUser = botUser;
            }
            else if(!currentUser){
              currentUser = team.createdby;
            }
            const formattedDate = format(date, "yy-MM-dd hh:mm a");
            return (
              <div className=" flex mx-2 items-center mb-8 ">
                <div
                  className={`  flex w-full items-center  ${
                    message.UserId == UserId
                      ? "  justify-end "
                      : "  justify-start"
                  } `}
                >
                  <div>
                    <img
                      src={currentUser.profileUrl}
                      className="w-10 object-cover h-10 rounded-full"
                    />
                  </div>

                  <div
                    className={`  max-w-[450px]  ${
                      message.UserId == UserId
                        ? "bg-primary text-white"
                        : "bg-white"
                    } rounded-md my-2 mx-2 p-[5px] px-2`}
                  >
                    <p
                      onClick={() => nav(`/profile/${currentUser._id}`)}
                      className={` text-xs cursor-pointer hover:shadow-xl font-bold ${
                        message.UserId == UserId ? "text-white" : "text-primary"
                      }`}
                    >
                      {currentUser.name}
                    </p>

                    <p className=" capitalize font-semibold p-1">
                      {message.content}
                    </p>
                    <p
                      className={`${
                        message.UserId == UserId
                          ? " text-white/20"
                          : " text-gray-500"
                      }py-1 text-xs font-monsherrat `}
                    >
                      {formattedDate}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="  grid place-items-center">
            <h1 className=" text-2xl  font-monsherrat font-bold text-primary">
              Start Innovating.. Start Conversation
            </h1>
          </div>
        )}
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
            {/* <LuSparkle/> */}
            <IoSparkles
              onClick={() => {
                if (messages) {
                  generateSummary(CurrentProjectId);
                }
              }}
              className=" text-2xl cursor-pointer hover:scale-105 "
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

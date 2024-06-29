import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MyTeams } from "../../Store/projectSlice";
import exploreIcon from "../../assets/explore.svg";

import Chat from "./chat";

import { FetchGroupChat, allChatMessages } from "../../Store/messageSlice.js";
import { fetchAllPostByUser } from "../../Store/postSlice.js";
import socket from "../../socket.js";

const Myteams = () => {
  const dispatch = useDispatch();
  let nav = useNavigate();
  const [currenTeam, setCurrenTeam] = useState(null);

  const MyAllTeams = useSelector(MyTeams);
  useEffect(() => {
    if (MyAllTeams.length == 0) {
      nav("/exploreTeams");
    } else {
      socket.connect();
      console.log(MyAllTeams, "hello");
    }
    return () => {
      socket.disconnect(); // Disconnect the socket connection globally
    };
  }, []);
  const handleTeamChange = (team) => {
    dispatch(FetchGroupChat(team.projectId))
    if (currenTeam) {
      socket.emit("leaveRoom", currenTeam.projectId);
    }
    setCurrenTeam(team);
  };
  return (
    <>
      <Navbar />

      <div className=" bg-Secondary w-full min-h-screen max-h-screen ">
        <div className=" flex  bg-violet-300 justify-center">
          <div className="max-md:mt-[50px]  bg-white min-h-screen max-h-screen  overflow-y-hidden    w-[30%] ">
            <div className=" flex justify-between  ">
              <h1 className=" font-bold text-2xl px-4   text-primary p-2">
                My Teams.
              </h1>
              <Link className=" m-3" to="/exploreTeams">
                <img
                  src={exploreIcon}
                  className="hover:scale-110 transition-all duration-100 w-7   cursor-pointer "
                  alt="Exploreicon"
                />
              </Link>
            </div>
            <div className="flex flex-col overflow-y-auto">
              {MyAllTeams.length > 0
                ? MyAllTeams.map((team) => (
                    <div
                      onClick={() => handleTeamChange(team)}
                      className={`p-4 ${
                        currenTeam && team.tittle === currenTeam.tittle
                          ? "bg-primary  "
                          : "hover:bg-primary/5"
                      }  transition-all duration-150 cursor-pointer   flex  gap-2  items-center  `}
                    >
                      <img
                        src={team.profileUrl}
                        className=" w-10 h-10 bg-slate-400 rounded-full"
                      />

                      <h1
                        className={`capitalize ${
                          currenTeam && team.tittle === currenTeam.tittle
                            ? "text-white"
                            : "text-dark-blue"
                        }     text-lg font-bold `}
                      >
                        {team.tittle}
                      </h1>
                    </div>
                  ))
                : null}
            </div>
          </div>

          <div className="flex-1 w-[70%]  justify-center">
            {currenTeam ? <Chat team={currenTeam} /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Myteams;

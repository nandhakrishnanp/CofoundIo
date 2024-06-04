import React, { useState } from "react";
import close from "../../assets/close.svg";
import { createTeam } from "../../Store/projectSlice";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

const Createteam = ({setOpen}) => {
  const dispatch = useDispatch();
  const [teamName, setTeamName] = useState("");
  const [teamDomain, setTeamDomain] = useState("");
  const [teamDescription, setTeamDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teamName ||!teamDomain ||!teamDescription) {
      return;
    }
    const team = {
      projectId: nanoid(6),
       tittle:teamName,theme:teamDomain , discription:teamDescription 
    }
     dispatch(createTeam( team));
  
    setTeamName("");
    setTeamDomain("");
    setTeamDescription("");
    setOpen(false);
  };
  const projectDomains = [
    { value: "web-development", label: "Web Development" },
    { value: "mobile-development", label: "Mobile Development" },
    { value: "data-science", label: "Data Science" },
    { value: "machine-learning", label: "Machine Learning" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "cloud-computing", label: "Cloud Computing" },
    { value: "blockchain", label: "Blockchain" },
    { value: "game-development", label: "Game Development" },
    { value: "iot", label: "Internet of Things (IoT)" },
    { value: "software-testing", label: "Software Testing" },
    { value: "devops", label: "DevOps" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="w-full   bg-white  my-3 rounded-lg flex flex-col justify-center items-center p-5">
      <div className="absolute  z-20   backdrop-blur-sm   flex items-center justify-center left-0 top-0  w-[100%]  h-[100vh] ">
        <div data-aos="zoom-in" className="  relative z-30 shadow-xl  bg-white max-lg:w-[90%] max-lg:h-3/5 overflow-x-hidden    w-1/2 h-1/2   rounded-lg">
        <img
              src={close}
              onClick={() => {
                setOpen(false);
               
              }}
              className="w-7 absolute top-4 transition-all duration-300
              hover:scale-105 right-3 cursor-pointer"
              alt=""
            />
          <h1 className="p-4 font-bold text-primary text-2xl">
            Create a Team In Seconds
          </h1>

          <div className=" flex flex-col">
            <input
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}  
              type="text"
              placeholder="Team Name"
              className=" ring-2  ml-4 h-10  focus:bg-purple-100/20 ring-primary w-[80%] border-0 my-1 p-4 focus:ring-2  placeholder:font-poppins   placeholder:text-dark-blue font-poppins  rounded-md  outline-none "
            />

            <select 
            value={teamDomain}
            onChange={(e) => {setTeamDomain(e.target.value)
          
            }}
              id="project-domain"
              className=" w-[80%] h-10 bg-primary rounded-lg  px-3 m-4 text-white py-2 "
              required
              name="project-domain"
            >
              {projectDomains.map((option) => (
                <option
                 key={option.value}
                  className=" font-poppins "
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
            <textarea
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
              type="text"
              placeholder="Team Discription"
              className=" ring-2  ml-4   border-box resize-none 
              py-2 focus:bg-purple-100/20 ring-primary w-[80%] border-0 my-1 px-4 focus:ring-2 
               h-[100px] 
              placeholder:font-poppins   placeholder:text-dark-blue font-poppins  rounded-md  outline-none "
            />

            <button onClick={(e)=> handleSubmit(e)} className="  bg-primary py-3 px-3 w-1/3 rounded-full m-4 text-white font-bold font-poppins transition-all duration-300
            hover:scale-105">Create Team</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createteam;

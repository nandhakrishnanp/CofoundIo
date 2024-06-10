import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addJoinRequest, allTeams, fetchAllTeam } from "../../Store/projectSlice";
import requestSvg from "../../assets/request.svg"
import addIcon from "../../assets/addproject.svg"
import Createteam from "./Createteam";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
 
const Teams = () => {
  const [open,setOpen] = useState(false)
  const dispatch = useDispatch();
  let nav = useNavigate()
  const DicoverTeam = useSelector(allTeams);
  useEffect(() => {
    dispatch(fetchAllTeam());
    console.log(DicoverTeam);
  }, []);

  const handleJoinRequest=(projectId)=>{
     dispatch(addJoinRequest(projectId))
  }
  return (
    <>
      <Navbar />
      {open? <Createteam setOpen={setOpen}/> :null}
      <div data-aos="fade-left" className=" flex flex-col items-center bg-Secondary">
      <div className=" max-md:mt-[50px]  md:max-w-[70%]">
        <div className="  bg-primary p-4  md:mx-20 md:p-9 m-2 rounded-lg flex flex-col items-center justify-center">
          <p className=" md:text-2xl text-center text-white  text-[16px] ">
            Discover the power of collaboration! Join or create teams to connect
            with like-minded individuals, share ideas, and work together on
            exciting projects
          </p>
          <div className=" flex justify-center  font-bold items-center gap-2">
            <button className=" bg-white px-2 transition-all duration-500  hover:scale-105  py-2 m-2 font-poppins rounded-xl">
              Join By Team ID
            </button>
            <button onClick={()=>{
              if(!open){
                setOpen(true)
              }
            }} className=" bg-white flex transition-all duration-500 px-2 hover:scale-105  hover:bg-slate-200 items-center justify-center  m-2 font-poppins rounded-xl">
               <img src={addIcon} className="  w-10" alt="" />  <span>Create a Team</span>
            </button>
            
          </div>
        </div>
        <h1  className=" font-bold text-2xl px-4 md:mx-20">Explore Teams.</h1>
        <div>
         { DicoverTeam  ? DicoverTeam.map((team)=>(
          <Link to={`/teams/${team.projectId}`}>
          <div data-aos="fade-left"   className="p-4 font-monsherrat cursor-pointer hover:shadow-xl  bg-white md:mx-20 md:p-9 m-2 rounded-lg">
           
            <h1 className=" capitalize text-primary text-xl font-bold">{team.tittle}</h1>
            <div className=" flex items-center  justify-between" >
               <p  className=" capitalize text-gray-600   pr-4 font-semibold pt-1">{team.discription}</p>
               <img onClick={()=> handleJoinRequest(team.projectId)} src={requestSvg} className=" w-10 rounded-full p-2 bg-primary hover:scale-105  " alt="requestIcon" />
            </div>

               <div onClick={()=>nav(`/profile/${team.createdby._id}`) } className="flex py-2 text-gray-500 gap-2 items-center ">
                               <p >Created by</p>
                   <img className=" w-8 h-8 object-cover rounded-full" src={team.createdby.profileUrl} alt="" />
               <p className=" hover:text-dark-blue">{team.createdby.name}</p>
               </div>
           
          </div>
          </Link>
         )):null}
        </div>
      </div>
      </div>
     
    </>
  );
};

export default Teams;

import React, { useEffect } from "react";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MyTeams } from "../../Store/projectSlice";
import exploreIcon from "../../assets/explore.svg";
const Myteams = () => {
  const dispatch = useDispatch();
  let nav = useNavigate();
  const MyAllTeams = useSelector(MyTeams);
  useEffect(() => {
    if (MyAllTeams.length == 0) {
      nav("/exploreTeams");
    }else{
      console.log(MyAllTeams,"hello");
    }
  }, []);

  return (
    <>
      <Navbar />

      <div className=" bg-Secondary w-full min-h-screen">
        <div className=" flex items-center  bg-violet-300 justify-center">
          <div className="max-md:mt-[50px] bg-white min-h-screen  min-w-[30%] md:max-w-[70%]">
            <div className=" flex justify-between  ">
              <h1 className=" font-bold text-2xl px-4   text-primary p-2">
                My Teams.
              </h1>
              <Link  className=" m-3"to="/exploreTeams">
                <img
                  src={exploreIcon}
                  className="hover:scale-110 transition-all duration-100 w-7   cursor-pointer "
                  alt="Exploreicon"
                />
              </Link>
            </div>
            <div className="flex flex-col ">
              {MyAllTeams.length > 0
                ? MyAllTeams.map((team) => (
                    <div className="p-4  border-b-2 border-primary cursor-pointer hover:bg-primary/5  flex  gap-2  items-center    ">
                        <div  className=" w-10 h-10 bg-slate-400 rounded-full">

                        </div>
                      <h1 className="capitalize  text-dark-blue text-lg font-bold ">{team.tittle}</h1>
                    </div>
                  ))
                : null}
            </div>
          </div>

          <div className="flex-1 flex items-center    justify-center">
            <h2 className=" font-bold text-2xl">Chat Renders Here </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Myteams;

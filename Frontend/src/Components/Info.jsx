import React from "react";
import { useSelector } from "react-redux";
import { isLoginState } from "../Store/AuthSlice";

const Info = () => {
  const log = useSelector(isLoginState);
  const logS = () => {
    console.log(log);
  };
  return (
    <div>
      <button onClick={log} className=" bg-primary text-white">
        click me
      </button>
    </div>
  );
};

export default Info;

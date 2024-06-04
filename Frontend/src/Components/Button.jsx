import React from "react";
import { loginUser } from "../Store/AuthSlice";

const Button = ({ prompt, handleClick} ) => {
  return (
    <button
      onClick={()=>handleClick()}
      type="submit"
      className=" text-pale hover:bg-primary/95  hover:shadow-2xl bg-primary px-8 py-2 rounded-xl font-poppins"
    >
      {prompt}
    </button>
  );
};

export default Button;

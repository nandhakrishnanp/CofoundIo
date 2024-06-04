import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className=" min-h-screen w-full flex items-center justify-center bg-primary">
      <div className="p-7 rounded-xl  bg-pale flex flex-col items-center ">
        <h1 className="text-7xl text-center text-dark-blue">404</h1>
        <p className=" text-4xl   font-monsherrat text-dark-blue text-center">
          You Are On Wrong Page
        </p>
        <Link to="/home">
          <button className="g text-pale bg-primary p-4 rounded-full m-3   font-poppins">
            Go to home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

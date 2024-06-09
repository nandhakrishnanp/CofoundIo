import React from "react";
import { toast } from "react-toastify";
import addimg from "../assets/addimg.svg";
const Changeprofile = ({
  setOpenFile,
  setProfileImg,
  profileImg,
  handleProfileUpload,
}) => {
  return (
    <div className="absolute flex flex-col items-center justify-center left-0 top-0 z-10 w-[100%]  bg-Secondary/50  h-screen  ">
      <div className=" relative p-5 bg-white w-1/2 h-1/2  overflow-y-scroll max-md:w-[80%] rounded-lg rounded-b-none">
        <h1 className=" text-center font-poppins  font-bold text-2xl text-dark-blue  p-4">
          Change Profile Details
        </h1>
        <div className="mx-6">
          <p className="  font-poppins text-md   font-medium text-slate-500">
            Name:
          </p>
          <input
            type="text"
            placeholder="Enter Your FullName"
            className="h-6 bg-slate-200 w-full border-0 my-1 p-4 focus:ring-1 focus:ring-dark-blue placeholder:font-poppins   placeholder:text-dark-blue font-poppins  rounded-md  outline-none "
          />

          <p className="  font-poppins text-md  pt-2  font-medium  text-slate-500">
            TagLine:
          </p>
          <input
            type="text"
            placeholder="Enter TagLine"
            className="h-6 bg-slate-200 w-full border-0 my-1 p-4 focus:ring-1 focus:ring-dark-blue placeholder:font-poppins   placeholder:text-dark-blue font-poppins  rounded-md  outline-none "
          />
          <p className="  font-poppins text-md  pt-2  font-medium  text-slate-500">
            Profile Image:
          </p>
        </div>

        <div className="flex  overflow-hidden mt-2 rounded-md  h-1/2  items-center   mx-6 bg-slate-200 justify-center">
          {profileImg ? (
            <img
              src={URL.createObjectURL(profileImg)}
              alt=""
              className=" object-contain"
            />
          ) : (
            <div>
 <label for="profileImg" class="custom-file-upload">
                      <img src={addimg} className="w-[30px]" alt="" />
                    </label>
              <input
                type="file"
                name="image"
                id="profileImg"
                className="   .custom-file-upload "
                onChange={(e) => {
                  const img = e.target.files[0];
                  setProfileImg(img);
                }}
              />
            </div>
          )}
        </div>
        <div className="mx-6">
          <p className="  font-poppins text-md  pt-2  font-medium  text-slate-500">
            City
          </p>
          <input
            type="text"
            placeholder="Enter Your City"
            className="h-6  bg-slate-200 w-full border-0 my-1 p-4 focus:ring-1 focus:ring-dark-blue placeholder:font-poppins   placeholder:text-dark-blue font-poppins  rounded-md  outline-none "
          />
        </div>
      </div>
      <div className="flex w-1/2   max-md:w-[80%]  rounded-b-md   bg-white gap-4 p-4 justify-end">
        <button
          onClick={() => setOpenFile(false)}
          className="  bg-primary text-white px-4 py-1 rounded-xl"
        >
          Close
        </button>
        <button
          onClick={() => {
            if (profileImg) {
              handleProfileUpload();
            } else {
              toast.error("No Image Selected");
            }
          }}
          className="  bg-primary text-white px-4 py-1 rounded-xl"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Changeprofile;

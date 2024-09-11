import React from "react";
import { toast } from "react-toastify";
import addimg from "../assets/addimg.svg";

const ChangeBanner = ({
  setOpenBanner,
  handleBannerUpload,
  setBannerImg,
  bannerImg,
}) => {
  return (
    <div className="absolute  flex items-center backdrop-blur-sm justify-center left-0 top-0 z-10 w-[100%]    h-screen  ">
      <div data-aos="zoom-in" className=" bg-white w-1/2 h-1/2   rounded-lg">
        <h1 className="  text-xl   text-dark-blue font-poppins font-semibold p-4">
          Change Banner Image
        </h1>

        <div className="flex  overflow-hidden  h-1/2  items-center   m-4  ring-primary ring-2  rounded-lg justify-center">
          {bannerImg ? (
            <img
              src={URL.createObjectURL(bannerImg)}
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
                className="  d-none"
                onChange={(e) => {
                  const img = e.target.files[0];
                  setBannerImg(img);
                }}
              />
            </div>
          )}
        </div>
        <div className="flex  gap-4 p-4 justify-end">
          <button
            onClick={() => setOpenBanner(false)}
            className="  bg-primary text-white px-4 py-1 rounded-xl"
          >
            Close
          </button>
          <button
            onClick={() => {
              if (bannerImg) {
                handleBannerUpload();
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
    </div>
  );
};

export default ChangeBanner;

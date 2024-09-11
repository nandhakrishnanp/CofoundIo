import React from "react";
import { Link } from "react-router-dom";
import bannerimg from "../../assets/cofound.png"
import profilePage from "../../assets/profilpage.png"
import chatpage from "../../assets/chat.png"
import exporepage from "../../assets/explore.png"
const Landing = () => {
  return (
    <>
      <main className="  w-full     text-white ">
        <div className=" flex bg-dark-blue  items-center justify-end">
        <h1  className="bg-dark-blue text-white text-xl font-bold  p-1">Cofound.Io</h1>

        <div className=" ml-auto px-3 mt-2 ">

        <Link to="/home">
          <button className="  px-2  bg-white  rounded-full py-[5px] font-bold  text-dark-blue  font-poppins">
            Get Started
          </button>
        </Link>
        </div>

        </div>
        <section className=" bg-dark-blue min-h-[90vh] flex justify-center flex-col items-center">
           
           <h1 data-aos="fade-in"  className=" text-center shadow-xs shadow-white max-md:text-3xl text-white font-Mochiy text-5xl font-bold">Build Amazing <span className="   text-violet-400">Projects</span> Together</h1>
          <p data-aos="fade-in"  className=" text-white py-2 max-md:text-lg font-poppins font-semibold text-xl p-1 text-center">Join a vibrant community of solo innovators and collaborators. Turn your ideas into reality with <br /> the perfect team at Cofoundio</p>
          <img data-aos="fade-up" src={bannerimg} alt="bannerimg" className=" rounded-md mt-2 max-md:w-[80%]  w-1/2" />
        </section>
        <section  className=" min-h-screen">
          <div  className=" mx-[50px] my-24 flex flex-wrap items-center justify-center">

            <img className=" max-md:w-[90%] w-1/2  border-[3px] rounded-lg border-primary" src={profilePage} alt="" />
            <div className=" flex mx-4 max-md:mt-3  flex-col items-center justify-center">
                 <h1 className=" text-primary px-4 text-4xl font-bold font-Inter">Create Your Profile</h1>
                 <h1 className=" text-dark-blue px-4 text-4xl font-bold font-Inter">In CoFound.Io</h1>

            </div>
          </div>
          <div className="mx-[50px] my-24 flex flex-wrap-reverse items-center justify-center">

            <div className="max-md:mt-3">
            <h1 className=" text-primary px-4 text-4xl font-bold font-Inter">Discover Teams</h1>
                 <h1 className=" text-dark-blue px-4 text-4xl font-bold font-Inter">Browse a variety of projects looking for contributors.</h1>

            </div>
            <img className=" border-[3px] rounded-lg border-primary w-96" src={exporepage} alt="" />
          </div>
          <div className="mx-[50px] my-24 flex max-md:flex-wrap items-center justify-center">
 
            <img className="max-md:w-[90%] border-[3px] rounded-lg border-primary w-1/2" src={chatpage} alt="" />
            
            <div className=" max-md:mt-3">
            <h1 className=" text-primary px-4 text-4xl font-bold font-Inter">Collaborate & Create</h1>
                 <h1 className=" text-dark-blue px-4 text-4xl font-bold font-Inter">Work together seamlessly to bring innovative ideas to life.</h1>

            </div>
          </div>
        </section>
        
        <section className=" flex items-center flex-col justify-center min-h-[50vh] bg-dark-blue">
        <h1 className=" text-white px-4 text-4xl font-bold font-Inter">"If you cannot do great things, do small things in a great way."</h1>
        
        <Link to="/home">
          <button className="  px-2 mt-4 bg-white  rounded-full py-[5px] font-bold  text-dark-blue  font-poppins">
            Start Innovating
          </button>
        </Link>
        </section>

        <p className=" text-center text-white font-Inter pb-2 bg-dark-blue">Built With ❤️ by NandhaKrishnan & Prasanth</p>

      </main>
    </>
  );
};

export default Landing;

import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <main className=" px-12 w-full h-screen  bg-blue-950 py-20 text-white ">
        <section>Navbar</section>
        <section>Hero Section</section>
        <section>How our platform Works</section>
        <section>Testimonials</section>

        <section>FaQs</section>
        <section>Footer</section>

        <Link to="/home">
          <button className="g text-pale bg-primary p-4 rounded-full m-3   font-poppins">
            Go to home
          </button>
        </Link>
      </main>
    </>
  );
};

export default Landing;

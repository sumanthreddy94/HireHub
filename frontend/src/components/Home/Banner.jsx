import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus, FaSearch, FaMapPin } from "react-icons/fa";
import React, { useState } from "react"

const Banner = ({query, handleInputChange, handleLocationChange, location}) => {
  
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14">
        <h1 className="text-5xl font-bold text-primary mb-3">Start your <span className="text-blue">new career</span> today</h1>
        <p className="text-lg text-black/70 mb-8">Embrace exciting opportunities, explore your passions, and unlock your potential in a role that aligns with your skills and aspirations.</p>

        <form>
          <div className="flex justify-start md:flex-row flex-col md:gap-0 gap-4">
            <div className="flex md:rounded-s-md rounded shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full">
              <input type="text" name="title" id="title" placeholder="What position are you looking for ?" className="block flex-1 border-0 bg-transparent py-1 pl-8 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6" onChange={handleInputChange} value={query}/>
              <FaSearch className="absolute mt-2.5 ml-2 text-gray-400" />
            </div>
            <div className="flex md:rounded-s-none rounded shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3 w-full">
              <input type="text" name="title" id="title" placeholder="Location" className="block flex-1 border-0 bg-transparent py-1 pl-8 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6" onChange={handleLocationChange} value={location}/>
              <FaMapPin className="absolute mt-2.5 ml-2 text-gray-400" />
            </div>
            <button className="bg-blue py-2 px-8 text-white md:rounded-s-none rounded" type="submit">Search</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Banner;

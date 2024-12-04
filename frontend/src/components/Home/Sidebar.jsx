import React from 'react'
import Location from "./Location";
import Salary from './Salary';
import JobPostingData from './JobPostingDate';
import WorkExperience from './WorkExperience';
import { Link } from "react-router-dom";

const Sidebar = ({handleChange, handleClick}) => {

  return (
    <div className='space-y-5'> 
        <h3 className='text-lg font-bold mb-2'>Filters</h3>
            <Location handleChange={handleChange} />
            <Salary handleChange={handleChange} handleClick={handleClick} />
            <JobPostingData handleChange={handleChange}/>
            <WorkExperience handleChange={handleChange} />
            <Link to="/">Home</Link>
      <Link to="/employer/applications">Job Applications</Link>
    </div>
  )
}

export default Sidebar

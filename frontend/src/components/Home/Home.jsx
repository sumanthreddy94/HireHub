import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Banner from "./Banner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import JobsLayout from "../Pages/JobsLayout";
import Card from "../Home/Card";
import Sidebar from "./Sidebar";
import NewsLetter from "./NewsLetter";
import { useDispatch, useSelector } from "react-redux"
import { setAuth, logout } from "../redux/authSlice";

const Home = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6;
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const { isAuthorized } = useSelector((state) => {
    return state.auth;
  });
  useEffect(() => {
    try {
      setIsLoading(true)
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data.jobs || []);
          setIsLoading(false)
        });
    } catch (error) {
      console.log(error);
    }
  }, []);


  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  const filteredItems = Array.isArray(jobs)
    ? jobs.filter((job) =>
        job.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  const calculateRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {startIndex, endIndex}
  }

  const nextPage = () => {
    if(currentPage < Math.ceil(filteredItems.length / itemsPerPage)){
      setCurrentPage(currentPage + 1);
    }
  }

  const prevPage = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1)
    }
  }

  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;


    // Filter by query
    if (query) {
      filteredJobs = filteredJobs.filter((job) =>
        job.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by selected category or city/salary
    if (selected) {
      filteredJobs = filteredJobs.filter(({ city, salaryTo, category, jobPostedOn, experienceLevel }) => {
        return (
          city.toLowerCase() === selected.toLowerCase() ||
          parseInt(salaryTo) === parseInt(selected) ||
          jobPostedOn >= selected ||
          category.toLowerCase() === selected.toLowerCase() ||
          experienceLevel.toLowerCase() === selected.toLowerCase()
        );
      });
      console.log("Filtered by Category/City/Salary:", filteredJobs);
    }
    const {startIndex, endIndex} = calculateRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex)
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };
  

  const result = filteredData(jobs, selectedCategory, query);

  return (
    <>
      <div>
        <Banner query={query} handleInputChange={handleInputChange} />
        <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded"><Sidebar handleChange={handleChange} handleClick={handleClick}/></div>
        <div className="col-span-2 bg-white p-4 rounded-sm">
          {
            isLoading ? (<p className="font-medium">Loading...</p>) : result.length > 0 ? (<JobsLayout result={result} />) : <>
            <h3 className="text-lg font-bold mb-3">{result.length} Jobs</h3>
            <p>No data found!</p>
            </>         
          }
          {/* Pagination */}
          {
            result.length > 0 ? (
              <div className="flex justify-center mt-4 space-x-8">
                <button onClick={prevPage} disabled={currentPage === 1} className="hover:underline" >Previous</button>
                <span className="mx-2">Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
                <button onClick={nextPage} className="hover:underline" disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)} >Next</button>
              </div>
            ) : ""
          }
        </div>
        <div className="bg-white p-4 rounded"><NewsLetter/></div>
        </div>
      </div>
    </>
  );
};

export default Home;

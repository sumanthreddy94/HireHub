import  { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux"
import toast from "react-hot-toast";
import {  useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModel"; // Make sure to include this import
import Spinner from 'react-bootstrap/Spinner'; 
const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const { isAuthorized, user } = useSelector((state) => {
    return state.auth;
  });  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (user && user.role === "Employer") {
      axios
        .get("http://localhost:4000/api/v1/application/employer/getall", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data.applications);
          setApplications(res.data.applications);
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoading(false);
        });
    } else {
      axios
        .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data.applications);
          setApplications(res.data.applications);
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoading(false);
        });
    }
  }, [isAuthorized, user]);

  if (!isAuthorized) {
    navigateTo("/");
    return null; 
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                  applications={applications} 
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                  applications={applications} 
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const handleClick = (resumePath) => {
  window.open(`http://localhost:4000/${resumePath}`, '_blank', 'noopener,noreferrer');
};

const JobSeekerCard = ({ element, deleteApplication, openModal, applications }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>CoverLetter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="resume">
        {applications
          .filter((app) => app._id === element._id)
          .map((application) => (
            <div key={application._id} className="application-card">
              {application.resume && application.resume.path && (
                <iframe
                  onClick={() => handleClick(application.resume.path)}
                  src={`http://localhost:4000/${application.resume.path}`}
                  width="500"
                  height="800"
                  title="Resume"
                ></iframe>
              )}
            </div>
          ))}
      </div>
      <div className="btn_area">
      <button
  onClick={() => deleteApplication(element._id)}
  className=" mx-5 px-4 py-2 bg-red-600 text-white  font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200"
>
  Delete Application
</button>

      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal, applications }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>CoverLetter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="resume">
        {/* Map through applications to display resumes */}
        {applications
          .filter((app) => app._id === element._id)
          .map((application) => (
            <div key={application._id} className="application-card">
              {application.resume && application.resume.path && (
                <iframe
                  onClick={() => handleClick(application.resume.path)}
                  src={`http://localhost:4000/${application.resume.path}`}
                  width="600"
                  height="800"
                  title="Resume"
                ></iframe>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

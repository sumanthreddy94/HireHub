import React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { useState, useContext } from "react";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EarthCanvas, StarsCanvas } from "../Canvas/index";
import { motion } from "framer-motion";
import { slideIn } from "../Auth/motion";
import { styles } from "./styles";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEye);
  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response from server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(faEye);
      setType("text");
    } else {
      setIcon(faEyeSlash);
      setType("password");
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }
  return (
    <div
      className={` w-screen xl:mt-0 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden relative`}
    >
      <StarsCanvas />
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] p-8 rounded-2xl z-10 relative"
      >
        <p className={styles.sectionSubText}>Welcome!</p>
        <h3 style={{color:"black"}} className={styles.sectionHeadText}>Sign up to continue.</h3>

        <form className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col">
            <span className="text-black font-medium mb-4">Select Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-transparent py-2 px-5 placeholder:text-secondary text-black rounded border font-medium"
              required
            >
              <option value="">Select Role</option>
              <option value="Employer">Employer</option>
              <option value="Job Seeker">Job Seeker</option>
            </select>
          </label>
          <label className="flex flex-col">
            <span className="text-black font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="bg-transparent py-2 px-5 placeholder:text-secondary text-black rounded border font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="text-black font-medium mb-4">Your Username</span>
            <input
              type="text"
              name="name"
              placeholder="Enter your username"
              className="bg-transparent py-2 px-5 placeholder:text-secondary text-black rounded border font-medium"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="text-black font-medium mb-4">Your Phone</span>
            <input
              type="phone"
              name="phone"
              placeholder="Enter your phone"
              className="bg-transparent py-2 px-5 placeholder:text-secondary text-black rounded border font-medium"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <label className="flex flex-col relative">
            <span className="text-black font-medium mb-4">Password</span>
            <input
              type={type}
              name="password"
              placeholder="Enter your password"
              className="bg-transparent py-2 px-5 placeholder:text-secondary text-black rounded border font-medium pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              className="absolute right-4 bottom-2 transform -translate-y-1/2 cursor-pointer text-black"
              onClick={handleToggle}
              icon={icon}
            />
          </label>
          <button
            onClick={handleRegister}
            type="submit"
            className="py-3 px-8 rounded-xl outline-none w-fit text-black font-bold shadow-md shadow-primary hover:bg-tertiary transition-colors bg-white"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <div className="flex justify-between text-sm">
            <a href="/login" className="text-black hover:underline">
              Already have an account? Login
            </a>
            
          </div>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] z-10 relative"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default Register;

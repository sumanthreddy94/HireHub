import  {  useState, useContext } from "react";
import { motion } from "framer-motion";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { styles } from "./styles";
import { EarthCanvas, StarsCanvas } from "../Canvas/index";
import { slideIn } from "../Auth/motion";
import toast from "react-hot-toast";
import { Context } from "../../main";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEye);
  const [loading, setLoading] = useState(false);

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
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

  // Redirect if already authorized
  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <div
      className={` h-screen w-screen xl:mt-0 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden relative`}
    >
      <StarsCanvas />
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] p-8 rounded-2xl z-10 relative"
      >
        <p className={styles.sectionSubText}>Welcome Back</p>
        <h3 style = {{color:"black"}} className={styles.sectionHeadText}>Sign in.</h3>

        <form className="mt-12 flex flex-col gap-8">
          <label className="flex flex-col">
            <span className="text-black font-medium mb-4">Select Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-transparent py-4 px-6 placeholder:text-secondary text-black rounded border font-medium"
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
              className="bg-transparent py-4 px-6 placeholder:text-secondary text-black rounded border font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="flex flex-col relative">
            <span className="text-black font-medium mb-4">Password</span>
            <input
              type={type}
              name="password"
              placeholder="Enter your password"
              className="bg-transparent py-4 px-6 placeholder:text-secondary text-black rounded border font-medium pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              className="absolute right-4 bottom-3 transform -translate-y-1/2 cursor-pointer text-black"
              onClick={handleToggle}
              icon={icon}
            />
          </label>
        
          <button
            onClick={handleLogin}
            type="submit"
            className="py-3 px-8 rounded-xl outline-none w-fit text-black font-bold shadow-md shadow-primary hover:bg-tertiary transition-colors bg-white"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="flex justify-between text-sm">
            <a href="/register" className="text-white hover:underline">
              Don't have an account? Register
            </a>
            <a href="/forget" className="text-white hover:underline">
              Forget Password?
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

export default Login;
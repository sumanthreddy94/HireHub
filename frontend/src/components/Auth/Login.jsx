// import React,{ useState } from "react";
// import { CssVarsProvider } from "@mui/joy/styles";
// import Sheet from "@mui/joy/Sheet";
// import Typography from "@mui/joy/Typography";
// import { useContext } from "react";
// import FormControl from "@mui/joy/FormControl";
// import FormLabel from "@mui/joy/FormLabel";
// import Input from "@mui/joy/Input";
// import Button from "@mui/joy/Button";
// import Link from "@mui/joy/Link";
// import toast from "react-hot-toast";
// import { Context } from "../../main";
// import { Navigate } from "react-router-dom";
// import axios from "axios";
// import Select from "@mui/joy/Select";
// import Option from "@mui/joy/Option";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// export default function Login() {
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");
// const [role, setRole] = useState("");
// const [type, setType] = useState("password");
// const [icon, setIcon] = useState(faEye);

// const { isAuthorized, setIsAuthorized } = useContext(Context);

// const handleLogin = async (e) => {
//   e.preventDefault();
//   try {
//     const { data } = await axios.post(
//       "http://localhost:4000/api/v1/user/login",
//       { email, password, role },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       }
//     );
//     toast.success(data.message);
//     setEmail("");
//     setPassword("");
//     setRole("");
//     setIsAuthorized(true);
//   } catch (error) {
//     toast.error(error.response.data.message);
//   }
// };

// const handleToggle = () => {
//   if (type === "password") {
//     setIcon(faEye);
//     setType("text");
//   } else {
//     setIcon(faEyeSlash);
//     setType("password");
//   }
// };

// if (isAuthorized) {
//   return <Navigate to={"/"} />;
// }

// if (isAuthorized) {
//   return <Navigate to={"/"} />;
// }

//   return (
//     <>
//     <img className="jpg" src="login.jpg" alt="" />
//       <CssVarsProvider>
//         <main style={{ marginTop: "4%" }}>
//           <Sheet
//             sx={{
//               width: 300,
//               mx: "auto", // margin left & right
//               my: 0, // margin top & botom
//               py: 9, // padding top & bottom
//               px: 2, // padding left & right
//               display: "flex",
//               flexDirection: "column",
//               gap: 2,
//               borderRadius: "sm",
//               boxShadow: "md",
//             }}
//             variant="outlined"
//           >
//             <div>
//               <Typography level="h4" component="h1">
//                 <b>Welcome!</b>
//               </Typography>
//               <Typography level="body2">Login to continue.</Typography>
//             </div>
//             <FormControl>
//               <FormLabel>Role</FormLabel>
//               <Select
//                 value={role}
//                 onChange={(e, newValue) => setRole(newValue)}
//               >
//                 <Option value="">Select Role</Option>
//                 <Option value="Employer">Employer</Option>
//                 <Option value="Job Seeker">Job Seeker</Option>
//               </Select>
//             </FormControl>
//             <FormControl>
//               <FormLabel>Email</FormLabel>
//               <Input
//                 type="text"
//                 name="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Password</FormLabel>
//               <Input
//                 type={type}
//                 name="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <FontAwesomeIcon
//                 className="eye2"
//                 onClick={handleToggle}
//                 icon={icon}
//               />
//             </FormControl>
//             <div className="err"></div>
//             <Button
//               type="submit"
//               onClick={handleLogin}
//               sx={{ mt: 1 /* margin top */ }}
//             >
//               Log in
//             </Button>

//             <Typography
//               endDecorator={<Link href="/register">Register</Link>}
//               fontSize="sm"
//               sx={{ alignSelf: "center" }}
//             >
//               Don&apos;t have an account?
//             </Typography>
//             <Typography
//               endDecorator={<Link href="/forget">Forget Password?</Link>}
//               fontSize="sm"
//               sx={{ alignSelf: "center" }}
//             ></Typography>
//           </Sheet>
//         </main>
//       </CssVarsProvider>
//     </>
//   );
// }

// import React, { useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { styles } from "./styles";
// import { EarthCanvas, StarsCanvas } from "../Canvas/index";
// import { slideIn } from "../Auth/motion";
// import toast from "react-hot-toast";
// import { Context } from "../../main";
// import { useContext } from "react";
// import axios from "axios";
// import { Navigate, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// const Login = () => {
//   const formRef = useRef();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [type, setType] = useState("password");
//   const [icon, setIcon] = useState(faEye);

//   const { isAuthorized, setIsAuthorized } = useContext(Context);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         "http://localhost:4000/api/v1/user/login",
//         { email, password, role },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       toast.success(data.message);
//       setEmail("");
//       setPassword("");
//       setRole("");
//       setIsAuthorized(true);
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   const handleToggle = () => {
//     if (type === "password") {
//       setIcon(faEye);
//       setType("text");
//     } else {
//       setIcon(faEyeSlash);
//       setType("password");
//     }
//   };

//   if (isAuthorized) {
//     return <Navigate to={"/"} />;
//   }

//   if (isAuthorized) {
//     return <Navigate to={"/"} />;
//   }
//   return (
//     <div
//       className={`xl:mt-0 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
//     >
//       <motion.div
//         variants={slideIn("left", "tween", 0.2, 1)}
//         className="flex-[0.75] p-8 rounded-2xl"
//       >
//         <p className={styles.sectionSubText}>Get in touch</p>
//         <h3 className={styles.sectionHeadText}>Sign in.</h3>

//         <form className="mt-12 flex flex-col gap-8">
//           <label className="flex flex-col">
//             <span className="text-white font-medium mb-4">Your Name</span>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)} // Use e.target.value to get the selected value
//               className="bg-transparent py-4 px-6 placeholder:text-secondary text-white rounded border font-medium"
//             >
//               <option value="">Select Role</option>
//               <option value="Employer">Employer</option>
//               <option value="Job Seeker">Job Seeker</option>
//             </select>
//           </label>
//           <label className="flex flex-col">
//             <span className="text-white font-medium mb-4">Your email</span>
//             <input
//               type="email"
//               name="email"
//               placeholder="What's your email?"
//               className="bg-transparent py-4 px-6 placeholder:text-secondary text-white rounded border font-medium"
//               value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//           </label>
//           <label className="flex flex-col">
//             <span className="text-white font-medium mb-4">Password</span>
//             <input
//               type="password"
//               name="password"
//               placeholder="your Password?"
//               className="bg-transparent py-4 px-6 placeholder:text-secondary text-white rounded border border font-medium"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//               <FontAwesomeIcon
//                 className="eye2"
//                 onClick={handleToggle}
//                 icon={icon}
//               />
//           </label>
        
//           <button
//                         onClick={handleLogin}

//             type="submit"
//             className="py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
//           >
//             {loading ? "Signin..." : "Sign in"}
//           </button>
//         </form>
//       </motion.div>

//       <motion.div
//         variants={slideIn("right", "tween", 0.2, 1)}
//         className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
//       >
//         <EarthCanvas />
//       </motion.div>
//       <StarsCanvas />
//     </div>
//   );
// };

// export default Login;


import React, { useRef, useState, useContext } from "react";
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
      setIcon(faEyeSlash);
      setType("text");
    } else {
      setIcon(faEye);
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
        <h3 className={styles.sectionHeadText}>Sign in.</h3>

        <form className="mt-12 flex flex-col gap-8">
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Select Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-transparent py-4 px-6 placeholder:text-secondary text-white rounded border font-medium"
              required
            >
              <option value="">Select Role</option>
              <option value="Employer">Employer</option>
              <option value="Job Seeker">Job Seeker</option>
            </select>
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="bg-transparent py-4 px-6 placeholder:text-secondary text-white rounded border font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="flex flex-col relative">
            <span className="text-white font-medium mb-4">Password</span>
            <input
              type={type}
              name="password"
              placeholder="Enter your password"
              className="bg-transparent py-4 px-6 placeholder:text-secondary text-white rounded border font-medium pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              className="absolute right-4 bottom-3 transform -translate-y-1/2 cursor-pointer text-white"
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
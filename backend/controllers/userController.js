import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { Job } from "../models/jobSchema.js";
import { Application } from "../models/applicationSchema.js";
import { sendToken } from "../utils/jwtToken.js"

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password, phone, role } = req.body;
  if (!name || !email || !password || !phone || !role) {
    return next(new ErrorHandler("Please fill full registration form!"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already exist!"));
  }
  const user = await User.create({
    name,
    email,
    password,
    phone,
    role,
  });
  sendToken(user, 200, res, "User Registered Successfully!")
});

export const login = catchAsyncError(async(req, res, next) => {
    const { email, password, role } = req.body
    if(!email || !password || !role){
        return next(new ErrorHandler("Please provide email, password and role.", 400))
    }
    const user = await User.findOne({ email }).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password.", 400))
    }
    const isPasswordMAtched = await user.comparePassword(password);
    if(!isPasswordMAtched){
        return next(new ErrorHandler("Invalid Email or Password.", 400))   
    }
    if(user.role !== role){
        return next(new ErrorHandler("User with this role not found!", 400))   
    }
    sendToken(user, 200, res, "User logged in successfully!")
})

export const logout = catchAsyncError(async (req, res, next) => {
    res
      .status(201)
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Logged Out Successfully.",
      });
  });

export const getUser = catchAsyncError((req, res, next) => {
  const user = req.user
  res.status(200).json({
    success: true,
    user
  })
})

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find({}).select('name email role createdAt')
  res.status(200).json({
    success: true,
    users,
  });
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;


  if (role !== "Admin") {
    return next(
      new ErrorHandler(
        "Not allowed to access this resource!",
        400
      )
    );
  }
  const { email } = req.params;
  let deleteUser = await User.findOne({email});
  if (!deleteUser) {
    return next(new ErrorHandler("Oops! User not found!", 400));
  }
  await deleteUser.deleteOne();
  res.status(200).json({
    success: true,
    message: "User deleted successfully!",
  });
});



export const getDashboardStats = async (req, res, next) => {

  const { role } = req.user;

  if (role !== "Admin") {
    return next(
      new ErrorHandler(
        "Not allowed to access this resource!",
        400
      )
    );
  }

  try {
    // Jobs by Category
    const jobsByCategory = await Job.aggregate([
      { $group: {
        _id: '$category',
        count: { $sum: 1 }
      }},
      { $project: {
        category: '$_id',
        count: 1,
        _id: 0
      }}
    ]);

    // Application Statuses
    const applicationStatuses = await Application.aggregate([
      { $group: {
        _id: '$status',
        count: { $sum: 1 }
      }},
      { $project: {
        status: '$_id',
        count: 1,
        _id: 0
      }}
    ]);

    // Experience Levels
    const experienceLevels = await Job.aggregate([
      { $group: {
        _id: '$experienceLevel',
        count: { $sum: 1 }
      }},
      { $project: {
        experienceLevel: '$_id',
        count: 1,
        _id: 0
      }}
    ]);

    // Employment Types
    const employmentTypes = await Job.aggregate([
      { $group: {
        _id: '$employmentType',
        count: { $sum: 1 }
      }},
      { $project: {
        employmentType: '$_id',
        count: 1,
        _id: 0
      }}
    ]);

    // User Roles
    const userTypes = await User.aggregate([
      { $group: {
        _id: '$role',
        count: { $sum: 1 }
      }},
      { $project: {
        role: '$_id',
        count: 1,
        _id: 0
      }}
    ]);

    res.status(200).json({
      jobsByCategory,
      applicationStatuses,
      experienceLevels,
      employmentTypes,
      userTypes
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching dashboard stats', 
      error: error.message 
    });
  }
};
  
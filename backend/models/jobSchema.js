import mongoose from "mongoose";
import moment from "moment-timezone";

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "Please provide companyName"],
    minLength: [3, "companyName must contain atleast 3 characters!"],
    maxLength: [50, "companyName cannot exceed 50 characters!"],
  },
  companyLogo: {
    path: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
  },
  title: {
    type: String,
    required: [true, "Please provide job title"],
    minLength: [3, "Job title must contain atleast 3 characters!"],
    maxLength: [50, "Job title cannot exceed 50 characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide job description"],
    minLength: [3, "Job description must contain atleast 3 characters!"],
    maxLength: [200, "Job description cannot exceed 200 characters!"],
  },
  experienceLevel: {
    type: String,
    required: [true, "Please provide experienceLevel"],
    minLength: [3, "experienceLevel must contain atleast 3 characters!"],
    maxLength: [50, "experienceLevel cannot exceed 50 characters!"],
  },
  category: {
    type: String,
    required: [true, "Job category is required!"],
  },
  country: {
    type: String,
    required: [true, "Job country is required!"],
  },
  city: {
    type: String,
    required: [true, "Job city is required!"],
  },
  location: {
    type: String,
    required: [true, "Please provide exact location!"],
  },
  salaryType: {
    type: String,
    required: [true, "Please provide salary type!"],
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "Fixed salary atleast 4 digits!"],
    maxLength: [9, "Fixed salary cannot exceed 9 digits!"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "Salary from atleast 4 digits!"],
    maxLength: [9, "Salary from cannot exceed 9 digits!"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, "Salary to atleast 4 digits!"],
    maxLength: [9, "Salary to cannot exceed 9 digits!"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: String, // Change to String to store the formatted date
    default: function () {
      return moment().tz("America/New_York").format("YYYY-MM-DD");
    },
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});





export const Job = mongoose.model("Job", jobSchema);

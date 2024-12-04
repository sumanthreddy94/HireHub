import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import upload from "../config/multerConfig.js"

// Get all applications for a job seeker
export const jobSeekerGetAllApplications = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler(
          "Employer are not allowed to access this resource!",
          400
        )
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

// Delete application
export const jobSeekerDeleteApplication = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler(
          "Employer are not allowed to access this resource!",
          400
        )
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Oops! Application not found.", 400));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application deleted successfully!",
    });
  }
);

// Submit new application
export const postApplication = catchAsyncError(async (req, res, next) => {
  try {
    // Log the request URL
    console.log('Request URL:', req.originalUrl);
    
    // Log the request body and uploaded file
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    // Check user role
    const { role } = req.user;
    if (role === "Employer") {
      return next(new ErrorHandler("Employers are not allowed to access this resource!", 400));
    }

    // Ensure file upload
    if (!req.file) {
      return next(new ErrorHandler("Resume file is required!", 400));
    }

    // Extract fields from request body
    const { name, email, coverLetter, phone, address, jobId } = req.body;
    if (!name || !email || !coverLetter || !phone || !address || !jobId) {
      return next(new ErrorHandler("Please fill all fields!", 400));
    }

    // Check if job exists
    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
      return next(new ErrorHandler("Job not found!", 404));
    }

    // Define applicant and employer IDs
    const applicantID = {
      user: req.user._id,
      role: "Job Seeker",
    };

    const employerID = {
      user: jobDetails.postedBy,
      role: "Employer",
    };

    // Save resume details
    const resume = {
      path: req.file.path,
      filename: req.file.filename,
    };

    // Create application
    const application = await Application.create({
      name,
      email,
      phone,
      address,
      coverLetter,
      applicantID,
      employerID,
      resume,
    });

    // Respond with success
    res.status(200).json({
      success: true,
      message: "Application submitted successfully!",
      application,
    });
  } catch (error) {
    console.error('Error in postApplication:', error);
    next(new ErrorHandler("An error occurred while submitting your application. Please try again.", 500));
  }
});

// Get single application details
export const getApplicationDetails = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(new ErrorHandler("Employers are not allowed to access this resource!", 400));
  }

  const application = await Application.findById(req.params.id);
  
  if (!application) {
    return next(new ErrorHandler("Application not found", 404));
  }

  // Verify the application belongs to the requesting user
  if (application.applicantID.user.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Unauthorized to access this application", 403));
  }

  res.status(200).json({
    success: true,
    application,
  });
});
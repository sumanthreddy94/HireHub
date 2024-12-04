import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";

export const employerGetAllApplications = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler(
          "Job Seekers are not allowed to access this resource!",
          400
        )
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const filterApplications = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;

  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seekers are not allowed to access this resource!", 400)
    );
  }

  // Extract filter criteria from query params
  const { status, date } = req.query;
  const filters = { "employerID.user": req.user._id };

  if (status) {
    filters.status = status;
  }
  if (date) {
    filters.date = { $gte: new Date(date) };
  }

  const applications = await Application.find(filters);
  res.status(200).json({
    success: true,
    applications,
  });
});

export const hireApplication = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const application = await Application.findById(id);
  if (!application) {
    return next(new ErrorHandler("Application not found", 404));
  }

  application.status = "Hired";
  await application.save();

  res.status(200).json({
    success: true,
    message: "Application marked as hired!",
  });
});


export const rejectApplication = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const application = await Application.findById(id);
  if (!application) {
    return next(new ErrorHandler("Application not found.", 404));
  }

  application.status = "Rejected";
  await application.save();

  res.status(200).json({
    success: true,
    message: "Application has been rejected.",
  });
});

export const moveToNextRound = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const application = await Application.findById(id);
  if (!application) {
    return next(new ErrorHandler("Application not found.", 404));
  }

  application.status = "Next Round";
  await application.save();

  res.status(200).json({
    success: true,
    message: "Application moved to the next round.",
  });
});


export const jobSeekerGetAllApplications = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employers are not allowed to access this resource!", 400)
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

export const jobSeekerDeleteApplication = catchAsyncError(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employers are not allowed to access this resource!", 400)
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

export const postApplication = catchAsyncError(async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employers are not allowed to access this resource!", 400)
      );
    }

    const { name, email, coverLetter, phone, address, jobId } = req.body;

    if (!name || !email || !coverLetter || !phone || !address || !jobId) {
      return next(new ErrorHandler("Please fill all fields!", 400));
    }

    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
      return next(new ErrorHandler("Job not found!", 404));
    }

    const applicantID = {
      user: req.user._id,
      role: "Job Seeker",
    };

    const employerID = {
      user: jobDetails.postedBy,
      role: "Employer",
    };

    const resume = {
      path: req.file.path,
      filename: req.file.filename,
    };

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

    res.status(200).json({
      success: true,
      message: "Application submitted successfully!",
      application,
    });
  } catch (error) {
    console.error("Error in postApplication:", error);
    next(
      new ErrorHandler(
        "An error occurred while submitting your application. Please try again.",
        500
      )
    );
  }
});

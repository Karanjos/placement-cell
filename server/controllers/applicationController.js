import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import cloudinary from "cloudinary";

export const admingetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role !== "Admin") {
      return next(
        new ErrorHandler("You are not authorized to view applications!", 401)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({
      "employerID.user": _id,
    }).populate({ path: "applicantID.user", select: "name email phone" });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);
// Admin can accept or reject the application
export const adminUpdateApplicationStatus = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role !== "Admin") {
      return next(
        new ErrorHandler(
          "You are not authorized to update application status!",
          401
        )
      );
    }
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return next(new ErrorHandler("Please provide application status!", 400));
    }
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Oops, Application not found!", 404));
    }
    application.status = status;
    await application.save();
    res.status(200).json({
      success: true,
      message: "Application status updated successfully!",
    });
  }
);

export const adminDeleteApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role !== "Admin") {
      return next(
        new ErrorHandler("You are not authorized to delete applications!", 401)
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Oops, Application not found!", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application deleted successfully!",
    });
  }
);
export const studentgetAllApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role !== "Student") {
      return next(
        new ErrorHandler("You are not allowed to view applications!", 401)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({
      "applicantID.user": _id,
    }).populate({ path: "employerID.user", select: "name email phone" });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const studentDeleteApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role !== "Student") {
      return next(
        new ErrorHandler("You are not allowed to delete applications!", 401)
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Oops, Application not found!", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application deleted successfully!",
    });
  }
);

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Student") {
    return next(new ErrorHandler("You are not allowed to apply for job!", 401));
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Please upload your resume!", 400));
  }
  const { resume } = req.files;
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedFileTypes.includes(resume.mimetype)) {
    return next(
      new ErrorHandler(
        "Inavlid file type, Please upload an image file(PNG, JPG, JPEG)!",
        400
      )
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary error",
      cloudinaryResponse.message || "Unknown cloudinary error"
    );
    return next(
      new ErrorHandler(
        "Oops, Something went wrong while uploading resume!",
        500
      )
    );
  }
  const { name, email, coverLetter, phone, address, course, jobID } = req.body;
  const applicantID = {
    user: req.user._id,
    role: "Student",
  };
  if (!applicantID) {
    return next(new ErrorHandler("applicant not found!", 404));
  }
  if (!jobID) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  const job = await Job.findById(jobID);
  if (!job) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  const employerID = {
    user: job.postedBy,
    role: "Admin",
  };
  if (!employerID) {
    return next(new ErrorHandler("Employer not found!", 404));
  }
  if (
    !name ||
    !email ||
    !phone ||
    !resume ||
    !coverLetter ||
    !address ||
    !applicantID ||
    !employerID ||
    !course
  ) {
    return next(
      new ErrorHandler("Please provide all the required fields!", 400)
    );
  }
  const application = await Application.create({
    name,
    email,
    phone,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.url,
    },
    coverLetter,
    address,
    applicantID,
    employerID,
    course,
  });
  console.log("application", application);
  res.status(200).json({
    success: true,
    message: "Application submitted successfully!",
    application,
  });
});

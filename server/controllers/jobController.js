import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";

export const postJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Admin") {
    return next(new ErrorHandler("You are not authorized to post a job!", 401));
  }
  const {
    company,
    description,
    title,
    country,
    city,
    location,
    FixedSalary,
    salaryFrom,
    salaryTo,
    jobType,
    jobCategory,
    jobQualification,
    jobExperience,
    jobSkills,
    jobResponsibilities,
  } = req.body;
  if (
    !company ||
    !description ||
    !title ||
    !country ||
    !city ||
    !location ||
    !jobType ||
    !jobCategory ||
    !jobSkills
  ) {
    return next(
      new ErrorHandler("Please fill all the fields in job details!", 400)
    );
  }
  if (!FixedSalary && (!salaryFrom || !salaryTo)) {
    return next(
      new ErrorHandler(
        "Please either provide fixed salary or ranged salary!",
        400
      )
    );
  }
  //Admin can not enter fixed salary and ranged salary together
  if (FixedSalary && (salaryFrom || salaryTo)) {
    return next(
      new ErrorHandler(
        "Can not enter fixed salary and ranged salary together!",
        400
      )
    );
  }
  const postedBy = req.user._id;
  const job = await Job.create({
    postedBy,
    title,
    company,
    description,
    country,
    city,
    location,
    FixedSalary,
    salaryFrom,
    salaryTo,
    jobType,
    jobCategory,
    jobQualification,
    jobExperience,
    jobSkills,
    jobResponsibilities,
  });
  res.status(200).json({
    success: true,
    message: "Job posted successfully!",
    job,
  });
});
export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ expired: false }).sort({ jobPostedOn: -1 });
  res.status(200).json({
    success: true,
    jobs,
  });
});
export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Admin") {
    return next(
      new ErrorHandler("You are not authorized to view this page!", 401)
    );
  }
  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});
export const updateJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Admin") {
    return next(
      new ErrorHandler("You are not authorized to update this job!", 401)
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Opps, Job not found!", 404));
  }
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Job updated successfully!",
    job,
  });
});

export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role !== "Admin") {
    return next(
      new ErrorHandler("You are not authorized to delete this job!", 401)
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Oops, Job not found!", 404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job deleted successfully!",
  });
});
// All below functions are yet to be implemented in the other files

export const getJobDetails = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  res.status(200).json({
    success: true,
    job,
  });
});
export const getJobsByCategory = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ jobCategory: req.params.category });
  res.status(200).json({
    success: true,
    jobs,
  });
});
export const getJobsByLocation = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ jobLocation: req.params.location });
  res.status(200).json({
    success: true,
    jobs,
  });
});
export const getJobsByType = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ jobType: req.params.type });
  res.status(200).json({
    success: true,
    jobs,
  });
});
export const getJobsBySearch = catchAsyncErrors(async (req, res, next) => {
  const { keyword } = req.query;
  if (!keyword) {
    return next(new ErrorHandler("Please enter a keyword!", 400));
  }
  const jobs = await Job.find({
    $or: [
      { jobTitle: { $regex: keyword, $options: "i" } },
      { jobLocation: { $regex: keyword, $options: "i" } },
      { jobCategory: { $regex: keyword, $options: "i" } },
      { jobType: { $regex: keyword, $options: "i" } },
    ],
  });
  res.status(200).json({
    success: true,
    jobs,
  });
});
export const applyJob = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  const isApplied = job.applicants.includes(req.user._id);
  if (isApplied) {
    return next(
      new ErrorHandler("You have already applied for this job!", 400)
    );
  }
  job.applicants.push(req.user._id);
  await job.save();
  res.status(200).json({
    success: true,
    message: "You have successfully applied for this job!",
  });
});

export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("Job not found!", 404));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler("Invalid Id / Cast Error !", 404));
  }
});

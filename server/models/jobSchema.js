import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Please provide company name!"],
    minLength: [3, "Company name must contain at least 3 characters!"],
    maxLength: [100, "Company name can not exceed 100 characters!"],
  },
  title: {
    type: String,
    required: [true, "Please provide job title!"],
    minLength: [3, "Job title must contain at least 3 characters!"],
    maxLength: [50, "Job title can not exceed 50 characters!"],
  },
  country: {
    type: String,
    required: [true, "Please provide job country!"],
    minLength: [3, "Job country must contain at least 3 characters!"],
    maxLength: [100, "Job country can not exceed 100 characters!"],
  },
  city: {
    type: String,
    required: [true, "Please provide job city!"],
    minLength: [3, "Job city must contain at least 3 characters!"],
    maxLength: [100, "Job city can not exceed 100 characters!"],
  },
  location: {
    type: String,
    required: [true, "Please provide job location!"],
    minLength: [3, "Job location must contain at least 3 characters!"],
    maxLength: [100, "Job location can not exceed 100 characters!"],
  },
  FixedSalary: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits!"],
    maxLength: [10, "Salary can not exceed 10 digits!"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits!"],
    maxLength: [10, "Salary can not exceed 10 digits!"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, "Salary must contain at least 4 digits!"],
    maxLength: [10, "Salary can not exceed 10 digits!"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobType: {
    type: String,
    required: [true, "Please provide job type!"],
    enum: ["Full Time", "Part Time", "Internship"],
  },
  jobCategory: {
    type: String,
    required: [true, "Please provide job category!"],
    enum: ["IT", "Marketing", "Finance", "HR", "Management", "Others"],
  },
  jobQualification: {
    type: String,
    minLength: [3, "Job responsibilities must contain at least 3 characters!"],
    maxLength: [1000, "Job responsibilities can not exceed 1000 characters!"],
  },
  jobExperience: {
    type: String,
    enum: ["Fresher", "1-2 years", "3-5 years", "6-10 years", "10+ years"],
  },
  jobSkills: {
    type: String,
    required: [true, "Please provide job skills!"],
    minLength: [3, "Job skills must contain at least 3 characters!"],
    maxLength: [300, "Job skills can not exceed 300 characters!"],
  },
  jobResponsibilities: {
    type: String,
    minLength: [3, "Job responsibilities must contain at least 3 characters!"],
    maxLength: [1000, "Job responsibilities can not exceed 1000 characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide job description!"],
    minLength: [3, "Job description must contain at least 3 characters!"],
    maxLength: [500, "Job description can not exceed 500 characters!"],
  },
});

export const Job = mongoose.model("Job", jobSchema);

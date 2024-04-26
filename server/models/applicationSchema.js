import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name!"],
    minLength: [3, "Name must contain at least 3 characters!"],
    maxLength: [50, "Name can not exceed 50 characters!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email!"],
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  coverLetter: {
    type: String,
    required: [true, "Please provide your cover letter!"],
  },
  phone: {
    type: Number,
    required: [true, "Please provide your phone number!"],
  },
  address: {
    type: String,
    required: [true, "Please provide your address!"],
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Student"],
    },
  },
  employerID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Admin"],
    },
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"], // Status of the application
    default: "Pending",
  },
  course: {
    type: String,
    required: [true, "Please provide your course!"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Application = mongoose.model("Application", applicationSchema);

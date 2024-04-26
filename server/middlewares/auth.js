import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import { User } from "../models/userSchema.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("You need to be logged in to access this resource. Please log in and try again", 401));
  }
  const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);
  next();
});

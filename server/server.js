import app from "./app.js";
import cloudinary from "cloudinary";
import Anthropic from "@anthropic-ai/sdk";

cloudinary.v2.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLIENT_NAME,
  api_key: process.env.VITE_CLOUDINARY_CLIENT_API,
  api_secret: process.env.VITE_CLOUDINARY_CLIENT_SECRETE,
});

// Create an Anthropic client instance



app.listen(process.env.VITE_PORT, () => {
  console.log(`Server is running on port ${process.env.VITE_PORT}`);
});

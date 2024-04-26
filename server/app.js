import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import jobRouter from "./routes/jobRouter.js";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import Anthropic from "@anthropic-ai/sdk";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: process.env.VITE_CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/user", userRouter);
app.use("/api/application", applicationRouter);
app.use("/api/job", jobRouter);

const anthropic = new Anthropic({
  apiKey:
    "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",
});
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Create a conversation with Claude
    const response = await anthropic.messages.create({
      max_tokens: 1024,
      messages: [{ role: "user", content: message }],
      model: "claude-3-opus-20240229",
    });

    res.json({ response: response.content });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
});

dbConnection();

app.use(errorMiddleware);

export default app;

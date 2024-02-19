import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import User from "./user.model.js";
import multer from "multer";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(
    "mongodb+srv://123shuklaayush:Ayush123@cluster0.swpcrdx.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});

app.use("/api/auth/signup", async (req, res, next) => {
  const { username, pan } = req.body;
  const newUser = new User({ username, pan });
  try {
    await newUser.save();
    res.status(201).json("new user created");
  } catch (err) {
    next(err);
  }
});

app.use("/api/auth/signout", (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("Sign out successfully");
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const errorHandler = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};


// To add file upload functionality to the backend
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


app.post("/api/auth/upload", upload.single('file'), (req, res, next) => {
  if (!req.file) {
    const error = errorHandler(400, "No file uploaded");
    return next(error);
  }

  const fileName = req.file.filename;
  
  res.status(200).json({ success: true, message: "File uploaded successfully", fileName });
});
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(
  cors({
    origin: ["https://ayush-assignment.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/employees", require("./routes/employee"));

app.get("/", (req, res) => {
  res.send("Hello world");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

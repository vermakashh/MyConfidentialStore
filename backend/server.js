require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const { restrictToLoggedinUserOnly } = require("./middlewares/auth");

const userRoute = require("./routes/user");
const orderRouter = require("./controller/orderHandler");
const profileRouter = require("./controller/profileHandler");

const PORT = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files serving
app.use(express.static(path.join(__dirname, "../"), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".js")) {
      res.setHeader("Content-Type", "application/javascript");
    }
  }
}));

// MongoDB Connection
connectToMongoDB();

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./backend/views"));

// Routes
app.use("/user", userRoute);
app.use("/api/orders", orderRouter);
app.use("/api/profile", restrictToLoggedinUserOnly, profileRouter);

// Pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.get("/profile", restrictToLoggedinUserOnly, (req, res) => {
  res.sendFile(path.join(__dirname, "../profile_user/profile.html"));
});

app.get("/bagpack", (req, res) => {
  res.sendFile(path.join(__dirname, "../Bagpack/bagpack.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "../Contact-Us/contact-index.html"));
});

app.get("/product/product-1", (req, res) => {
  res.sendFile(path.join(__dirname, "../Product/product-1.html"));
});

app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "../cart/cart.html"));
});

app.get("/billing", restrictToLoggedinUserOnly, (req, res) => {
  res.sendFile(path.join(__dirname, "../billing/billing.html"));
});

app.get("/login", (req, res) => {
  res.render("index");
});

app.get("/forgot", (req, res) => {
  res.render("forgot");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/js/login.js", (req, res) => {
  res.type("application/javascript");
  res.sendFile(path.join(__dirname, "../Backend/views/index.ejs"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}/`);
});

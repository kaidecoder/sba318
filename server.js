const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const foodRoutes = require("./routes/food")
const housingRoutes = require("./routes/housing")
const jobRoutes = require("./routes/job")


const mongoose = require("mongoose");
// mongoose.set("strictQuery", false)

const app = express();
const port = process.env.PORT || 3000;

// const foodRoute = require("./routes/food");

//view engine
app.set("view engine", "ejs");

app.use(morgan("dev"));
// app.use(express.json())
// app.use(express.urlencoded( {extended: true}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("./styles"));
app.use(express.static("./images"));

//Cors error handling
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//redirects to the food page
app.get("/", (req, res) => {
  res.redirect("/food");
});

app.get("/blogs/download-file", (req, res) => {
  res.download("./images/sad-face.jpeg");
  })



app.use(foodRoutes)
app.use(housingRoutes)
app.use(jobRoutes)

app.use((req, res, next) => {
  const error = new Error("Not found");
  //error.status is correct
  error.status = 404;
  //forward the request and attach the error msg
  res.render("404");
  next(error);
});

//this handles all kinds of errors, not just 404
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

//The database
const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    app.listen(port, () => {
      console.log(`Listening for requests on port ${port}, DB started `);
    });
  } catch (error) {
    console.log(error.message);
  }
};
start();

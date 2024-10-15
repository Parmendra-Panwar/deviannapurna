if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js")
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")
const flash = require("connect-flash");
const passport = require("passport");
const mongoose = require("mongoose");
mongoose.set('debug', true);

connectDB();

const pagesRoutes = require("./routes/pages.js")
const adminRoutes = require("./routes/admin.js")

const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 60 * 60,
})
store.on("error", () => {
  console.log("Error in MONGO session store", err);
})

//SessionOptions
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 60 * 60 * 1000,
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
  }
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
const port = 8080;
app.use(cookieParser("secretcode"));
app.use(session(sessionOptions));
app.use(flash({ session: session }));

//A&A
app.use(passport.initialize());
app.use(passport.session());


//Flash
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use("/", pagesRoutes);
app.use("/", adminRoutes);


app.get("/", (req, res) => {
  res.render("./landing.ejs")
})

//rendom
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

//errorhandling
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Somthing went Wrong" } = err;
  res.status(statusCode).render("error.ejs", { err });
  //res.status(statusCode).send(message);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
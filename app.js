const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
const port = 8080;

app.get("/", (req, res) => {
  res.render("./landing.ejs")
})
app.get("/contact", (req, res) => {
  res.render("./contact.ejs")
})
app.get("/explore", (req, res) => {
  res.render("./explore.ejs")
})
app.get("/aboutus", (req, res) => {
  res.render("./aboutus.ejs")
})
app.get("/admission", (req, res) => {
  res.render("./admission.ejs")
})
app.get("/policies", (req, res) => {
  res.render("./policies.ejs")
})
app.get("/faqs", (req, res) => {
  res.render("./faqs.ejs")
})
app.get("/upcoming", (req, res) => {
  res.render("./upcoming.ejs")
})
app.get("/project", (req, res) => {
  res.render("./project.ejs")
})
app.get("/fees", (req, res) => {
  res.render("./fees.ejs")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
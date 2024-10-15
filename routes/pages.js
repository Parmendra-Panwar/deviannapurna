const express = require("express");
const router = express.Router();
// const wrapAsync = require("../utils/wrapAsync.js");

router.get("/explore", (req, res) => {
  res.render("./explore.ejs")
})
router.get("/aboutus", (req, res) => {
  res.render("./aboutus.ejs")
})
router.get("/admission", (req, res) => {
  res.render("./admission.ejs")
})
router.get("/policies", (req, res) => {
  res.render("./policies.ejs")
})
router.get("/faqs", (req, res) => {
  res.render("./faqs.ejs")
})
router.get("/upcoming", (req, res) => {
  res.render("./upcoming.ejs")
})
router.get("/project", (req, res) => {
  res.render("./project.ejs")
})
router.get("/fees", (req, res) => {
  res.render("./fees.ejs")
})
router.get("/contact", (req, res) => {
  res.render("./contact.ejs")
})

module.exports = router;
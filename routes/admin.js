const express = require("express");
const router = express.Router();
const authController = require("../controller/authController.js")
const athen = require("../Validator/isAthen.js")

router.get("/adminDash", athen.isloggedIn, (req, res) => {
  res.render("adminDash.ejs")
})

router.get("/admin/signin", (req, res) => {
  res.render("./adminlogin.ejs")
})

router.post("/sendVerification", authController.sendVerification)

router.get("/verify", (req, res) => {
  res.render("./verify.ejs")
})
router.post("/verify", authController.verifyCode)

module.exports = router;


// router.get("/adminlogin", (req, res) => {
//   res.render("./adminlogin.ejs")
// })
// router.post("/admin/login", (req, res) => {
//   res.render("./adminDash.ejs")
// })
// router.post('/adminlogout', (req, res) => {
//   res.redirect('./adminlogin')
// });
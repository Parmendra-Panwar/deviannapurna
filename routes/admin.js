const express = require("express");
const router = express.Router();
const authController = require("../controller/authController.js")
const athen = require("../Validator/isAthen.js")
const Student = require("../models/students.js")
router.get("/adminDash", athen.isloggedIn, (req, res) => {
  res.render("./admin/adminDash.ejs")
})

router.get("/admin/signin", (req, res) => {
  res.render("./admin/adminlogin.ejs")
})

router.post("/sendVerification", authController.sendVerification)

router.get("/verify", (req, res) => {
  res.render("./verify.ejs")
})
router.post("/verify", authController.verifyCode)
router.post("/logout", athen.isloggedIn, (req, res) => {
  req.session.isAthen = false;
  res.redirect("/");
})

//Student
router.get("/addStu", (req, res) => {
  res.render("./admin/addStu.ejs")
})
// POST route to add a new student
router.post('/addStudent', async (req, res) => {
  try {
    // Extract data from the request body
    const { nam, cls, aadhar, samagra, mobile, email, father, mother, address, dob, gender, caste, fees } = req.body;

    // Create a new student document
    const newStudent = new Student({
      nam,
      cls,
      aadhar,
      samagra,
      mobile,
      email,
      father,
      mother,
      address,
      dob,
      gender,
      caste,
      fees
    });

    // Save the student document to the database
    await newStudent.save();
    res.redirect("/addStu")
  } catch (error) {
    console.error('Error while saving student:', error);
    chacked = 500;
    // Send appropriate error response based on the error type
    if (error.name === 'ValidationError') {
      return res.redirect("/addStu")
    } else {
      return res.redirect("/addStu")
    }
  }
});

router.get("/students", (req, res) => {
  Student.find().then((students) => {
    res.render("./admin/students.ejs", { students: students })
  })
})

//edit
router.get('/edit-student/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render('edit-student', { student });
});

router.post('/edit-student/:id', async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/students');
});

//delete
router.post('/delete-student/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect('/students');
});


module.exports = router;
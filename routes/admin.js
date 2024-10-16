const express = require("express");
const router = express.Router();
const authController = require("../controller/authController.js")
const athen = require("../Validator/isAthen.js")
const Student = require("../models/students.js")
const moment = require('moment');
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

function calculateAge(dob) {
  const dobParts = dob.split("-");
  const year = parseInt(dobParts[0], 10);
  const month = parseInt(dobParts[1], 10) - 1;
  const day = parseInt(dobParts[2], 10);

  const dobDate = new Date(year, month, day);
  const today = new Date();

  let age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();
  const dayDiff = today.getDate() - dobDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}

router.post('/addStudent', async (req, res) => {
  try {
    // Extract data from the request body
    const { nam, cls, aadhar, samagra, mobile, email, father, mother, address, dob, gender, caste, fees } = req.body;
    const age = calculateAge(dob);
    // console.log(age);
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
      fees,
      age,
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
router.get('/edit/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render('./admin/edtStu.ejs', { student });
});

router.put('/edit-student/:id', async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/students');
});

//delete
router.delete('/delete/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect('/students');
});


module.exports = router;
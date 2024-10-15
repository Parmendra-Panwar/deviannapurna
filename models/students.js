const mongoose = require("mongoose");
const { Schema } = mongoose;

const stu = new Schema({
  nam: {
    type: String,
    required: true
  },
  cls: {
    type: String,
    required: true
  },
  aadhar: {
    type: Number,
  },
  samagra: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  email: {
    type: String
  },
  father: {
    type: String,
  },
  mother: {
    type: String,
  },
  address: {
    type: String,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
  },
  caste: {
    type: String,
  },
  fees: {
    type: Number,
  }
});


const Student = mongoose.model("Student", stu);

module.exports = Student;
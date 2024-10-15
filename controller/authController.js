const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Utility function to send emails
const sendVerificationEmail = (email, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'parmendrapanwar11@gmail.com',
      pass: 'pmds zckn ktic ocat' // Use your generated app password
    }
  });

  const mailOptions = {
    from: 'parmendrapanwar11@gmail.com',
    to: email,
    subject: 'Schoollogin Verification Code: ',
    text: `Your verification code is: ${verificationCode}`
  };

  return transporter.sendMail(mailOptions);
};

module.exports.sendVerification = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      req.session.isAthen = false;
      req.flash('error', 'Please fill in all fields');
      return res.redirect("/admin/signin");
    } else {
      if (email === "panwparmendra7@gmail.com") {
        const verificationCode = crypto.randomInt(100000, 999999); // 6-digit code
        req.session.verificationCode = verificationCode;
        await sendVerificationEmail(email, verificationCode);
        req.flash('success', 'Verification code sent successfully');
        res.redirect("/verify");
      } else {
        req.flash('error', 'Invalid email');
        req.session.isAthen = false;
        res.redirect("/");
      }
    }
  } catch (error) {
    req.flash('error', 'An error occurred');
    res.redirect("/admin/signin");
  }
};

// POST route to verify the code
module.exports.verifyCode = async (req, res) => {
  const { verify } = req.body;

  if (verify === String(req.session.verificationCode)) {
    try {
      req.flash('success', 'Verification code is correct');
      req.session.isAthen = true;
      res.render("./adminDash.ejs")
    } catch (error) {
      req.flash('error', 'An error occurred');
      res.redirect("/admin/signin");
    }
  } else {
    req.flash('error', 'Invalid verification code');
    res.redirect("/admin/signin");
  }
};











// const nodemailer = require("nodemailer");
// const crypto = require("crypto");

// // Utility function to send emails
// const sendVerificationEmail = (email, verificationCode) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'parmendrapanwar11@gmail.com',
//       pass: 'pmds zckn ktic ocat' // Use your generated app password
//     }
//   });

//   const mailOptions = {
//     from: 'parmendrapanwar11@gmail.com',
//     to: email,
//     subject: 'Schoollogin Verification Code: ',
//     text: `Your verification code is: ${verificationCode}`
//   };

//   return transporter.sendMail(mailOptions);
// };

// module.exports.sendVerification = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//       //
//       return res.redirect("/admin/signin");
//     } else {
//       if (email === "panwparmendra7@gmail.com") {
//         const verificationCode = crypto.randomInt(100000, 999999); // 6-digit code
//         req.session.verificationCode = verificationCode;
//         await sendVerificationEmail(email, verificationCode);

//         //
//         res.redirect("/verify");
//       } else {
//         //
//         res.redirect("/");
//       }
//     }
//   } catch (error) {
//     //
//     res.redirect("/admin/signin");
//   }
// };

// // POST route to verify the code
// module.exports.verifyCode = async (req, res) => {
//   const { verify } = req.body;

//   if (verify === String(req.session.verificationCode)) {
//     //
//     try {
//       //
//       res.render("./adminDash.ejs")
//     } catch (error) {
//       //
//       res.redirect("/admin/signin");
//     }
//   } else {
//     //
//     res.redirect("/admin/signin");
//   }
// };

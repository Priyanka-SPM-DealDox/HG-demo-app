const Admin = require('../models/adminModel');
const People = require('../models/peopleModel');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');



const sgMail = require('@sendgrid/mail');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}



// signup a user
const signupUser = async (req, res) => {
  const adminEmail = req.body.email;
 console.log("AdminEmail : "+adminEmail);
  const { firstname, lastname, password, company, job_title, email, no_of_emp, phone_num, country } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const adminData = await Admin.create({ firstname, lastname, password: hash, company, job_title, email, no_of_emp, phone_num, country });

    // create a token
    const token = createToken(adminData._id);

    if (adminData) {
      // await sendmail(adminEmail);
      res.status(201).json({ status: "Success", message: "Successfully Registered!" });
    } else {
      res.status(400).json({ status: "Failed", message: "Failed to Register!" });
    }
  } catch (error) {
    res.status(400).json({ status: "Failed", message: error.message });
  }
};


//login for user and people
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(200).json({ status: "Failed", message: "All Fields must be filled!" });
      return; // Make sure to return after sending the response to avoid further execution
    }

    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      const people = await People.findOne({ email: email });

      if (!people) {
        res.status(200).json({ status: "Failed", message: "Incorrect email" });
        return; // Make sure to return after sending the response
      }else{
        const match = await bcrypt.compare(password, people.password);

        if (!match) {
          res.status(200).json({ status: "Failed", message: "Incorrect Password" });
        } else {
          // create a token
          const token = createToken(people._id);
          res.status(200).json({ status: "Success", message: "Successfully Loggedin!", email, token, people });
        }
      }
    }

    if (admin) {
      const match = await bcrypt.compare(password, admin.password);

      if (!match) {
        res.status(200).json({ status: "Failed", message: "Incorrect Password" });
      } else {
        // create a token
        const token = createToken(admin._id);
        res.status(200).json({ status: "Success", message: "Successfully Loggedin!", email, token, admin });
      }
    }

  } catch (error) {
    console.log(error);
    res.status(200).json({ status: "Failed", message: "Please try after sometime! " });
  }
};



//API to Scan Authenticator APP
const generatedSecrets = {}; // Store generated secrets for users
const generateQrcode = async (req, res) => {
  const userId = req.query.userId; // You need to pass the user's unique identifier here
  console.log(userId);
  if (!generatedSecrets[userId]) {
    generatedSecrets[userId] = speakeasy.generateSecret({
      name: 'DEALDOX',
    });
  }

  const secret = generatedSecrets[userId];
  qrcode.toDataURL(secret.otpauth_url, function (error, data) {
    res.json({ data, secret });
  });
};

//API to verify the OTP
const validate = async (req, res) => {
  const userId = req.query.userId;
  const { otp, secret } = req.body;
  console.log(req.body);
  var verified = speakeasy.totp.verify({
    secret: secret,
    encoding: 'ascii',
    token: otp
  });

  console.log(verified);
  if (verified) {
    res.json({ message: 'OTP validated successfully and secret updated' });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }

};
// forgot Password
const forgotPassword = async (req, res) => {

  const { email } = req.body;
  console.log(email);
  try {
    const forgot = await Admin.findOne({
      email: email,
    });
    if (forgot) {
      await sendmail(email);
      res.status(200).json({ status: "success", message: "mail Sent", email });
    } else {
      res.status(400).json({ status: "Failed", message: "failed" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const passwordreset = async (req, res) => {
  const { email, password } = req.body;
  console.log("email-----", email);
  console.log("password------------", password);

  try {
    if (!email || !password) {
      res.status(400).json({ status: "Failed", message: "All fields must be filled!" });
      return;
    }

    const admin = await Admin.findOne({ email: email });

    if (admin) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      // Update the password in the database
      await Admin.findOneAndUpdate({ email: email }, { $set: { password: hash} });
      res.status(200).json({ status: "Success", message: "Password updated successfully." });
    } else {
      res.status(404).json({ status: "Failed", message: "Admin not found." });
    }
  } catch (error) {
    console.error("Error in passwordreset:", error);
    res.status(500).json({ status: "Failed", message: "Internal Server Error" });
  }
};


const sendmail = async (email) => {

  API_KEY =
  "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";
  sgMail.setApiKey(API_KEY);

  const encodedEmail = encodeURIComponent(email);

  const message = {

    to: email,
    from: process.env.EMAIL,
    subject: 'Registration Confirm Page',
    text: 'Reset Your Password',
    html: `<h1>Reset Your Password'</h1>
    <p>Reset Your Password. By Using Below Link </p>
    <button style = "background-color: #216c98; width: 500px; height: 50px;"><a href="http://localhost:3000/resetpassword?email=${encodedEmail}" style = "text-decoration: none;">Reset Password</a></button> <br>.`
};

sgMail.send(message)
.then(() => {
  console.log('Email sent');
})
.catch((error) => {
  console.log(error);
});
};

module.exports = { signupUser, loginUser, generateQrcode, validate ,forgotPassword, passwordreset}


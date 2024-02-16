const People = require('../models/peopleModel');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');

API_KEY = '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';

sgMail.setApiKey(API_KEY);



const addPeople = async (req, res) => {
  
  let admin_id, people_id;

  if (req.user.admin_id) {
    // If req.user.admin_id is not empty
    admin_id = req.user.admin_id;
    people_id = req.user._id;
  } else {
    // If req.user.admin_id is empty
    admin_id = req.user._id;
    people_id = null;
  }
  const data = req.body;
  console.log(req.body);

  try {
    // Check if the email already exists in the database
    const existingPerson = await People.findOne({ email: data.email });

    if (existingPerson) {
      // If email exists, send a message saying email already exists
      return res.status(400).json({ status: "Failed", message: "Email already exists" });
      
    }

    const catalogRoles = data.catalog_role.map(role => role.value);

    // Add catalog_role as an array of strings to the data object
    const newData = { ...data, catalog_role: catalogRoles };

    // If email doesn't exist, create a new record
    const people = await People.create({ admin_id, ...newData });

    console.log("People Response" + people);
    if (people) {
      res.status(200).json({
        status: "success",
        name: `${data.first_name} ${data.last_name}`,
        email: `${data.email}`
      });
    } else {
      res.status(400).json({ status: "Failed", message: "Failed to create record" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const getPeople = async (req, res) => {
  let admin_id, people_id;

  if (req.user.admin_id) {
    // If req.user.admin_id is not empty
    admin_id = req.user.admin_id;
    people_id = req.user._id;
  } else {
    // If req.user.admin_id is empty
    admin_id = req.user._id;
    people_id = null;
  }
  try {
    const people = await People.find({
      admin_id: admin_id,
    });
    console.log(people);

    if (people) { // Check if there's data in the array
      res.status(200).json({ status: "success", data: people });
    } else {
      res.status(200).json({ status: "No data found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addPeopleByemail = async (req, res) => {
  // const user_id = req.user._id;
  const peopleId = req.params.id;
  console.log(peopleId);

  try {
    // const email = String(req.params.email);
    // const securityRole = String(req.query.securityRole);
    const people = await People.findOne(
      {
        _id: peopleId,
      },
    );
    if (people) {

      people.set(req.body);
      // await sendmail(securityRole, user_id);
      await people.save();
      res.status(200).json({ status: "success", data: people });
    } else {
      res.status(200).json({ status: "Not Found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};





module.exports = { addPeople, getPeople, addPeopleByemail }
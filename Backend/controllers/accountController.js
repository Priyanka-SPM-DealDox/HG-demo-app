// const db = require("../models");
const admin = require("../models/adminModel");
const Accounts = require("../models/accountsModel");
const Opportunities = require('../models/opportunityModel');
const Quotes = require("../models/quotesModel");

// add a account
const addAccount = async (req, res) => {

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

  const {
    accounts,
    owner,
    parent_account,
    description,
    region,
    industry,
    vertical,
    type,
    billing_street1,
    billing_street2,
    billing_city,
    billing_state,
    billing_zip,
    billing_country,
    billing_phone,
    shipping_street1,
    shipping_street2,
    shipping_city,
    shipping_state,
    shipping_zip,
    shipping_country,
    shipping_phone,
  } = req.body;
  try {
    // Check if an account with the same name already exists
    const existingAccount = await Accounts.findOne({ admin_id, accounts });

    if (existingAccount) {
      return res
        .status(400)
        .json({
          Error: "DuplicateAccount",
          message: "Account with the same name already exists",
        });
    }

    const accounts_data = await Accounts.create({
      admin_id,
      accounts,
      owner,
      parent_account,
      description,
      region,
      industry,
      vertical,
      type,
      billing_street1,
      billing_street2,
      billing_city,
      billing_state,
      billing_zip,
      billing_country,
      billing_phone,
      shipping_street1,
      shipping_street2,
      shipping_city,
      shipping_state,
      shipping_zip,
      shipping_country,
      shipping_phone,
    });

    if (accounts_data) {
      res.status(200).json({ success: "Success" });
    } else {
      res.status(200).json({ error: "Failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed" });
  }
};

const getAccount = async (req, res) => {

  let admin_id;

if (req.user.admin_id) {
  // If req.user.admin_id is not empty
  admin_id = req.user.admin_id;
} else {
  // If req.user.admin_id is empty
  admin_id = req.user._id;
}

  try {
    
    const accounts_data = await Accounts.find({
      admin_id: admin_id,
    });

    if (!accounts_data) {
      res.status(200).json({ status: "Failed", message: "Account Data Not Found" });
    } else {
      res.status(200).json({ data: accounts_data });
    }
  } catch (error) {
    res.status(200).json({ error: "Failed" });
  }
};

const updateAccount = async (req, res) => {
  
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

  const accountId = req.params.accountId;
  console.log(accountId);

  const {
    accounts,
    owner,
    parent_account,
    description,
    region,
    industry,
    vertical,
    type,
    billing_street1,
    billing_street2,
    billing_city,
    billing_state,
    billing_zip,
    billing_country,
    billing_phone,
    shipping_street1,
    shipping_street2,
    shipping_city,
    shipping_state,
    shipping_zip,
    shipping_country,
    shipping_phone,
  } = req.body;

  try {
    const updateAccount = await Accounts.updateOne(
      {
        admin_id: admin_id,
        _id: accountId,
      },
      {
        $set: {
          accounts,
          owner,
          parent_account,
          description,
          region,
          industry,
          vertical,
          type,
          billing_street1,
          billing_street2,
          billing_city,
          billing_state,
          billing_zip,
          billing_country,
          billing_phone,
          shipping_street1,
          shipping_street2,
          shipping_city,
          shipping_state,
          shipping_zip,
          shipping_country,
          shipping_phone,
          modifiedAt: new Date(),
        },
      }
    );

    if (updateAccount) {
      res.status(200).json({ status: "Success", message: "Account Updated" });
    } else {
      res.status(500).json({ status: "Error", message: "Account" });
    }
  } catch (error) {
    console.error("Error updating Account:", error);
    res.status(500).json({ error: "Failed to Update Account" });
  }
};

const deleteAccount = async (req, res) => {
  
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


  const accountId = req.params.accountId;
  console.log("delete:", accountId);

  try {
    const deleteAccount = await Accounts.deleteOne({
      admin_id: admin_id,
      _id: accountId,
    });

    if (deleteAccount){
        const oppDelete = await Opportunities.deleteOne({
          admin_id: admin_id,
          account_Id: accountId
        });
        if(oppDelete){
          const deleteQuote = await Quotes.deleteOne({
            account_Id: accountId
          });
          console.log(deleteQuote);
        }
      res.status(200).json({ status: "Success", message: "Account Deleted" });
    } else {
      res.status(500).json({ status: "Error", message: "Account Not Found" });
    }
  } catch (error) {
    console.error("Error deleting Account:", error);
    res.status(500).json({ error: "Failed to Delete Account" });
  }
};



module.exports = { addAccount, getAccount, updateAccount, deleteAccount };

// const db = require("../models");
const Opportunities = require('../models/opportunityModel');


// add a account
const addOpportunity = async (req, res) => {

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

  const {account_Id,opportunity_name, net_price, margin, cost, stage, probability, hours, close, start, duration_weeks, owner, region, vertical, practice, currency, org, opportunity_type, account_key  } = req.body;
  console.log("OPPORUNITY:"+req.body);
  try {

    const existingOpportunity = await Opportunities.findOne({admin_id, opportunity_name, account_Id });
    if(existingOpportunity){
      return res.status(400).json({message: "Opportunity with the same name already exists"})
    }

    const opportunity_data = await Opportunities.create({admin_id, account_Id, opportunity_name, net_price, margin, cost, stage, probability, hours, close, start, duration_weeks, owner, region, vertical, practice, currency, org, opportunity_type });

    if (opportunity_data) {
      res.status(200).json({ success: "Success" });
    } else {
      res.status(200).json({ error: "Failed" });
    }
  } catch (error) {
    res.status(200).json({ error: "Failed" });
  }
}

const getOpportunity = async (req, res) => {

  let admin_id;

  if (req.user.admin_id) {
    // If req.user.admin_id is not empty
    admin_id = req.user.admin_id;
  } else {
    // If req.user.admin_id is empty
    admin_id = req.user._id;
  }

  const account_id = req.body.account_Id;
  console.log("===================================================");
  console.log(account_id);
  try {
    const opportunity_data = await Opportunities.find(
       {
        admin_id: admin_id, 
        account_Id: account_id,
      }
     );


    console.log(opportunity_data);
    console.log("===================================================");

    if (!opportunity_data) {
      res.status(200).json({ status: "Failed", message: "Opportunity Data Not Found" });
    } else {
      res.status(200).json({ data: opportunity_data });
    }
  } catch (error) {
    res.status(401).json({ error: "Failed" });
  }
};


const updateOpportunity = async (req, res) => {

  // const admin_id = req.user._id;
  const opportunity_id = req.params.id;
  console.log(opportunity_id)

  const { opportunity_name, net_price, margin, stage,cost, probability, hours, close, start, duration_weeks, owner, region, vertical,  practice, currency, org, opportunity_type } = req.body;
  console.log(req.body);
  try {
    const updateOpportunity = await Opportunities.updateOne(
      {
        _id: opportunity_id,
        // user_id: user_id,
      },
      {
        $set:
      { opportunity_name, net_price, margin, stage,cost, probability, hours, close, start, duration_weeks, owner, region, vertical,  practice, currency, org, opportunity_type,modifiedAt: new Date(), },
      }
    );

    if (updateOpportunity) {
      res.status(200).json({ status: "Success", message: "Opportunity Updated" });
    } else {
      res.status(500).json({ status: "Error", message: "Opportunity Not Found" });
    }
  } catch (error) {
    console.error("Error updating opportunity:", error);
    res.status(500).json({ error: "Failed to Update Opportunity" });
  }
};

const deleteOpportunity = async (req, res) => {
  // const user_id = req.user._id;
  const opportunity_id = req.params.id;

  try {
    const deleteOpportunity = await Opportunities.deleteOne({
        _id: opportunity_id,
        // user_id: user_id,  
    },
    );

    if (deleteOpportunity) {
      res.status(200).json({ status: "Success", message: "Opportunity Deleted" });
    } else {
      res.status(500).json({ status: "Error", message: "Opportunity Not Found" });
    }
  } catch (error) {
    console.error("Error deleting opportunity:", error);
    res.status(500).json({ error: "Failed to Delete Opportunity" });
  }
};
const getSpecificOpportunity = async (req, res) => {
  const admin_id = req.user._id;
  const opp_id = req.body.opp_id;
  console.log("===================================================");
  console.log(opp_id);
  try {
    const opportunity_data = await Opportunities.find(
       {
        admin_id: admin_id, 
        _id: opp_id,
      }
     )
     


    console.log(opportunity_data);
    console.log("===================================================");

    if (!opportunity_data) {
      
      res.status(200).json({ status: "Failed", message: "Opportunity Data Not Found" });
    } else {
      res.status(200).json({ data: opportunity_data });
    }
  } catch (error) {
    res.status(401).json({ error: "Failed" });
  }
};




module.exports = { addOpportunity, getOpportunity, updateOpportunity, deleteOpportunity,getSpecificOpportunity }


const Company = require('../models/companyModel')
// Serve static files from the "Images" directory

// add company profile

const addCompany = async (req, res) =>{

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

const {companyLogo,companyName,searchValue,userAuthorizationDomain,companyDomain,contactPersonFirstName,contactPersonLastName,phone,email,street,city,state,country}= req.body;
console.log("@#%%%");
console.log(req.body);
try{
  const comp_data = await Company.create({admin_id, companyLogo,companyName,searchValue,userAuthorizationDomain,companyDomain,contactPersonFirstName,contactPersonLastName,phone,email,street,city,state,country});
  if (comp_data){
    res.status(200).json({success:"Success"})
  }else{
    res.status(200).json({error:"failed"})
  }
}catch(error){
  res.status(200).json({error:"failed"})
}
}



const getCompany = async (req, res) => {
  
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
    const comp_data = await Company.find({
      admin_id: admin_id,
    });

    if (!comp_data) {
      res.status(200).json({ status: "Failed", message: "Account Data Not Found" });
    } else {
      res.status(200).json({ data: comp_data });
    }
  } catch (error) {
    res.status(200).json({ error: "Failed" });
  }
};

// update company
const updateCompany = async (req, res) => {
  // const user_id = req.user._id;
  const companyId = req.params.companyId;
  console.log(companyId);

  const {companyLogo,companyName,searchValue,userAuthorizationDomain,companyDomain,contactPersonFirstName,contactPersonLastName,phone,email,street,city,state,country} = req.body;

  try {
    const updateCompany = await Company.updateOne(
      {
        // user_id: user_id,
        _id: companyId,
    },
    {
      $set:
      {companyLogo,companyName,searchValue,userAuthorizationDomain,companyDomain,contactPersonFirstName,contactPersonLastName,phone,email,street,city,state,country},
    }
    );

    if(updateCompany){
      res.status(200).json({status: "Success", message: "Account Updated"});
    }else {
      res.status(500).json({ status: "Error", message: "Account" });
    }
  }catch (error) {
    console.error("Error updating Account:", error);
    res.status(500).json({ error: "Failed to Update Account" });
  }
};



module.exports = {addCompany,getCompany,updateCompany}
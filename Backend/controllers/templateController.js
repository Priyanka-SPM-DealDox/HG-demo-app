const Template = require("../models/templateModel");
const Admin = require("../models/adminModel");

// add Template
const addTemplate = async (req, res) => {

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

  const { quote_name, doc_tempData } = req.body;
  console.log("@#%%%");
  console.log("quote", quote_name);
  console.log("temp", doc_tempData);
  try {
    const existingTemplate = await Template.findOne({ admin_id, quote_name });

    if (existingTemplate) {
      return res.status(400).json({
        error: "duplicateTemplate",
        message: "Template with the same name already exists",
      });
    }
    const temp_data = await Template.create({
      admin_id,
      quote_name,
      doc_tempData,
    });
    if (temp_data) {
      res.status(200).json({ success: "Success" });
    } else {
      res.status(200).json({ error: "failed" });
    }
  } catch (error) {
    res.status(200).json({ error: "failed" });
  }
};
// get template

const getTemplate = async (req, res) => {

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
    const temp_data = await Template.find({
      admin_id: admin_id,
    });
    console.log(temp_data);
    if (!temp_data) {
      res
        .status(200)
        .json({ status: "Failed", message: "Template Data Not Found" });
    } else {
      res.status(200).json({ data: temp_data });
    }
  } catch (error) {
    res.status(200).json({ error: "Failed" });
  }
};

// update template
const updateTemplate = async (req, res) => {
  // const user_id = req.user._id;
  const templateId = req.params.templateId;
  console.log(templateId);

  const { quote_name, doc_tempData } = req.body;

  try {
    const updatedData = {
      quote_name: quote_name,
      doc_tempData: doc_tempData,
    };
    const updateTemplate = await Template.updateOne(
      {
        _id: templateId,
      },
      {
        $set: updatedData,
      }
    );

    if (updateTemplate) {
      res.status(200).json({ status: "Success", message: "Template Updated" });
    } else {
      res.status(500).json({ status: "Error", message: "Template" });
    }
  } catch (error) {
    console.error("Error updating Template:", error);
    res.status(500).json({ error: "Failed to Update Template" });
  }
};

const deleteTemplate = async (req, res) => {

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

  const templateId = req.params.templateId;
  console.log("delete:", templateId);

  try {
    const deleteTemplate = await Template.deleteOne({
      admin_id: admin_id,
      _id: templateId,
    });

    if (deleteTemplate) {
      res.status(200).json({ status: "Success", message: "Template Deleted" });
    } else {
      res.status(500).json({ status: "Error", message: "Template Not Found" });
    }
  } catch (error) {
    console.error("Error deleting template:", error);
    res.status(500).json({ error: "Failed to Delete Template" });
  }
};



//Controller for GuidedSelling Page
const getTemplateforGs = async (req, res) => {
  const quoteNames = req.body.quote_name;

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
    const temp_data = await Template.find({
      admin_id: admin_id,
      quote_name: { $in: quoteNames },
    });
    
    console.log(temp_data);

    if (temp_data.length === 0) {
      res.status(201).json({ status: "Failed", message: " Data Not Found" });
    } else {
      res.status(200).json({ data: temp_data });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed" });
  }
};

module.exports = {
  addTemplate,
  getTemplate,
  updateTemplate,
  deleteTemplate,
  getTemplateforGs,
};

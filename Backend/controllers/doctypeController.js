const expressAsyncHandler = require("express-async-handler");
const Doctype = require("../models/doctypeModel");
const fs = require("fs");
const path = require("path");

const getDoctypes = async (req, res) => {

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
    console.log("hi get");
    const doctype = await Doctype.find({
      admin_id: admin_id,
    });
    if (doctype) {
      console.log(doctype);
      res.status(200).json({ status: "success", data: doctype });
    } else {
      res.status(204).json({ status: "Failed" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addDoctype = expressAsyncHandler(async (req, res, next) => {

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

  const {doc_name} = req.body;
  try {
    const existingDocType = await Doctype.findOne({ admin_id, doc_name });

    if (existingDocType) {
      return res.status(400).json({
        error: "DuplicateDoctype",
        message: "Doctype with the same name already exists",
      });
    }
    console.log("hello");
    const doctypeData = await req.body;
    console.log(req.body);
    const doctype = await Doctype.create({ admin_id, ...doctypeData });

    if (doctype) {
      res.status(200).json({
        status: "success",
        message: "doctype added successfully",
        data: doctype,
      });
    } else {
      res.status(400).json({ status: "Failed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const deleteDoctypeById = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  //const transaction = await db.sequelize.transaction();
  try {
    const doctype = await Doctype.findById(id);
    console.log("doctype val: ", doctype);
    if (doctype) {
      await Doctype.findByIdAndDelete(id);
      deletePublicFile(doctype);
      res
        .status(200)
        .json({ status: "success", message: "data deleted successfully" });
    } else {
      res.status(202).json({ status: "Not Found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const deletOneSectionById = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const transaction = await db.sequelize.transaction();
  try {
    await Section.destroy({ where: { section_id: id }, transaction });
    await transaction.commit();
    res
      .status(200)
      .json({ status: "success", message: "data deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: message });
  }
});

const updateDoctypeById = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const doctype = req.body;


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
    const doctypeData = await Doctype.findOne({ _id: id });

    if (doctypeData) {
      // Update properties directly
      doctypeData.template_file = doctype.template_file || null;
      doctypeData.watermark_file = doctype.watermark_file || null;

      // Update other properties from req.body as needed
      doctypeData.someProperty = doctype.someProperty;

      // Save the changes
      doctypeData.set(doctype);
      await doctypeData.save();

      res.status(200).json({
        status: "success",
        message: "data updated successfully",
        data: doctypeData,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const deletePublicFile = (doctype) => {
  const template_file = doctype.template_file;
  const watermark_file = doctype.watermark_file;
  console.log(watermark_file, template_file);
  const filePaths = [
    `../Backend/public/files/${template_file}`,
    `../Backend/public/files/${watermark_file}`,
  ];
  filePaths.forEach((filePath) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully");
      }
    });
  });
  return doctype;
};

module.exports = {
  getDoctypes,
  addDoctype,
  deleteDoctypeById,
  deletOneSectionById,
  updateDoctypeById,
};

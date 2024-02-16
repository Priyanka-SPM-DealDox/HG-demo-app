
// const User = require('../models/userModel');
const Content = require('../models/contentModel');

// add a content
const addContent = async (req, res) => {

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

  const { content_name, sales_org, catalog_number, catalog_category, locked, content } = req.body;
  try {
  // Check if an account with the same name already exists
  const existingContent = await Content.findOne({ admin_id, content_name });

  if (existingContent) {
    return res
      .status(400)
      .json({
        Error: "DuplicateContent",
        message: "content with the same name already exists",
      });
  }
    const Contents_data = await Content.create({admin_id, content_name, sales_org, catalog_number, catalog_category, locked, content });

    if (Contents_data) {
      res.status(200).json({ success: "Success" })
    } else {
      res.status(200).json({ error: "Failed" })
    }
  } catch (error) {
    res.status(200).json({ error: "Failed" })
  }
}

const getContent = async (req, res) => {

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
    const contents_data = await Content.find({
      admin_id: admin_id,
    });
    
    if (!contents_data) {
      res.status(200).json({ status: "Failed", message: "Content Data Not Found" });
    } else {
      res.status(200).json({ data: contents_data });
    }
  } catch (error) {
    res.status(200).json({ error: "Failed" });
  }
};

const updateContent = async (req, res) => {
  // const user_id = req.user._id;
  const contentId = req.params.contentId;
  console.log(contentId);
  const { content_name, sales_org, catalog_number, catalog_category, locked, content } = req.body;

  try {
    const updateContent = await Content.updateOne({ _id: contentId,
 // user_id: user_id,
  },
      {
        $set:
          { content_name, sales_org, catalog_number, catalog_category, locked, content },
      }
    );

    if (updateContent) {
      res.status(200).json({ status: "Success", message: "content Updated" });
    } else {
      res.status(500).json({ status: "Error", message: "content Not Found" });
    }
  } catch (error) {
    console.error("Error updating content:", error);
    res.status(500).json({ error: "Failed to Update content" });
  }
};

const deleteContent = async (req, res) => {
  // const user_id = req.user._id;
  const contentId = req.params.contentId;
  console.log('delete:', contentId);

  try {
    const deleteContent = await Content.deleteOne(
      {
        _id: contentId,
        // user_id: user_id,
      },
    );

    if (deleteContent) {
      res.status(200).json({ status: "Success", message: "content Deleted" });
    } else {
      res.status(500).json({ status: "Error", message: "content Not Found" });
    }
  } catch (error) {
    console.error("Error deleting content:", error);
    res.status(500).json({ error: "Failed to Delete content" });
  }
};

module.exports = { addContent,getContent, updateContent, deleteContent}
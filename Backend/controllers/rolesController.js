const Roles = require('../models/rolesModel');


  
const addRoles = async (req, res) => {
  let admin_id, people_id;

  if (req.user.admin_id) {
    admin_id = req.user.admin_id;
    people_id = req.user._id;
  } else {
    admin_id = req.user._id;
    people_id = null;
  }

  const data = req.body;
  console.log(req.body);
  const role_name = data.role_name

  try {
    // Check if the role already exists
    const existingRole = await Roles.findOne({ admin_id,  role_name});

    if (existingRole) {
      res.status(400).json({ error: "Role already exists" });
    } else {
      // Role doesn't exist, create a new one
      const rolesData = await Roles.create({ admin_id, ...data });
      console.log("Roles Response", rolesData);

      if (rolesData) {
        res.status(201).json({ success: "Role added successfully" });
      } else {
        res.status(400).json({ error: "Failed to add role" });
      }
    }
  } catch (error) {
    console.log("ERROR:", error);
    res.status(400).json({ error: "Failed to add role" });
  }
};




const getRoles = async (req, res) => {

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
      const rolesdata = await Roles.find({
        admin_id: admin_id,
      });
  
      if (!rolesdata) {
        res.status(404).json({ status: "Failed", message: "Roles Data Not Found" });
      } else {
        res.status(200).json({ data: rolesdata });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve roles" });
    }
  };
  


const updateRoles = async (req, res) => {
    // const user_id = req.user._id;
    const roles_id = req.params.id;
    console.log(roles_id + "ROLES_ID");

    const {role_name, role_cat_category, role_cat_status, role_type, role_group, role_practice, parent_role, role_exter_ref, role_pro_disc, role_category_1, role_category_2, role_category_3, role_category_4, role_category_5, role_category_6} = req.body;
  console.log(req.body);
    try {
        const updateRoles = await Roles.updateOne(
            {_id: roles_id},

            {
                $set:
            {role_name, role_cat_category, role_cat_status, role_type, role_group, role_practice, parent_role, role_exter_ref, role_pro_disc, role_category_1, role_category_2, role_category_3, role_category_4, role_category_5, role_category_6},
            } 
        );

        if(updateRoles){
            res.status(200).json({status: "Success", message: "Roles Updated"});
        }else{
            res.status(500).json({ status: "Error", message: "Roles Not Found" });
        }
    }catch (error) {
        console.error("Error updating Roles:", error);
        res.status(500).json({ error: "Failed to Update Roles" });
      }
};

const deleteRolesById = async (req, res) => {
    try {
      const roleid = req.params.id;
      console.log(roleid);
  
      const roles = await Roles.findByIdAndDelete(roleid); // Use findByIdAndDelete to find and delete by ID
  
      if (roles) {
        res.status(200).json({ status: "success", message: "People deleted successfully" });
      } else {
        res.status(404).json({ status: "Not Found" }); // Change status to 404 for "Not Found"
      }
    } catch (error) {
      res.status(500).json({ error: error.message }); // Change status to 500 for a server error
    }
  }

module.exports = {addRoles, getRoles, updateRoles, deleteRolesById}
const Lookups = require("../models/lookupsModel");
const LookupsDataModel = require("../models/lookups_dataModel");

const md5 = require('md5')

// add a lookups
const addLookups = async (req, res) => {
  console.log("+++++++++++++++++++")
  let user_id, people_id;

  if (req.user.admin_id) {
    // If req.user.admin_id is not empty
    user_id = req.user.admin_id;
    people_id = req.user._id;
  } else {
    // If req.user.admin_id is empty
    user_id = req.user._id;
    people_id = null;
  }
  const { class_name, parent_lookup } = req.body;
  // const lookups_accesskey = md5(user_id + "" + class_name + "" + new Date());
  try {
    const lookups = await Lookups.find({ user_id: user_id, class_name: class_name });
    if (lookups.length == 0) {
      const lookups_data = await Lookups.create({ user_id: user_id, class_name, parent_lookup });

      if (lookups_data) {
        res.status(200).json({ status: "Success", message: "Successfully created", data: lookups_data })
      } else {
        console.log(lookups_data);
        res.status(200).json({ status: "Failed", message: "Failed " })
      }

    } else {
      res.status(200).json({ status: "Failed", message: "Class Name Already Exists!" })
    }
  } catch (error) {
    res.status(200).json({ status: "Failed", message: "Failed " + error.message })
  }
}

const getLookups = async (req, res) => {
  const user = req.user;
  console.log(user)
  if (user) {
    let user_id, people_id;

    if (req.user.admin_id) {
      // If req.user.admin_id is not empty
      user_id = req.user.admin_id;
      people_id = req.user._id;
    } else {
      // If req.user.admin_id is empty
      user_id = req.user._id;
      people_id = null;
    }
    try {
      const lookups_data = await Lookups.find({ user_id: user_id });

      if (!lookups_data) {
        res.status(200).json({ status: "Failed", message: "Loopups Data Not Found" });
      } else {
        res.status(200).json({ status: "Success", data: lookups_data });
      }
    } catch (error) {
      res.status(200).json({ status: "Failed", message: "Failed! " + error.message });
    }
  }
};

// update a lookups
const updateLookups = async (req, res) => {
  console.log("+++++++++++++++++++")
  let user_id, people_id;

  if (req.user.admin_id) {
    // If req.user.admin_id is not empty
    user_id = req.user.admin_id;
    people_id = req.user._id;
  } else {
    // If req.user.admin_id is empty
    user_id = req.user._id;
    people_id = null;
  }
  const { class_name, lookup_accesskey, parent_lookup } = req.body;
  console.log("--------", lookup_accesskey);
  console.log("#$%$%^" + class_name + parent_lookup + "@#$%@#$%^");
  // const lookups_accesskey = md5(user_id+""+class_name+""+new Date());
  try {
    const lookups = await Lookups.findOne({ _id: lookup_accesskey });
    if (lookups) {
      const lookups_data = await Lookups.findByIdAndUpdate(lookup_accesskey, { class_name: class_name, parent_lookup: parent_lookup }, { new: true });

      if (lookups_data) {
        res.status(200).json({ status: "Success", message: "Successfully updated", data: lookups_data })

      } else {
        console.log(lookups_data);
        res.status(200).json({ status: "Failed", message: "Failed " })
      }

    } else {
      res.status(200).json({ status: "Failed", message: "Class Name Already Exists!" })
    }
  } catch (error) {
    res.status(200).json({ status: "Failed", message: "Failed " + error.message })
  }
}



//API to get the LookUpName Data


const getLookupsClassName = async (req, res) => {
  const user = req.user._id;
  console.log(user)
  if (user) {
    let user_id, people_id;

    if (req.user.admin_id) {
      // If req.user.admin_id is not empty
      user_id = req.user.admin_id;
      people_id = req.user._id;
    } else {
      // If req.user.admin_id is empty
      user_id = req.user._id;
      people_id = null;
    }

    const { class_name } = req.body;
    console.log("CLASS NAMEEE : ", class_name);

    try {
      if (class_name) {
        const lookups = await Lookups.findOne({ user_id: user_id, class_name: { $regex: new RegExp(class_name, 'i') } });
        if (lookups) {
          const lookups_data = await LookupsDataModel.find({ lookups_accesskey: lookups._id });
          res.status(200).json({ status: "Success", data: lookups, lookups_data });
        } else {
          res.status(200).json({ status: "Failed", message: "Lookups Data Not Found" });
        }
      } else {
        const lookups_data = await Lookups.find({ user_id: user_id });

        if (!lookups_data || lookups_data.length === 0) {
          res.status(200).json({ status: "Failed", message: "Lookups Data Not Found" });
        } else {
          var lookups_arr = lookups_data.map((data) => data.class_name);
          res.status(200).json({ status: "Success", data: lookups_arr });
        }
      }
    } catch (error) {
      res.status(200).json({ status: "Failed", message: "Failed! " + error.message });
    }
  }
};

module.exports = { addLookups, getLookups, updateLookups, getLookupsClassName }


const Quotes = require("../models/quotesModel");
const md5 = require("md5");

// add a Quotes
const addQuotes = async (req, res) => {
  console.log("+++++++++++++++++++");
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
  const { acc_key, opp_id, survey_key } = req.body;
  try {
    const get_quotes = await Quotes.find({
      user_id: user_id,
      account_id: acc_key,
      opportunity_id: opp_id,
    });
    var count = 1;
    if (get_quotes.length > 0) {
      count = parseInt(get_quotes.length + 1);
    }
    if (count < 10) {
      count = "00" + count;
    }
    if (count >= 10 && count < 100) {
      count = "0" + count;
    }
    if (count >= 100 && count < 1000) {
      count = "" + count;
    }
    // if (Quotes.length == 0) {
    const Quotes_data = await Quotes.create({
      user_id: user_id,
      account_id: acc_key,
      opportunity_id: opp_id,
      template_type: survey_key,
      quotes_name: count,
    });

    if (Quotes_data) {
      res.status(200).json({
        status: "Success",
        message: "Successfully created",
        data: Quotes_data,
      });
    } else {
      console.log(Quotes_data);
      res.status(500).json({ status: "Failed", message: "Failed " });
    }

    // } else {
    //   res.status(200).json({ status: "Failed", message: "Class Name Already Exists!" })
    // }
  } catch (error) {
    res
      .status(200)
      .json({ status: "Failed", message: "Failed " + error.message });
  }
};

// update a Quotes
const updateQuotes = async (req, res) => {
  console.log("+++++++++++++++++++");
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
  const { class_name, Quotes_accesskey } = req.body;
  // const Quotes_accesskey = md5(user_id+""+class_name+""+new Date());
  try {
    const Quotes = await Quotes.findAll({
      where: { user_id: user_id, Quotes_accesskey: Quotes_accesskey },
    });
    if (Quotes.length > 0) {
      const Quotes_data = await Quotes.update(
        { class_name, modifiedAt: new Date() },
        { where: { Quotes_accesskey: Quotes_accesskey, user_id: user_id } }
      );

      if (Quotes_data) {
        res.status(200).json({
          status: "Success",
          message: "Successfully updated",
          data: Quotes_data,
        });
      } else {
        console.log(Quotes_data);
        res.status(200).json({ status: "Failed", message: "Failed " });
      }
    } else {
      res
        .status(200)
        .json({ status: "Failed", message: "Class Name Already Exists!" });
    }
  } catch (error) {
    res
      .status(200)
      .json({ status: "Failed", message: "Failed " + error.message });
  }
};

const getQuotes = async (req, res) => {
  const user = req.user;
  console.log(user);
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
    const { acc_key, opp_id } = req.body;
    try {
      const Quotes_data = await Quotes.find({
        
          user_id: user_id,
          account_id: acc_key,
          opportunity_id: opp_id,
        
      });

      if (!Quotes_data) {
        res
          .status(500)
          .json({ status: "Failed", message: "Loopups Data Not Found" });
      } else {
        res.status(200).json({ status: "Success", data: Quotes_data });
      }
    } catch (error) {
      res
        .status(500)
        .json({ status: "Failed", message: "Failed! " + error.message });
    }
  }
};

module.exports = { addQuotes, getQuotes, updateQuotes };

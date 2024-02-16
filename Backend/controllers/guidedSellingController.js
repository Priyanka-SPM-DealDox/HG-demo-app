const moment = require("moment");
const md5 = require("md5"); // Make sure to import the md5 library
const GuidedSellingQuestions = require("../models/guidedQuestionsModel");
const GuidedSellingSection = require("../models/guidedSectionModel");



const addGuidedSellingQuestions = async (req, res) => {
  try {
    if (req.user) {
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
        
        var { guided_survery_id,survey_key, account_id, quote_id, opportunity_id, data } = req.body;
      console.log("-------req.body--------");
      console.log(req.body);

      var d = new Date();
      var a = d.toString();

      if(guided_survery_id){
        var survey_ques_data = {
          data: data,
        };
        console.log(survey_ques_data);
  
        const guided_question_data = await GuidedSellingQuestions.updateOne({
          survey_key: survey_key,
          account_id: account_id,
          opportunity_id: opportunity_id,
          quote_id: quote_id},{$set:
          survey_ques_data
          }
        );
  
        if (guided_question_data) {
          res.status(200).json({
            status: "Success",
            survey_key: survey_key,
            // question_key: guided_question_data._id,
            _id: guided_question_data._id,
          });
        } else {
          res
            .status(200)
            .json({ status: "Failed", message: "error on submitting!" });
        }
      }else{
      var survey_ques_data = {
        // user_id: user_id,
        survey_key: survey_key,
        account_id: account_id,
        opportunity_id: opportunity_id,
        quote_id: quote_id,
        data: data,
      };
      console.log(survey_ques_data);

      const guided_question_data = await GuidedSellingQuestions.create(
        survey_ques_data
      );

      if (guided_question_data) {
        res.status(200).json({
          status: "Success",
          survey_key: survey_key,
          // question_key: guided_question_data._id,
          _id: guided_question_data._id,
        });
      } else {
        res
          .status(200)
          .json({ status: "Failed", message: "error on submitting!" });
      }
     }
    } else {
      res
        .status(200)
        .json({ status: "failed", message: "authorization Failed" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "failed", message: "Failed! " + error.message });
  }
};



const getGuidedSellingQuestionAnswers = async (req, res) => {
  try {
    if (req.user) {
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
      var { survey_key, account_id, opportunity_id, quote_id } = req.body;

      const guided_question_data = await GuidedSellingQuestions.findOne({
        survey_key: survey_key,
        account_id: account_id,
        opportunity_id: opportunity_id,
        quote_id: quote_id,
      });
      console.log(guided_question_data);

      // if (guided_question_data) {
        res.status(200).json({ status: "Success", data: guided_question_data });
      // } else {
      //   res.status(204).json({ status: "Failed", message: "Not Found !" });
      // }
    } else {
      res
        .status(400)
        .json({ status: "failed", message: "authorization Failed" });
    }
  } catch (error) {
    console.error("eeeeeee", error);
    res
      .status(500)
      .json({ status: "failed", message: "Failed! " + error.message });
  }
};

const updateGuidedSellingQuestion = async (req, res) => {
  const id = req.params.queAnswerId;

  var { survey_id, survey_key, account_id, opportunity_id, data } = req.body;

  try {
    const updatedData = {
      survey_id: survey_id,
      survey_key: survey_key,
      account_id: account_id,
      opportunity_id: opportunity_id,
      // quote_id: quote_id,
      data: data,
    };
    const newAnswerData = await GuidedSellingQuestions.updateOne(
      {
        _id: id,
      },
      {
        $set: updatedData,
      }
    );

    if (newAnswerData) {
      res.status(200).json({ status: "Success", data: newAnswerData });
    } else {
      res.status(500).json({ status: "Error", message: "Error" });
    }
  } catch (error) {
    console.error("Error updating :", error);
    res.status(500).json({ error: "Failed to Update" });
  }
};

const addGuidedSellingSections = async (req, res) => {

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

  const currentTime = new Date();
  const account_id = md5(currentTime + "" + req.body.surveyQuestions); // Assuming surveyQuestions is a string
  const { section_count, section_name } = req.body;

  try {
    const guidedSellingSectionData = await GuidedSellingSection.create({
      guidedselling_sections_id,
      account_id,
      opportunity_id,
      user_id,
      quote_id,
      template_type,
      section_key,
      section_count,
      section_name,
      // Other fields specific to your guidedSellingSections model
    });

    if (guidedSellingSectionData) {
      res.status(200).json({ success: "Success" });
    } else {
      res.status(200).json({ error: "Failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed" });
  }
};

module.exports = {
  addGuidedSellingQuestions,
  addGuidedSellingSections,
  getGuidedSellingQuestionAnswers,
  updateGuidedSellingQuestion,
};

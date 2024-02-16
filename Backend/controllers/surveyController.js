const md5 = require("md5");
const Survey = require("../models/surveyModel"); // Make sure the model name matches your model name
const SurveyQuestion = require("../models/surveyQuestionsModel"); // Make sure the model name matches your model name
const SurveySections = require("../models/surveySectionsModel");

// add a survey

const addSurvey = async (req, res) => {

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
    const {
      category,
      title,
      status,
      globals,
      wide,
      update_type,
      notification,
      setup_key,
    } = req.body;
    console.log(req.body);
    console.log(title);
    console.log(setup_key);
    var d = Date();
    var a = d.toString();
    var survey_key = setup_key;

    try {
      const existingSurvey = await Survey.findOne({ user_id, title });
      if (existingSurvey) {
        return res.status(400).json({
          error: "existingSurvey",
          message: "Survey with the same name already exists",
        });
      }
      if (setup_key == "") {
        var data = {
          user_id,
          category,
          title,
          status,
          globals,
          wide,
          update_type,
          notification,
        };

        const survey_data = await Survey.create(data);

        if (survey_data) {
          res
            .status(200)
            .json({ status: "Success", survey_key: survey_data._id });
        } else {
          res.status(200).json({ status: "Failed" });
        }
      } else {
        if (setup_key != "") {
          const survey_exists = await Survey.find({
            user_id: user_id,
            _id: setup_key,
          });
          if (survey_exists) {
            data = {
              title,
              category,
              status,
              globals,
              wide,
              update_type,
              notification,
            };
            console.log(data);
            console.log({ user_id: user_id, _id: setup_key });
            const survey_data = await Survey.updateOne(
              { user_id: user_id, _id: setup_key },
              { $set: data }
            );
            if (survey_data) {
              const survey = await Survey.findOne({
                user_id: user_id,
                _id: setup_key,
              });

              res.status(200).json({
                status: "Success",
                survey_key: setup_key,
                data: survey,
              });
            } else {
              res.status(200).json({ status: "Failed" });
            }
          } else {
            res.status(200).json({ status: "Failed" });
          }
        }
      }
    } catch (error) {
      console.log(error);
      res.status(200).json({ status: "Failed" });
    }
  } else {
    res.status(200).json({ status: "Failed", message: "Authorization Failed" });
  }
};

// get a survey
const getSurvey = async (req, res) => {
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
    try {
      const survey_data = await Survey.find({ user_id: user_id });

      if (!survey_data) {
        res
          .status(200)
          .json({ status: "Failed", message: "survey Data Not Found" });
      } else {
        res.status(200).json({ status: "Success", data: survey_data });
      }
    } catch (error) {
      res
        .status(200)
        .json({ status: "Failed", message: "Failed! " + error.message });
    }
  } else {
    res.status(200).json({ status: "Failed", message: "Authorization Failed" });
  }
};



const getSurveyNames = async(req, res) =>{
  if(req.user){
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
    var { survey_key } = req.body;
    console.log("+++++++++", survey_key);
    var { title } = req.body;
    console.log("title----", title);
     try{
              const survey = await Survey.find({
              // user_id: user_id,
              _id: survey_key,
              // title: title, 
            });
          console.log(survey);
          if(!survey){
            res.status(200).json({ status: "Failed", message: "Survey Name is not Found" });

          } else{res.status(200).json({ status: "Success", data: survey });
        }

     } catch(error){res.status(200).json({ status: "Failed", message: "Failed! " + error.message });

    }

    } else{ res.status(200).json({ status: "Failed", message: "Authorization Failed" });
  }
};





const getSurveyGuidedSelling = async (req, res) => {
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
    try {
      const survey_data = await Survey.find({
        user_id: user_id,
        status: "PUBLISHED",
      });

      if (!survey_data) {
        res
          .status(200)
          .json({ status: "Failed", message: "Loopups Data Not Found" });
      } else {
        res.status(200).json({ status: "Success", data: survey_data });
      }
    } catch (error) {
      res
        .status(200)
        .json({ status: "Failed", message: "Failed! " + error.message });
    }
  } else {
    res.status(200).json({ status: "Failed", message: "Authorization Failed" });
  }
};

//add surveySection
const addSurveySections = async (req, res) => {
  // Add "async" here
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
    var { section_key, section_num, survey_key, section_title } = req.body;

    var d = Date();
    var a = d.toString();

    try {
      if (section_key == "") {
        // Fix typo here, change "setip_key" to "setup_key"

        var surveySecData = {};
        console.log("+++++++++++++++1");
        surveySecData = {
          user_id: user_id,
          survey_section_key: section_key,
          survey_key: survey_key,
          survey_section_number: section_num,
          survey_section_title: section_title,
          survey_section_status: 0,
        };
        console.log(surveySecData);

        const survey_section_data = await SurveySections.create(surveySecData);

        if (survey_section_data) {
          res.status(200).json({
            status: "Success",
            survey_key: survey_key,
            section_key: survey_section_data._id,
          });
        } else {
          res
            .status(200)
            .json({ status: "Failed", message: "error on submitting!" });
        }
      } else {
        if (section_key != "" && survey_key != "") {
          const survey_section_exists = await SurveySections.findOne({
            user_id: user_id,
            _id: section_key,
            survey_key: survey_key,
          });
          if (survey_section_exists) {
            // Fix typo here, change "survey_exist" to "survey_section_exists"
            var data = {
              survey_section_number: section_num,
              survey_section_title: section_title,
              survey_section_status: 0,
            };

            const updated_survey_section_data = await SurveySections.updateOne(
              { user_id: user_id, 
                _id: section_key, 
                survey_key: survey_key, 
              },
              
              { $set: data }
            );
              console.log(updated_survey_section_data);

            if (updated_survey_section_data) {
              const survey_section = await SurveySections.findOne({
                user_id: user_id,
                _id: section_key,
                survey_key: survey_key,
              });

              res.status(200).json({
                status: "Success",
                survey_key: survey_key,
                section_key: section_key,
                data: survey_section,
              });
            } else {
              res
                .status(200)
                .json({ status: "Failed", message: "error on submitting!" });
            }
          } else {
            res
              .status(200)
              .json({ status: "Failed", message: "Section not exists!" });
          }
        }
      }
    } catch (error) {
      res
        .status(200)
        .json({ status: "failed", message: "Failed! " + error.message });
    }
  } else {
    res.status(200).json({ status: "failed", message: "authorization Failed" });
  }
};


//add SurveyQuestions
const addSurveyQuestions = async (req, res) => {
  // Add "async" here
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
    var {
      survey_key,
      section_key,
      question_key,
      questions_num,
      question_name,
      survey_questions_toggle,
      formula_add_filed,
      formula_add_operator,
      formula_add_function,
      formula_evaluate,
      formula_add_formula,
    } = req.body;

    var d = Date();
    var a = d.toString();

    try {
      if (question_key == "") {
        // Fix typo here, change "setip_key" to "setup_key"

        var surveySecData = {};
        console.log("+++++++++++++++1");
        surveySecData = {
          user_id: user_id,
          survey_key: survey_key,
          survey_section_key: section_key,
          survey_questions_num: questions_num,
          survey_questions_name: question_name,
          survey_questions_required: 0,
          survey_questions_toggle,
          formula_add_filed,
          formula_add_operator,
          formula_add_function,
          formula_evaluate,
          formula_add_formula,
        };
        console.log(surveySecData);

        const survey_ques_data = await SurveyQuestion.create(surveySecData);

        if (survey_ques_data) {
          res.status(200).json({
            status: "Success",
            survey_key: survey_key,
            question_key: survey_ques_data._id,
          });
        } else {
          res
            .status(200)
            .json({ status: "Failed", message: "error on submitting!" });
        }
      } else {
        if (question_key != "" && question_key != "") {
          const survey_section_exists = await SurveyQuestion.findOne({
            user_id: user_id,
            survey_key: survey_key,
            survey_section_key: section_key,
            _id: question_key,
          });
          if (survey_section_exists) {
            // Fix typo here, change "survey_exist" to "survey_section_exists"
            var data = {
              survey_questions_num: questions_num,
              survey_questions_name: question_name,
              survey_questions_required: 0,
              survey_questions_toggle,
              formula_add_filed,
              formula_add_operator,
              formula_add_function,
              formula_evaluate,
              formula_add_formula,
            };

            const updated_survey_section_data = await SurveyQuestion.updateOne(
              {
                user_id: user_id,
                survey_key: survey_key,
                survey_section_key: section_key,
                _id: question_key,
              },

              { $set: data }
            );
            console.log(updated_survey_section_data);
            if (updated_survey_section_data) {
              const survey_section = await SurveyQuestion.findOne({
                user_id: user_id,
                survey_key: survey_key,
                survey_section_key: section_key,
                _id: question_key,
              });

              res.status(200).json({
                status: "Success",
                survey_key: survey_key,
                question_key: question_key,
                data: survey_section,
              });
            } else {
              res
                .status(200)
                .json({ status: "Failed", message: "error on submitting!" });
            }
          } else {
            res
              .status(200)
              .json({ status: "Failed", message: "Section not exists!" });
          }
        }
      }
    } catch (error) {
      res
        .status(200)
        .json({ status: "failed", message: "Failed! " + error.message });
    }
  } else {
    res.status(200).json({ status: "failed", message: "authorization Failed" });
  }
};


const getSurveySections = async (req, res) => {
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
    var { survey_key } = req.body;

    try {
      const survery_data = await SurveySections.find({
        user_id: user_id,
        survey_key: survey_key,
      });

      if (!survery_data) {
        res
          .status(200)
          .json({ status: "Failed", message: "survey Data Not Found" });
      } else {
        res.status(200).json({ status: "Success", data: survery_data });
      }
    } catch (error) {
      res
        .status(200)
        .json({ status: "Failed", message: "Failed! " + error.message });
    }
  } else {
    res.status(200).json({ status: "Failed", message: "Authorization Failed" });
  }
};

const getSurveyQuestions = async (req, res) => {
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
    var { survey_key, section_key } = req.body;

    try {
      var survery_data = [];

      survery_data = await SurveyQuestion.find({
        user_id: user_id,
        survey_key: survey_key,
        survey_section_key: section_key,
      });

      if (!survery_data) {
        res
          .status(200)
          .json({ status: "Failed", message: "survey Data Not Found" });
      } else {
        res.status(200).json({ status: "Success", data: survery_data });
      }
    } catch (error) {
      res
        .status(200)
        .json({ status: "Failed", message: "Failed! " + error.message });
    }
  } else {
    res.status(200).json({ status: "Failed", message: "Authorization Failed" });
  }
};

const getSurveyQuestionsguidedSelling = async (req, res) => {
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
    var { survey_key, section_key } = req.body;

    try {
      var survery_data = [];

      survery_data = await SurveyQuestion.find({
        user_id: user_id,
        survey_key: survey_key,
      });

      if (!survery_data) {
        res
          .status(200)
          .json({ status: "Failed", message: "survey Data Not Found" });
      } else {
        res.status(200).json({ status: "Success", data: survery_data });
      }
    } catch (error) {
      res
        .status(200)
        .json({ status: "Failed", message: "Failed! " + error.message });
    }
  } else {
    res.status(200).json({ status: "Failed", message: "Authorization Failed" });
  }
};

const deleteSurvey = async (req, res) => {
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
    const { survey_key } = req.body;

    try {
      const survey_exists = await Survey.findOne({
        user_id: user_id,
        _id: survey_key,
      });

      if (survey_exists) {
        const deletedSurvey = await Survey.deleteOne({
          user_id: user_id,
          _id: survey_key,
        });

        if (deletedSurvey.deletedCount > 0) {
          // Delete associated survey sections
          await SurveySections.deleteMany({
            user_id: user_id,
            survey_key: survey_key,
          });

          // Delete associated survey questions
          await SurveyQuestion.deleteMany({
            user_id: user_id,
            survey_key: survey_key,
          });

          res.status(200).json({ status: "Success" });
        } else {
          res
            .status(200)
            .json({ status: "Failed", message: "Survey not found" });
        }
      } else {
        res.status(200).json({ status: "Failed", message: "Survey not found" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(200)
        .json({ status: "Failed", message: "Failed! " + error.message });
    }
  } else {
    res.status(200).json({ status: "Failed", message: "Authorization Failed" });
  }
};

// DELETE SURVEY QUESTIONS 
const deleteSurveyQuestion = async (req, res) => {
  if (req.user) {
    let user_id, people_id;

    if (req.user.admin_id) {
      user_id = req.user.admin_id;
      people_id = req.user._id;
    } else {
      user_id = req.user._id;
      people_id = null;
    }

    const { survey_key, section_key, question_key } = req.body; // Assuming these values are part of the URL parameters

    try {
      const survey_question = await SurveyQuestion.findOne({
        user_id: user_id,
        survey_key: survey_key,
        survey_section_key: section_key,
        _id: question_key,
      });

      if (survey_question) {
        const deletedSurveyQuestion = await SurveyQuestion.deleteOne({
          user_id: user_id,
          survey_key: survey_key,
          survey_section_key: section_key,
          _id: question_key,
        });

        if (deletedSurveyQuestion.deletedCount > 0) {
          res.status(200).json({
            status: "Success",
            message: "Survey question deleted successfully.",
          });
        } else {
          res.status(200).json({
            status: "Failed",
            message: "Error deleting survey question.",
          });
        }
      } else {
        res.status(200).json({
          status: "Failed",
          message: "Survey question not found.",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "Failed",
        message: "Failed to delete survey question. " + error.message,
      });
    }
  } else {
    res.status(401).json({
      status: "failed",
      message: "Authorization failed.",
    });
  }
};


module.exports = {
  addSurvey,
  addSurveyQuestions,
  addSurveySections,
  getSurvey,
  getSurveySections,
  getSurveyQuestions,
  getSurveyGuidedSelling,
  getSurveyQuestionsguidedSelling,
  deleteSurvey,
  getSurveyNames,
  deleteSurveyQuestion
};

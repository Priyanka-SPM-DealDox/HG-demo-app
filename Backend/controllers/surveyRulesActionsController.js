const md5 = require("md5");
const SurveyRules = require("../models/surveyRulesModel");
const SurveyAction = require("../models/surveyActionsModel");

//add surveyRules
// const addSurveyRules = async (req, res) => {
//     const user_id = req.user.user_id;
//     const currentTime = new Date();
//     var a = currentTime.toString();

//     var { section_key, survey_key, rules_key, rules_num, field_name, field_value } = req.body;

//     if (user_id) {
//         try {
//             if (field_name == "inputfieldrulesname" && rules_key == "") {
//                 if (rules_key == "") {
//                     rules_key = md5(a + "" + field_name + "" + field_value);
//                 }
//                 var data = {};
//                 if (field_name == "inputfieldrulesname") {
//                     data = { survey_section_key: section_key, survey_rules_key: rules_key, survey_key: survey_key, user_id: user_id, rule_number: rules_num, rule_name: field_value };
//                 }
//                 const survey_data = await SurveyRules.create(data);

//                 if (survey_data) {
//                     res.status(200).json({ status: "Success", rules_key: rules_key });
//                 }
//                 else {
//                     res.status(200).json({ status: "Failed" });
//                 }
//             } else {
//                 if (rules_key != "") {
//                     const survey_exists = await SurveyRules.findAll({ where: { survey_section_key: section_key, survey_rules_key: rules_key, survey_key: survey_key, user_id: user_id } });
//                     if (survey_exists) {
//                         if (field_name == "inputfieldrulesname") {
//                             data = { rule_number: rules_num, rule_name: field_value };
//                         }
//                         if (field_name == "condition_name") {
//                             data = { rule_number: rules_num, rule_condition_name: field_value };
//                         }
//                         if (field_name == "operator") {
//                             data = { rule_number: rules_num, rule_operator: field_value };
//                         }
//                         if (field_name == "rules_questions") {
//                             data = { rule_number: rules_num, question_or_value: field_value };
//                         }

//                         if (field_name == "toggle") {
//                             data = { rule_number: rules_num, toggle: field_value };
//                         }

//                         if (field_name == "country") {
//                             data = { rule_number: rules_num, countries: field_value };
//                         }

//                         if (field_name == "text") {
//                             data = { rule_number: rules_num, text: field_value };
//                         }

//                         if (field_name == "yes/no") {
//                             data = { rule_number: rules_num, yes_no: field_value };
//                         }

//                         if (field_name == "date") {
//                             data = { rule_number: rules_num, date: field_value };
//                         }

//                         if (field_name == "months") {
//                             data = { rule_number: rules_num, months: field_value };
//                         }

//                         if (field_name == "hi_no_lo") {
//                             data = { rule_number: rules_num, hi_no_lo: field_value };
//                         }

//                         if (field_name == "hi_md_lo_notsure") {
//                             data = { rule_number: rules_num, hi_md_lo_notsure: field_value };
//                         }

//                         if (field_name == "numericValue") {
//                             data = { rule_number: rules_num, numericValue: field_value };
//                         }

//                         if (field_name === "numericValue(1-10)") {
//                             data = { rule_number: rules_num, "numericValue(1-10)": field_value };
//                         }

//                         if (field_name === "textInput") {
//                             data = { rule_number: rules_num, textInput: field_value };
//                         }

//                         // if (field_name == "status") {
//                         //     data = { status: field_value };
//                         // }
//                         // if (field_name == "globals") {
//                         //     data = { globals: field_value };
//                         // }
//                         // if (field_name == "wide") {
//                         //     data = { wide: field_value };
//                         // }
//                         // if (field_name == "update_type") {
//                         //     data = { update_type: field_value };
//                         // }
//                         const survey_data = await SurveyRules.update(data, { where: { survey_section_key: section_key, survey_rules_key: rules_key, survey_key: survey_key, user_id: user_id } });
//                         if (survey_data) {
//                             const survey = await SurveyRules.findOne({ where: { survey_section_key: section_key, survey_rules_key: rules_key, survey_key: survey_key, user_id: user_id } });

//                             res.status(200).json({ status: "Success", rules_key: rules_key, data: survey });
//                         }
//                         else {
//                             res.status(200).json({ status: "Failed" });
//                         }
//                     } else {
//                         res.status(200).json({ status: "Failed" });
//                     }
//                 } else {
//                     res.status(200).json({ status: "Failed" });

//                 }

//             }

//         } catch (error) {
//             // console(error);
//             res.status(500).json({ error: "Failed", message: error.message });
//         }
//     } else {
//         res.status(500).json({ error: "Failed", message: "user not authorized" });
//     };

//================================RULES CONTROLLER ADDED========================================
//Add survey
const addSurveyRules = async (req, res) => {
  if (req.user) {
    const user_id = req.user._id;
    var {
      survey_key,
      section_key,
      rule_key, // Change to rule_key
      rule_name, // Change to rule_name
      rule_num,
      conditon_name,
      operator,
      selected_question,
      date,
      number,
      otherinput,
      countries,
      yes_no,
      toggle,
      yes_no_not,
      hi_lo_med,
      hi_norm_lo,
      currencies,
      user_message,
      languages,
      whole_numbers,
      percentage,
      months,
      numeric_num,
      multiline_text,
    } = req.body;

    var d = Date();
    var a = d.toString();

    try {
      if (rule_key == "") {
        // Change to rule_key
        var surveyRuleData = {};
        console.log("+++++++++++++++1");
        surveyRuleData = {
          user_id: user_id,
          survey_key: survey_key,
          survey_section_key: section_key,
          rule_name: rule_name, // Change to rule_name
          rule_number: rule_num,
        };
        console.log(surveyRuleData);

        const survey_rule_data = await SurveyRules.create(surveyRuleData); // Change to SurveyRule

        if (survey_rule_data) {
          res.status(200).json({
            status: "Success",
            survey_key: survey_key,
            rules_key: survey_rule_data._id, // Change to rule_key
          });
        } else {
          res
            .status(200)
            .json({ status: "Failed", message: "Error on submitting!" });
        }
      } else {
        if (rule_key != "" && rule_key != "") {
          // Change to rule_key
          const survey_rule_exists = await SurveyRules.findOne({
            user_id: user_id,
            survey_key: survey_key,
            survey_section_key: section_key,
            _id: rule_key, // Change to rule_key
          });
          if (survey_rule_exists) {
            var data = {
              rule_name: rule_name, // Change to rule_name
              rule_number: rule_num,
            };

            if(conditon_name)
            {
              data.rule_condition_name = conditon_name;
              data.rule_operator = operator;
              data.question_or_value = selected_question;
              data.date = date?date:"";
              data.numbers = number?number:"";
              data.otherinput = otherinput?otherinput:"";
              data.countries = countries?countries:"";
              data.yes_no = yes_no?yes_no:"";
              data.toggle = toggle?toggle+"":"";
              data.yes_no_not = yes_no_not?yes_no_not:"";
              data.hi_lo_med = hi_lo_med?hi_lo_med:"";
              data.hi_norm_lo = hi_norm_lo?hi_norm_lo:"";
              data.currencies = currencies?currencies:"";
              data.user_message = user_message?user_message:"";
              data.languages = languages?languages:"";
              data.whole_numbers = whole_numbers?whole_numbers:"";
              data.percentage = percentage?percentage:"";
              data.months = months?months:"";
              data.numeric_num = numeric_num?numeric_num:"";
              data.multiline_text = multiline_text?multiline_text:"";
            }

            console.log(data);
            const updated_survey_rule_data = await SurveyRules.updateOne(
              {
                user_id: user_id,
                survey_key: survey_key,
                survey_section_key: section_key,
                _id: rule_key, // Change to rule_key
              },
              { $set: data }
            );

            console.log(updated_survey_rule_data);
            if (updated_survey_rule_data) {
              const survey_rule = await SurveyRules.findOne({
                user_id: user_id,
                survey_key: survey_key,
                survey_section_key: section_key,
                _id: rule_key, // Change to rule_key
              });

              res.status(200).json({
                status: "Success",
                survey_key: survey_key,
                rules_key: rule_key, // Change to rule_key
                data: survey_rule,
              });
            } else {
              res
                .status(200)
                .json({ status: "Failed", message: "Error on submitting!" });
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
    res.status(200).json({ status: "failed", message: "Authorization Failed" });
  }
};

// addSurveyActions  =======================================

const addSurveyActions = async (req, res) => {
  if (req.user) {
    const user_id = req.user._id;
    var {
      survey_key,
      section_key,
      rule_key,
      action_key,
      action_num,
      action_name,
      actions_sections,
      calcTab,
      pcrCalcCell,
      calcTabTemplate,
      cell_data,
      celldata1,
      valuedata1,
    } = req.body;
    console.log("ooooooooooooooo",calcTab);
    var d = Date();
    var a = d.toString();

    try {
      if (action_key == "") {
        var surveyActionData = {};
        console.log("====================");
        surveyActionData = {
          user_id: user_id,
          survey_key: survey_key,
          survey_section_key: section_key,
          survey_rules_key: rule_key,
          survey_action_number: action_num,
          survey_action_name: action_name,
          survey_actions_sections: actions_sections,
          pcrCalcTab: calcTab,
          pcrCalcCell: pcrCalcCell,
          calcTabTemplate:calcTabTemplate,
          celldata: celldata1,
          valuedata: valuedata1,
          cell: cell_data,
        };
        console.log("SurveyActionData : ",surveyActionData);
        const survey_action_data = await SurveyAction.create(surveyActionData);

        if (survey_action_data) {
          res.status(200).json({
            status: "Success",
            survey_key: survey_key,
            action_key: survey_action_data._id,
          });
        } else {
          res
            .status(200)
            .json({ status: "Failed", message: "Error on submitting!" });
        }
      } else {
        if (action_key != "" && action_key != " ") {
          const survey_action_exists = await SurveyAction.findOne({
            user_id: user_id,
            survey_key: survey_key,
            survey_section_key: section_key,
            survey_rules_key: rule_key,
            _id: action_key,
          });

          if (survey_action_exists) {
            var data = {
              survey_action_number: action_num,
              survey_action_name: action_name,
              survey_actions_sections: actions_sections,
              pcrCalcTab: calcTab,
              pcrCalcCell: pcrCalcCell,
              calcTabTemplate:calcTabTemplate,
              celldata: celldata1,
              valuedata: valuedata1,
              cell: cell_data,
            };

            const updated_survey_action_data = await SurveyAction.updateOne(
              {
                user_id: user_id,
                survey_key: survey_key,
                survey_section_key: section_key,
                survey_rules_key: rule_key,
                _id: action_key,
              },
              { $set: data }
            );
            console.log(updated_survey_action_data);

            if (updated_survey_action_data) {
              const survey_action = await SurveyAction.findOne({
                user_id: user_id,
                survey_key: survey_key,
                survey_section_key: section_key,
                survey_rules_key: rule_key,
                _id: action_key,
              });

              res.status(200).json({
                status: "Success",
                survey_key: survey_key,
                rules_key: rule_key, // Change to rule_key
                action_key: action_key,
                data: survey_action,
              });
            } else {
              res
                .status(200)
                .json({ status: "Failed", message: "Error on submitting!" });
            }
          } else {
            res
              .status(200)
              .json({ status: "Failed", message: "Action not exists!" });
          }
        }
      }
    } catch (error) {
      res
        .status(200)
        .json({ status: "failed", message: "Failed! " + error.message });
    }
  } else {
    res.status(200).json({ status: "failed", message: "Authorization Failed" });
  }
};

//  getSurveyRules ==============================

const getSurveyRules = async (req, res) => {
  if (req.user) {
    const user_id = req.user._id;
    var { survey_key, section_key } = req.body;

    try {
      if(!section_key){
        return null;
      }
      if(section_key){
        const survery_data = await SurveyRules.find({
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
     }else{
      const survery_data = await SurveyRules.find({
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

const getSurveyGuidedSellingRules = async (req, res) => {
  if (req.user) {
    const user_id = req.user._id;
    var { survey_key, section_key } = req.body;

    try {
      if(section_key){
        const survery_data = await SurveyRules.find({
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
     }else{
      const survery_data = await SurveyRules.find({
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

// getSurveyActions  =====================

const getSurveyActions = async (req, res) => {
  if (req.user) {
    const user_id = req.user._id;
    var { survey_key, section_key, rules_key } = req.body;
    console.log(survey_key, section_key, rules_key,"nbnbnbnbnbnbnbnb");

    try {

      const survey_data = await SurveyAction.find({
          user_id: user_id,
          survey_key: survey_key,
          survey_section_key: section_key,
          survey_rules_key: rules_key,   
      });

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


// for template merge

const templateMergeData = async (req, res) => {
  const user_id = req.user._id;
  var { survey_key, templatem } = req.body;
  // const { survey_key } = req.body; // Destructure survey_key from req.body
  try {
      const action_data = await SurveyAction.find({
        user_id: user_id,
          // survey_key: survey_key, // Use survey_key directly
          // action: template
          survey_key: survey_key,
          survey_action_name:templatem,
         
      });
      if (action_data) {
          res.status(200).json({ data: action_data });
      } else {
          res.status(200).json({ status: "Failed", message: "action_data Data Not Found" });
      }

  }  catch (error) {
    console.error(error);  // Log the error details
    res.status(400).json({ error: "Failed" });
}

}

const getSurveyGuidedSellingActions = async (req, res) => {
  if (req.user) {
    const user_id = req.user._id;
    var { survey_key, section_key, rules_key } = req.body;

    try {
      const survey_data = await SurveyAction.find({
          user_id: user_id,
          survey_key: survey_key,
      
      });

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

module.exports = {
  addSurveyRules,
  getSurveyRules,
  addSurveyActions,
  getSurveyActions,
  templateMergeData,
  getSurveyGuidedSellingActions,
  getSurveyGuidedSellingRules
};

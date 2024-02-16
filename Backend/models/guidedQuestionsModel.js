const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuidedSellingQuestionSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming 'User' is the name of the referenced model
    },
    survey_id: {
      type: String,
    },
    survey_key: {
      type: String,
    },
    account_id: {
      type: String,
    },
    opportunity_id: {
      type: String,
    },
    quote_id: {
      type: String,
    },
    // template_type: {
    //   type: String,
    //   required: true,
    // },
    data: {
      type: String,
    },

    created_at: {
      type: Date,
      default: Date.now,
    },
    modified_at: {
      type: Date,
      default: Date.now,
    },
  }
  // {
  //     collection: 'guidedselling_questions', // Specify the collection name
  // }
);

module.exports = mongoose.model(
  "dd_guidedSelling_question",
  GuidedSellingQuestionSchema
);

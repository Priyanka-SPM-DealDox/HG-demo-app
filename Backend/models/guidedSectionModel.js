const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuidedSellingSectionSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Replace 'User' with the actual referenced model name
    },
    account_id: {
      type: String,
      required: true,
    },
    opportunity_id: {
      type: String,
      required: true,
    },
    quote_id: {
      type: Number,
      required: true,
    },
    template_type: {
      type: String,
      required: true,
    },
    section_key: {
      type: String,
      required: true,
    },
    section_count: {
      type: String,
      required: true,
    },
    section_name: {
      type: String,
      required: true,
      maxlength: 300,
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
  //     collection: 'dd_guidedselling_sections',
  // }
);

module.exports = mongoose.model(
  "dd_guidedselling_sections",
  GuidedSellingSectionSchema
);

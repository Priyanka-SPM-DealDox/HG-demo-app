const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SurveySchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "dd_admin" },
  // Assuming 'users' is the name of the users collection },
  title: { type: String },
  category: { type: String },
  status: { type: String },
  globals: { type:Boolean },
  wide: { type: Boolean},
  update_type: { type: String },
  notification: { type: String },
  createdAt: { type: Date, default: new Date() },
  modifiedAt: { type: Date, default: new Date() },
});
module.exports = mongoose.model("dd_survey", SurveySchema);

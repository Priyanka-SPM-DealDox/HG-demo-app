const mongoose = require('mongoose');
const User = require('../models/adminModel');


const Schema = mongoose.Schema

const LookupsSchema = new Schema({

  user_id:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dd_admin',
  },
  class_name:
  {
    type: String,
  },
  parent_lookup:
  {
    type: String,
  },
  lookups_status:
  {
    type: Number,
    default: 0
  },
  createdAt:
  {
    type: Date,
    default: new Date(),
  },
  modifiedAt:
  {
    type: Date,
    default: new Date(),
  },
});
module.exports = mongoose.model('dd_lookup', LookupsSchema);
const mongoose = require('mongoose');
const User = require('../models/adminModel');
const account = require('../models/accountsModel');

const Schema = mongoose.Schema

  const Opportunities = new Schema({
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"dd_admin"
    },
    account_Id:{
      type: mongoose.Schema.Types.ObjectId,
       ref: 'dd_accounts',
    },
    opportunity_name: {
      type: String
    },
    net_price: {
      type: String
    },
    margin: {
      type: String
    },
    cost: {
      type: Number
    },
    stage: {
      type: String
    },
    probability: {
      type: String
    },
    hours: {
      type: String
    },
    close: {
      type: Date
    },
    start: {
      type: Date
    },
    duration_weeks: {
      type: Number
    },
    owner: {
      type: String
    },
    region: {
      type: String,
    },
    vertical: {
      type: String,
    },
    practice: {
      type: String,
    },
    currency: {
      type: String,
    },
    org: {
      type: String,
    },
    opportunity_type: {
      type: String,
    },
    
    createdAt: {
      type: Date,
      default: new Date(),
     
    },
    modifiedAt: {
      type: Date,
      default: new Date(),
      
    }
  });

  module.exports = mongoose.model('dd_opportunities', Opportunities);


const mongoose = require('mongoose');
const User = require('../models/adminModel');

const Schema = mongoose.Schema

const PeopleSchema = new Schema({

    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dd_admin',
    },

    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    title: {
        type: String,
    },
    uid: {
        type: String,
    },
    emp_id: {
        type: String,
    },
    emp_ref_id: {
        type: String,
    },
    start_date: {
        type: String,
    },
    end_date: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    src_sys_usr_name: {
        type: String,
    },
    city: {
        type: String,
    },
    region: {
        type: String,
    },
    country: {
        type: String,
    },
    practice: {
        type: String,
    },
    org: {
        type: String,
    },
    manager: {
        type: String,
    },
    exp_yr: {
        type: String,
    },
    tenure: {
        type: String,
    },
    crm_status: {
        type: String,
    },
    contractor: {
        type: Boolean,
    },
    supplier: {
        type: String,
    },
    currency: {
        type: String,
    },
    cost_per_hour: {
        type: Number,
    },
    week_hour: {
        type: Number,
    },
    access: {
        type: String,
    },
    catalog_role: {
        type: [String], // Change the type to an array of strings
    },
    password: {
        type: String,
    },
    securityRole: {
        type: String,
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
    modified_at: {
        type: Date,
        default: new Date(),
    }
});

module.exports = mongoose.model('dd_people', PeopleSchema);
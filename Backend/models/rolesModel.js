const mongoose = require('mongoose');
const User = require('../models/adminModel');

const Schema = mongoose.Schema

const Roles = new Schema({

    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dd_admin',
    },

    role_name: {
        type: String,
    },
    role_cat_category: {
        type: String,
    },
    role_cat_status: {
        type: String,
    },
    role_type: {
        type: String,
    },
    role_group: {
        type: String,
    },
    role_practice: {
        type: String,
    },
    parent_role: {
        type: String,
    },
    role_exter_ref: {
        type: String,
    },
    role_pro_disc: {
        type: Boolean,
    },
    role_category_1: {
        type: String,
    },
    role_category_2: {
        type: String,
    },
    role_category_3: {
        type: String,
    },
    role_category_4: {
        type: String,
    },
    role_category_5: {
        type: String,
    },
    role_category_6: {
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

module.exports = mongoose.model('dd_roles_setup', Roles);

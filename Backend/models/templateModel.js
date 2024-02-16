const mongoose = require('mongoose');
const User = require('../models/adminModel');


const Schema = mongoose.Schema
const Template = new Schema({
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dd_admin',
  },
  quote_name: {
    type: String,
  },
  doc_tempData: [
    {
      doc_name: {
        type: String,
      },
      sections: [
        {
          section_name: {
            type: String,
          },
          section_value: [
            {
              key: {
                type: Number,
              },
              value: {
                type: String,
              },
              
            }
          ],
        }
      ],
    }
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  modifiedAt: {
    type: Date,
    default: new Date(),
  }
});


module.exports = mongoose.model('dd_templates', Template);
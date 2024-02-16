const mongoose = require('mongoose');
const Schema = mongoose.Schema
const ConfigSchema = new Schema({
          value1:{
            type: String,
          },
          value2:{
            type: String,
          },
          value3:{
            type: String,
          },
          value4:{
            type: String,
          },
          value5:{
            type: String,
          },
          value6:{
            type: String,
          },
          value7:{
            type: String,
          },
          value8:{
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

        module.exports = mongoose.model('dd_config', ConfigSchema);
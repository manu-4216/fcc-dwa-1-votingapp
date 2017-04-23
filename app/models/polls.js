'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [{
            text: String,
            votes: {
                type: Number,
                default: 0
            }
        }],
        validate: [arrayLimit, '{PATH} needs at least 2 options']
    }
});

module.exports = mongoose.model('User', Poll);


function arrayLimit(val) {
  return val.length >= 2;
}
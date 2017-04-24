'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
    author: {
        type: String,
        required: true
    },
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
    },
    created: { 
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Poll', Poll);


function arrayLimit(val) {
  return val.length >= 2;
}
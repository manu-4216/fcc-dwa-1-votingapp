'use strict';

var Polls = require('../models/polls.js');
var mongoose = require('mongoose');

function PollHandler () {

/*
	this.getClicks = function (req, res) {
		Polls
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.nbrClicks);
			});
	};
	*/
	

	this.addPoll = function (req, res) {
	    var newPoll = new Polls({
	    	author: req.user.github.username,
	        question: req.body.question,
	        options: req.body.options.filter(item => (item !== ''))
	    });
	    
	    newPoll.save(function (err, storedPoll) {
	    	var serverUrlBase = req.protocol + '://' + req.get('host')
	    	
	        if (err) {
	        	console.log('err', err)
	            return res.status(403).send(err)
	        }
	        var storedPollUrl = serverUrlBase + '/poll/' + storedPoll._id.toString();
	        res.status(200).send(storedPollUrl);
	    })
	    
	    /*
		Polls
			.find({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
			*/
	};
	
	this.getPoll = function (req, res) {
		var queryId = new mongoose.mongo.ObjectId(req.params.id)

		Polls.findOne({ _id: queryId })
        .then(function (result) {
        	console.log('result find', result);
        	
            res.send({
            	author: result.author,
                question: result.question,
                created: result.created,
                options: result.options,
                votes: result.votes
            })
        })
        .catch(function (err) {
            res.send(err)
        })
	}

/*
	this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};
	*/

}

module.exports = PollHandler;

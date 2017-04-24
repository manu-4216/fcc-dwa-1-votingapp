'use strict';

var Polls = require('../models/polls.js');

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
	    console.log('question: ', req.body.question)
	    console.log('options:', req.body.options)
	    //res.send('ok')
	    
	    var newPoll = new Polls({
	    	author: req.user.github.username,
	        question: req.body.question,
	        options: req.body.options.map(option => { 
	        	return { 
	        		text: option
	        	}
	        })
	    });
	    
	    newPoll.save(function (err, storedPoll) {
	        if (err) {
	        	console.log(err)
	            res.send(err)
	        }
	        res.status(200).send(storedPoll._id.toString())
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

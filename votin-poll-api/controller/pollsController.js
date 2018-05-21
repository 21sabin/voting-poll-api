const Router = require("express").Router;


let router = Router();

const PollModel = require('../models/pollModel');
const OptionModel = require('../models/optionsModel');
const VoteModel = require('../models/voteModel');

const PollService = require("../services/pollService");

// let pollService = new PollService();

router.post('/', (req, res) => {

    let optionModel = new OptionModel({
        options: req.body.options
    });
    optionModel.save((err, result) => {
        if (err) {
            return res.status(500).json({
                message: "couldnot save options",
                error: err
            });
        }

        let pollModel = new PollModel({
            poll: req.body.poll,
            isAnonymous: req.body.isAnonymous,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            options: result._id
        });
        pollModel.save((err, poll) => {
            if (err) {
                return res.status(500).json({
                    message: "couldont create poll",
                    error: err
                })
            }

            res.status(201).json({
                message: "sucessfully poll created",
                obj: poll
            })
        })
    })
});



router.get('/', (req, res) => {
    PollModel.find().populate("options").exec((err, polls) => {
        if (err) {
            return res.status(500).json({
                message: "couldnot find polls",
                error: err
            });
        }
        res.status(200).json({
            message: "polls list",
            obj: polls
        })
    })

});


router.get('/:id', (req, res) => {

    PollModel.findById(req.params.id, (err, poll) => {
        if (err) {
            return res.status(404).json({
                message: "Poll not found!",
                err: error
            });
        }
        let optionId = poll.options[0];
        OptionModel.findById(optionId, (err, options) => {
            if (err) {
                return res.status(404).json({
                    message: "options not found!",
                    err: error
                });
            }

            res.status(200).json({
                sucess: "polls and options",
                poll: poll,
                options: options
            })
        })
    })

})


router.post('/vote', (req, res) => {
    let voteModel = new VoteModel({
        poll: req.body.poll,
        options: req.body.option
    });
    voteModel.save((err, vote) => {
        if (err) {
            return res.status(500).json({
                message: "couldnot save vote",
                error: err
            })
        }
        res.status(201).json({
            message: "sucessfully stored vote",
            obj: vote
        })
    })
})

router.post('/vote/totalCounts', (req, res) => {
    console.log("inside totalcoumt",req.body.poll)
    let poll=req.body.poll;

   VoteModel.count({poll:poll},(err,count)=>{
    if (err) {
        return res.status(500).json({
            message: "couldnot count vote",
            error: err
        })
    }
    console.log("count",count)
    res.status(200).json({
        message:"sucessfully count",
        count:count
    })

   })
})





module.exports = router;



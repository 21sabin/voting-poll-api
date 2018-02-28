const Router = require("express").Router;


let router = Router();

const PollModel = require('../models/pollModel');
const OptionModel = require('../models/optionsModel');

const PollService = require("../services/pollService");

// let pollService = new PollService();

router.post('/', (req, res) => {
    console.log("inside controller req body", req.body.startDate);
    
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

            let pollModel=new PollModel({
                poll:req.body.poll,
                isAnonymous:req.body.isAnonymous,
                startDate:req.body.startDate,
                endDate:req.body.endDate,
                options:result._id
            });
            pollModel.save((err,poll)=>{
                if(err){
                   return res.status(500).json({
                        message:"couldont create poll",
                        error:err
                    })
                }

                res.status(201).json({
                    message:"sucessfully poll created",
                    obj:poll
                })
            })
        })
    });
    


router.get('/', (req, res) => {
    PollModel.find().populate("options").exec((err,polls)=>{
        if (err) {
            return res.status(500).json({
                message: "couldnot find polls",
                error: err
            });
        }
        res.status(200).json({
            message:"polls list",
            obj:polls
        })
    })

})


module.exports = router;



const Router = require("express").Router;
let router = Router();

const PollService = require("../services/pollService");

let pollService = new PollService();

router.post('/', (req, res) => {
    console.log("inside controller req body", req.body);

    pollService.createPoll(req.body).then((poll) => {
        res.status(201).json({
            message: "poll is created sucessfully",
            obj: poll
        });
    });
});


router.get('/', (req, res) => {
   
    pollService.getPoll().then((polls) => {
        if (!polls) {
            return res.json({
                message: "empty poll"
            })
        }
        res.status(200).json({
            message: "sucessfully polls",
            obj: polls
        })
    }).catch((err) => {
        res.status(500).json({
            message: "couldnot find polls",
            error: err
        })
    })
})


module.exports = router;



const PollModel = require('../models/pollModel');
const OptionModel = require('../models/optionsModel');

class PollService {

    createPoll(poll) {
        let pollModel = new PollModel({
            poll: poll.poll
        });

        pollModel.save((err, resPoll) => {

            if (err) {
                return resizeBy.status(500).json({
                    message: "Couldnont save poll",
                    obj: err
                });
            }

            let optionModel = new OptionModel({
                options: poll.options,
                poll: resPoll._id
            })

            optionModel.save((err, option) => {
                if (err) {
                    return resizeBy.status(500).json({
                        message: "Couldnont save option",
                        obj: err
                    });
                }

                res.status(201).json({
                    message:'options stored sucessully',
                    obj:err
                });
            });

            res.status(201).json({
                message:'poll created sucessully',
                obj:err
            });

        })
    }

    getPoll() {

    }
}

module.exports = PollService;
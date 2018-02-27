const PollModel=require('../models/polls');

class PollService{

    createPoll(poll){
       return  PollModel.create({
            question:poll.question,
            options:poll.options
        })
    }

    getPoll(){
        return PollModel.findAll();
    }
}

module.exports=PollService;
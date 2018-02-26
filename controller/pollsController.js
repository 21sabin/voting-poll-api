const Router=require("express").Router;
let router=Router();

const PollService=require("../services/pollService");

let pollService=new PollService();

router.post('/',(req,res)=>{
    console.log("inside controller req body",req.body);
    
    pollService.createPoll(req.body).then((poll)=>{
        res.status(201).json({
            message:"poll is created sucessfully",
            obj:poll
        });
    });
});


module.exports=router;



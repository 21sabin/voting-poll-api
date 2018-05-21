const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose')

const VoteModel = require('../models/voteModel');

router.post('/', (req, res) => {

    //let pollId = mongoose.Types.ObjectId(req.body.poll)
    console.log(req.body.pollId, "pollId", req.body.option)

    let voteModel = new VoteModel({
        pollId: req.body.pollId,
        options: req.body.option,
        userId:req.body.userId
    });

    VoteModel.findOne({userId:req.body.userId,pollId:req.body.pollId},(err,result)=>{
        if(err){
            return res.status(500).json({
                message:"couldnot find userId",
                err:err
            })
        }
        console.log(result,"result ")
        if(result){
            res.json({
                sucess:false,
                message:"You cannot vote twice !"
            })
        }else{
            voteModel.save((err, vote) => {
                
                if (err) {
                    return res.status(500).json({
                        message: "couldnot save vote",
                        error: err
                    })
                }
                VoteModel.count({ pollId: req.body.pollId }, (err, count) => {
                    if (err) {
                        return res.status(500).json({
                            message: "error in count vote",
                            error: err
                        })
                    }
        
                  return  res.status(201).json({
                        message: "sucessfully stored vote",
                        sucess:true,
                        obj: vote
                    })
        
                })
        
            })
        }
    })

    
})

router.get('/count/:id', (req, res) => {
   VoteModel.count({pollId:req.params.id},(err,count)=>{
    if (err) {
        return res.status(500).json({
            message: "error in count vote",
            error: err
        })
    }
   return res.status(200).json({
        count:count,
        message:"sucess"
    })
   })
})


router.get('/counts/:pollId',(req,res)=>{
    console.log("pollId1",req.params)
        VoteModel.aggregate([
            {
                 $match: {
                     pollId:req.params.pollId
                 }
            },
            {
                $group:{
                    _id:"$options",
                    count:{$sum:1}
                }
            }
        ],(err,result)=>{
            console.log("result",result)
            if (err) {
                return res.status(500).json({
                    message: "errror in aggregate",
                    error: err
                })
            }
           return res.status(200).json({
                count:result,
                message:"sucess"
            })
        })
})


module.exports = router;


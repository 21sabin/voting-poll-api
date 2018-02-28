const mongoose=require('mongoose');

let Schema=mongoose.Schema;

var PollSchema=mongoose.Schema({
    poll:{
        type:String,
        required:true
    },
    isAnonymous:{
        type:String,
        required:true
    },
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },
    options:[{type:Schema.Types.ObjectId,ref:"OptionModel"}]
});

const PollModel=module.exports=mongoose.model("PollModel",PollSchema);
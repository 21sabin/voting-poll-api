
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let VoteModelSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    pollId:{
        // type:Schema.Types.ObjectId,
        type:String,
        required:true
    },
    options:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model("VoteModel",VoteModelSchema);


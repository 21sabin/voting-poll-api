const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let OptionSchema = mongoose.Schema({
    options: {
        type:[],
        required: true
    },
    poll:{type:Schema.Types.ObjectId,ref:"PollModel"}
});

const OptionModel=module.exports=mongoose.model("OptionModel",OptionSchema);


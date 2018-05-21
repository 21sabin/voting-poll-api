const mongoose=require('mongoose');
let Schema=mongoose.Schema;
const UserSchema=mongoose.Schema({
    username:{
        type:String,
    },
    email:String,
    password:String,
    active:String
})

module.exports=mongoose.model("UserModel",UserSchema);
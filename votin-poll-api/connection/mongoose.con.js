const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/votting_poll");
mongoose.Promise = global.Promise;

mongoose.connection.on('connect',()=>{
    console.log("connected to mongodb sucessfully");
});

mongoose.connection.on('error',(err)=>{
    console.log("connection failed",err)
});

module.exports=mongoose;
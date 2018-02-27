

const Sequelize=require("sequelize");
const sequelize=require("../connection/dbConn");


var Polls=sequelize.define('polls',{
    question:{
        type:Sequelize.STRING,
        allowNull:false
    },
    options:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports=Polls;
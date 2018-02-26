const Sequelize = require("sequelize");

//establishing connection to mysql database
const sequelize = new Sequelize('voting_poll', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    define: {
        timestamps: false
    }
});
//testing the connection
sequelize.authenticate()
.then(()=>{
    console.log("connection has been established sucessfully")
})
.catch((err)=>{
    console.log("unable to connect to database",err)
})

sequelize.sync();


module.exports = sequelize;
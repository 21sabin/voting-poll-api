const Router = require('express').Router;
let router = Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const UserModel = require('./../models/userModel');


router.post('/login', (req, res) => {
    console.log("email", req.body)
    UserModel.findOne({ email: req.body.email}, (err, user) => {
        if (err) {
            return res.status(404).json({
                message: "user not found",
                err: err
            })
        }
        if (!user) {
           
            return res.json({
                sucess: false,
                message: 'Authntication failed.User not found'
            })
        }
        console.log(req.body.password)

        if(!bcrypt.compareSync(req.body.password,user.password)){
            res.json({
                sucess:false,
                message:"Authentication failed"

            })
        }


        const payload = {
            user: user.username,
            id: user._id
        };


        var token = jwt.sign(payload, 'secret', { expiresIn: 7200 });
        
        res.json({
            sucess: true,
            message: "enjoy your token",
            token: token,
            userId:user._id
        })
      


    })
});


router.post('/users', (req, res) => {
    let userModel = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        active: req.body.active
    });

    userModel.save((err, result) => {
        if (err) {
            return res.status(500).json({
                message: "error in creating user"
            })
        }
        res.status(201).json({
            message: "user created",
            user: result
        })
    })
})

module.exports = router;



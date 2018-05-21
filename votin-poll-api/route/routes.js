const Router=require("express").Router;
let router=Router();

const pollsController=require("../controller/pollsController");
const voteController=require("../controller/voteController");
const authController=require('../controller/authController');


router.use('/polls',pollsController);
router.use('/votes',voteController);
router.use('/auth',authController);

module.exports=router;
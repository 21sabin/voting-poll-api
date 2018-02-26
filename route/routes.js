const Router=require("express").Router;
let router=Router();

const pollsController=require("../controller/pollsController");


router.use('/polls',pollsController);

module.exports=router;
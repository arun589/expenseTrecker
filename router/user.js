const express=require('express');
const usercontroller=require("../controller/signcontroller");
const router=express.Router();

router.post('/signup',usercontroller.adduser);

router.post('/login',usercontroller.login);

module.exports=router;
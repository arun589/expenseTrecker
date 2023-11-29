const express=require('express');
const resetcontroller=require("../controller/resetcontroller");
const router=express.Router();

router.post('/forgotpassword',resetcontroller.forgotpassword);


module.exports=router;
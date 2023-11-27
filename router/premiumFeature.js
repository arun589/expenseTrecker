const express=require('express');
const router=express.Router();
const premiumcontroller=require('../controller/premium');
const authentication=require('../middleware/auth');
router.get('/showleaderboard',authentication.authenticate,premiumcontroller.getUserLeaderBoard);
module.exports=router;

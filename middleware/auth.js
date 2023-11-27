const jwt=require('jsonwebtoken');
const User=require('../model/signup');
const order=require('../model/orders');

const authenticate=(req,res,next)=>{
    try{
        const token=req.header('Authorization');
        const user=jwt.verify(token,"secretKey");
        //console.log("userrrriddddd",user.userId);
        console.log("ispremium",user.ispremiumuser);
        User.findByPk(user.userId)
        .then(user=>{
            console.log(JSON.stringify(user));
            req.user=user;
            next();
        })
        .catch(err=>{throw new Error(err);}) 
    }
    catch(err){
        console.log(err);
        return res.status(401).json({success:false});
    }
}
module.exports={
    authenticate
}
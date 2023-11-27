const user1=require('../model/signup');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

function isStringValid(string){
    if(string==undefined||string.length===0)
    {
        return true;
    }
    return false;

}
function generateAccessToken(id,name,ispremiumuser){
    return jwt.sign({userId:id,name:name,ispremiumuser},"secretKey");
}
exports.adduser=async(req,res,next)=>{
   try{
        const name1=req.body.username;
        const email1=req.body.email;
        const password1=req.body.password;
        if(isStringValid(name1)||isStringValid(password1)||isStringValid(email1)){
            return res.status(400).json({message:"bad parameters.something is missing"})
        }
        const saltrounds=10;
        bcrypt.hash(password1,saltrounds,async(err,hash)=>{
            const data=await user1.create({name:name1,email:email1,password:hash});
            res.status(201).json({message:"success"});
        })

    }
    catch(err){
        console.log(6);
        res.status(500).json({
            error:err
        })
    }
}
exports.login=async(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    if(isStringValid(email)||isStringValid(password)){
        return res.status(400).json({message:"bad parameters.something is missing",success:false})
    }
   
    try{
        const user=await user1.findAll({where:{email}})
        console.log(user);
        
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(err){
                    throw new Error("something went wrong");
                }
                if(result===true)
                {
                    res.status(200).json({success:true,message:"user logged in succesfully",token:generateAccessToken(user[0].id,user[0].name,user[0].ispremiumuser)})
                }
                else{
                    return res.status(400).json({message:"password is incorrect",success:false})
                }
            })

        }
        else{
            return res.status(404).json({message:"user does not exist",success:false})
        }
    }
    catch(err){
        res.status(500).json({message:err,success:false});
    }
}
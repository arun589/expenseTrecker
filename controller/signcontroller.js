const user1=require('../model/signup');
exports.adduser=async(req,res,next)=>{
   try{
        const name1=req.body.username;
        const email1=req.body.email;
        const password1=req.body.password;
        const data=await user1.create({name:name1,email:email1,password:password1});
        res.status(201).json({message:"success"});

    }
    catch(err){
        console.log(6);
        res.status(500).json({
            error:err
        })
    }
}
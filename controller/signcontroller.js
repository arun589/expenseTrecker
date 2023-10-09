const user1=require('../model/signup');
function isStringValid(string){
    if(string==undefined||string.length===0)
    {
        return true;
    }
    return false;

}
exports.adduser=async(req,res,next)=>{
   try{
        const name1=req.body.username;
        const email1=req.body.email;
        const password1=req.body.password;
        if(isStringValid(name1)||isStringValid(password1)||isStringValid(email1)){
            return res.status(400).json({message:"bad parameters.something is missing"})
        }
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
exports.login=async(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    if(isStringValid(email)||isStringValid(password)){
        return res.status(400).json({message:"bad parameters.something is missing",success:false})
    }
   
    try{
        const user=await user1.findAll({where:{email}})
        
        if(user.length>0){
            if(user[0].password===password){
                res.status(200).json({success:true,message:"user logged in succesfully"})
            }
            else{
                
                return res.status(400).json({message:"password is incorrect",success:false})
            }

        }
        else{
            return res.status(404).json({message:"user does not exist",success:false})
        }
    }
    catch(err){
        res.status(500).json({message:err,success:false});
    }
}
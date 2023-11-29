const Sib=require('sib-api-v3-sdk');
require('dotenv').config();
exports.forgotpassword=async(req,res)=>{
    try{
        console.log("heloo");
        const client=Sib.ApiClient.instance
        const apikey=client.authentications['api-key']
        apikey.apikey=process.env.API_KEY
        const tranEmailApi=new Sib.TransactionalEmailsApi()
        const sender={
            email:"kmarun2002@gmail.com",
        }
        const receiver={
            email:'vsvelu003@gmail.com'
        }
        tranEmailApi.sendTransacEmail({
            sender,
            to:receiver,
            subject:'reset password',
            textContent:`Reset password to expense tracker`
        })

    }catch(err){
        console.log(21);
    }
}

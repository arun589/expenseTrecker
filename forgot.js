async function forgotPassword(event){
try{
    event.preventDefault();
    const email=event.target.email.value;
    const forgot={
        email
    }
    console.log(forgot);
    let login=await axios.post("http://localhost:3000/forgot/forgotpassword",forgot);
    //alert(login.data.message);
    if(login.status===202){
        document.body.innerHTML+=`<div style="color:red;">mail successfully sent</div>`
    }
    
}
catch(err){
    console.log(err);
    document.body.innerHTML+=`<div style="color:red;">${err}</div>`
}

}
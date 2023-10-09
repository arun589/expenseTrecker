async function login(event){
    try{
        event.preventDefault();
        const email=event.target.email.value;
        const password=event.target.password.value;
        const logindetails={
            email,password
        }
        console.log(logindetails);
        let login=await axios.post("http://localhost:3000/user/login",logindetails);
        alert(login.data.message);
    }
    catch(err){
        console.log(err);
        document.body.innerHTML+=`<div style="color:red;">${err.message}</div>`
    }
    
}
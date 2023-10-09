async function signup(event){
    try{
        event.preventDefault();
        const username=event.target.username.value;
        const email=event.target.email.value;
        const password=event.target.password.value;
        const userdetail={
            username,
            email,
            password
        };
        console.log(userdetail);
        let response=await axios.post("http://localhost:3000/user/signup",userdetail)
        if(response.status==201){
           console.log(response);
           window.location.href="./login.html"
        }
        else{
            throw new Error("failed to login");
        }
       
        
        
    }
    catch(err){
        document.body.innerHTML+=`<div style="color:red">${err}</div>`
    }
}
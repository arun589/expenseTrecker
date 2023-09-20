async function signup(e){
    try{
        e.preventDefault();
        const name=e.target.username;
        const email=e.target.email;
        const password=e.target.password;
        const userdetail={
            name,
            email,
            password
        };
        console.log(userdetail)
        let response=await axios.post("http://localhost:3000/user/signup",userdetail)
        if(response.status==201){
            window.location.href="../login"
        }
        else{
            throw new Error("failed to login");
        }
        
    }
    catch(err){
        document.body.innerHTML+=`<div style="color:red">${err}</div>`
    }
}
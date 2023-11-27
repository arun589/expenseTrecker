function save(event){
    event.preventDefault();
    const price=event.target.price.value;
    const description=event.target.description.value;
    const category=event.target.category.value;
    const obj={
        price,description,category
    };
    const token=localStorage.getItem("token");
    axios.post("http://localhost:3000/expense/addexpense",obj,{headers:{"Authorization":token}})
    .then(res=>{
        console.log(res.data.newexpense);
        screen(res.data.newexpense);
    })
    .catch(err=>{
        console.log(err);
    });
}
function screen(obj){
    let parent=document.getElementById("list");
    let child=document.createElement("li");
    child.textContent=obj.price+" - "+obj.description+" - "+obj.category+" ";
    const delbtn=document.createElement("button");
    //delbtn.type="button";
    delbtn.innerHTML="Delete expense";
    delbtn.onclick=()=>{
        const id=obj.id;
        console.log(id);
        const token=localStorage.getItem("token");
        axios.delete(`http://localhost:3000/expense/deleteexpense/${id}`,{headers:{"Authorization":token}})
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
        parent.removeChild(child);
    }
    child.appendChild(delbtn);
    parent.appendChild(child);
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function showpremiumuser(){
    document.getElementById('razorpay').style.visibility="hidden";
    document.getElementById('message').innerHTML="you are premium user";
}

window.addEventListener("DOMContentLoaded",()=>{
  
    const token=localStorage.getItem("token");
    const decodedToken=parseJwt(token);
    console.log(decodedToken);
    const isadmin=decodedToken.ispremiumuser;
    console.log(isadmin);
    if(isadmin){
        document.getElementById('razorpay').style.visibility="hidden";
        document.getElementById('message').innerHTML="you are premium user";
        showleaderboard();
    }
axios.get("http://localhost:3000/expense/get",{headers:{"Authorization":token}})
    .then((res)=>{
        console.log(res);
        for(let i=0;i<res.data.allexpense.length;i++){
            screen(res.data.allexpense[i])
        }
    })
    .catch(err=>console.log(err));
})
document.getElementById('razorpay').onclick=async function(e){
    const token=localStorage.getItem('token')
    const response=await axios.get("http://localhost:3000/purchase/premiummembership",{headers:{"Authorization":token}});
   // alert(response.data.key_id);
    //alert(response.razorpay_payment_id);
    console.log(response.data);
    alert(response.data.order.id)
    
   var options={
    "key":response.data.key_id,
    "order_id":response.data.order.id,
    "handler": async function(response){
        await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
            order_id:options.order_id,
            payment_id:response.razorpay_payment_id,
        },{headers:{"Authorization":token}});

        document.getElementById('razorpay').style.visibility="hidden";
        document.getElementById('message').innerHTML="you are premium user";
        localStorage.setItem('token',res.data.token);
        alert("you are a premium user");
        showleaderboard();

    },

   };
   const rzp1=new Razorpay(options);
   rzp1.open();
   e.preventDefault();
   rzp1.on('payment.failed', function (response){
    console.log(response)
    alert('something went wrong');
   })
}
function showleaderboard(){
    const inputelement=document.createElement("input");
    inputelement.type="button";
    inputelement.value="show leaderboard";
    inputelement.onclick=async()=>{
        //alert("12");
        const token=localStorage.getItem("token");
        const leaderboardArray=await axios.get("http://localhost:3000/premium/showleaderboard",{headers:{"Authorization":token}})
        console.log(leaderboardArray);
        var leaderboardElem=document.getElementById('leaderBoard');
        leaderboardElem.innerHTML+='<h1>LeaderBoard</h1>'
        leaderboardArray.data.forEach((userDetails)=>{
            leaderboardElem.innerHTML+=`<li>Name -${userDetails.name}  Total cost ${userDetails.totalcost}`
        });
    }
    document.getElementById("message").appendChild(inputelement);
}
function save(event){
    event.preventDefault();
    const price=event.target.price.value;
    const description=event.target.description.value;
    const category=event.target.category.value;
    const obj={
        price,description,category
    };
    axios.post("http://localhost:3000/expense/addexpense",obj)
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
        axios.delete(`http://localhost:3000/expense/deleteexpense/${id}`)
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
        parent.removeChild(child);
    }
    child.appendChild(delbtn);
    parent.appendChild(child);
}
window.addEventListener("DOMContentLoaded",()=>{
axios.get("http://localhost:3000/expense/get")
    .then((res)=>{
        console.log(res);
        for(let i=0;i<res.data.allexpense.length;i++){
            screen(res.data.allexpense[i])
        }
    })
    .catch(err=>console.log(err));
})
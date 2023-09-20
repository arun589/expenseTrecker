const path=require("path");
const express=require("express");
const bodyparser=require("body-parser");
const cors=require('cors');
const app=express();
app.use(bodyparser.json({extended:false}));
const sequelize=require('./util/database');
const signup=require("./controller/signcontroller");
app.use(cors());
app.post("/user/signup",signup.adduser);
sequelize.sync()
.then(res=>console.log("done"))
.catch(err=>console.log(err));
app.listen(3000)            
const path=require("path");
const express=require("express");
const bodyparser=require("body-parser");
const cors=require('cors');
const app=express();
app.use(bodyparser.json({extended:false}));
const sequelize=require('./util/database');
const userRoutes=require('./router/user');
app.use(cors());
app.use(express.json());
app.use('/user',userRoutes);
sequelize.sync()
.then(res=>console.log("done"))
.catch(err=>console.log(err));
app.listen(3000)            
const sequelize=require('../util/database');
const Sequelize=require('sequelize');
const user=sequelize.define("user",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
name:{
   type:Sequelize.STRING,
    
},
email:{
    type:Sequelize.STRING,
    unique:true
},
password:{
    type:Sequelize.STRING,
}
})
module.exports=user;

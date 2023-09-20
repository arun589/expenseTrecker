const Sequelize=require("sequelize");
const sequelize=new Sequelize("expenses","root","Arun@2002",{dialect:'mysql'});
module.exports=sequelize;
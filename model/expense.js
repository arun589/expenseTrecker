const sequelize=require('../util/database');
const Sequelize=require('sequelize');
const expense=sequelize.define("expense",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    price:{
        type:Sequelize.INTEGER,
        
    },
    description:{
        type:Sequelize.STRING,
        
    },
    category:{
        type:Sequelize.STRING,
        
    }
}
);
module.exports=expense;
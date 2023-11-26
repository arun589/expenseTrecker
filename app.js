const path=require("path");
const express=require("express");
const bodyparser=require("body-parser");
const cors=require('cors');
const app=express();
app.use(bodyparser.json({extended:false}));
const sequelize=require('./util/database');
const userRoutes=require('./router/user');
const expenseRoutes=require('./router/expenseRouter');
const purchaseRoutes=require('./router/purchase');
const user=require('./model/signup');
const expense=require('./model/expense');
const order=require('./model/orders');
app.use(cors());
app.use(express.json());
app.use('/user',userRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase',purchaseRoutes);
user.hasMany(expense);
expense.belongsTo(user);
user.hasMany(order);
order.belongsTo(user);  
sequelize.sync()
.then(res=>console.log("done"))
.catch(err=>console.log(err));
app.listen(3000)            
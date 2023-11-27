const user=require('../model/signup');
const expense=require('../model/expense');
const sequelize=require('../util/database');
exports.getuserleaderboard=async(req,res)=>{
    try{
        const user1=await user.findAll();
        const Expenses=await expense.findAll();
        const userAggregatedExpenses={};
        Expenses.forEach((expenses)=>{
            if(userAggregatedExpenses[expenses.userId]){
                userAggregatedExpenses[expenses.userId]=userAggregatedExpenses[expenses.userId]+expenses.price;
            }
            else{
                userAggregatedExpenses[expenses.userId]=expenses.price; 
            }
        })
        var userleaderboarddetails=[];
        user1.forEach((user)=>{
            userleaderboarddetails.push({name:user.name,totalcost:userAggregatedExpenses[user.id]||0})
        })
        userleaderboarddetails.sort((a,b)=>b.totalcost-a.totalcost);
        console.log(userleaderboarddetails);
        res.status(200).json(userleaderboarddetails);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}
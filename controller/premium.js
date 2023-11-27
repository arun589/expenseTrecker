const User = require('../model/signup');
const Expense = require('../model/expense');
const sequelize = require('../util/database');
const e = require('express');

const getUserLeaderBoard = async (req, res) => {
    try{
        const leaderboardofusers = await User.findAll({
            
            order:[['totalExpenses', 'DESC']]

        })
        console.log(leaderboardofusers);

        res.status(200).json(leaderboardofusers)

} catch (err){
    console.log(err)
    res.status(500).json(err)
}
}

module.exports = {
    getUserLeaderBoard
}
 
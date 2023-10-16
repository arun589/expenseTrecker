const express = require('express');

const expenseController = require('../controller/expensecontroller');
const userauthenticate=require('../middleware/auth')


const router = express.Router();

router.post('/addexpense',userauthenticate.authenticate, expenseController.addexpense )

router.get('/get',userauthenticate.authenticate , expenseController.getallexpense )

router.delete('/deleteexpense/:id',userauthenticate.authenticate , expenseController.deleteexpense)

module.exports = router;
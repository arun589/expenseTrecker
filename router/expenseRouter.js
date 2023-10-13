const express = require('express');

const expenseController = require('../controller/expensecontroller')


const router = express.Router();

router.post('/addexpense',  expenseController.addexpense )

router.get('/get',  expenseController.getallexpense )

router.delete('/deleteexpense/:id' , expenseController.deleteexpense)

module.exports = router;
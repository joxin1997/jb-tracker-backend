var employeeRouter = require('express').Router();
let employeeController = require('../Controllers/employeeController');


employeeRouter.post('/employee/register', employeeController.addEmployee);


employeeRouter.post('/employee/login', employeeController.loginEmployee);

module.exports = employeeRouter;

let employeeModel = require('../Models/employeeModel')
let jwt = require('jsonwebtoken');
const SECRET = 'thisismysecret';

let employeeController = {
   addEmployee: async(req, res, next)=> {
        try {
            let employees = await employeeModel.employee.find({email: req.body.email});
            if(employees && employees.length > 0){
                res.json({
                    statusCode: 409,
                    info: 'Data conflict'
                });
            }else{
                let employee = new employeeModel.employee({
                    first_name: req.body.firstName,
                    second_name: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password
                });
                employee.save().then((response) => {
                    res.json({
                        statusCode: 201,
                        info: "Employee registration successfull",
                        data: response
                    })
                }).catch((err) => {
                    console.log(err);
                    res.json({
                        statusCode: 400,
                        info: "Error in user sign up ",
                        data: err
                    })
                });
            }
        } catch (error) {
            console.log("error in catch",error);
            res.json({
                statusCode: 500,
                info: "Something went wrong",
                data: error
            })
        }
    },
    
    loginEmployee: async(req, res, next)=>{
        try {
            console.log("Req body params",req.body);
            let email = req.body.email;
            let password = req.body.password;
            let userDataArray = await userModel.employee.find({email: email});
            console.log("user Data Array ",userDataArray);
            if(userDataArray && userDataArray.length){
                let userData = userDataArray[0];
                if(userData.password == password){
                    console.log("Password matched");
                    let data = {
                        first_name: userData.first_name,
                        last_name: userData.last_name,
                        email: userData.email,
                        user_id: userData._id
                    }
                    jwt.sign({data:data}, SECRET,(err,token)=>{
                        if(err){
                            console.log('err',err);
                        }else{
                            console.log('token',token);
                            let response = {
                                token: token
                            }
                            res.json({
                                info: 'login successfull',
                                statusCode: 200,
                                data: response
                            })
                        }
                    })
                }else{
                    res.json({
                        info:"Wrong Credentials",
                        statusCode: 401
                    })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = employeeController
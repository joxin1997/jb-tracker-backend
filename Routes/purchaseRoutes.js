let purchaseRouter = require('express').Router();
const { default: mongoose } = require('mongoose');
let purchaseController = require('../Controllers/purchaseController');
let validation = require('../Middlewares/validation')

purchaseRouter.post('/addPurchase',validation.verifyToken,function paramValidation(req,res,next) {
    if(req.body && req.body.purchase && req.body.category && req.body.cost){
        next();
    }else{
        res.json({  
            info: 'invalid parameters',
            status: 200,
            data: []
        })
    }
},purchaseController.addPurchase);


purchaseRouter.get('/listPurchase',validation.verifyToken ,purchaseController.listPurchase);


purchaseRouter.get('/listByCategory',validation.verifyToken , purchaseController.listByCategory);

module.exports = purchaseRouter;

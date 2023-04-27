let purchaseModel = require('../Models/purchaseModel');

let purchaseController = {
   async listPurchase(req, res, next) {
        try {
            let data = await purchaseModel.purchase.find({user_id: req.user_id});
            console.log('data from purchase db',data);
            if(data && data.length){
                res.json({
                    status: 200,
                    info: 'Data successfully fetched',
                    data: data
                })
            }else{
                res.json({
                    info: 'no data found',
                    status: 400,
                    data: []
                })
            }
        } catch (error) {
            console.log("error in catch",error);
            res.json({
                info: 'error while fetching data',
                status: 500,
                data: []
            })
        }
    },
    async addPurchase(req, res, next){
        try {
            let newPurchase = new purchaseModel.purchase({
                purchase: req.body.purchase,
                category: req.body.category ? req.body.category : '',
                cost: req.body.cost,
                date: req.body.date ? req.body.date : new Date() ,
                user_id: req.user_id
            });
            newPurchase.save().then((data) => {
                res.json({
                    status: 201,
                    info: "Purchase successfully saved"
                })
            }).catch((err) => {
                console.log(err);
                res.json({
                    status: 400,
                    info: "Error in saving purchase ",
                })
            });
        } catch (error) {
            console.log("error in catch",error);
        }
    },
    async listByCategory(req, res, next) {
        try {
            let data = await purchaseModel.purchase.find({user_id: req.user_id, category: req.query.category});
            if(data && data.length){
                res.json({
                    status: 200,
                    info: 'Data successfully fetched',
                    data: data
                })
            }else{
                res.json({
                    info: 'no data found',
                    status: 400,
                    data: []
                })
            }
        } catch (error) {
            console.log("error in catch",error);
            res.json({
                info: 'error while fetching data',
                status: 500,
                data: []
            })
        }
    },
}

module.exports = purchaseController;
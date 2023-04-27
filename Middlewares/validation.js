let jwt = require('jsonwebtoken');
const SECRET = 'thisismysecret'; 

module.exports.verifyToken = (req, res, next) => {
    console.log("Token from UI", req.headers['verify-token']);
    jwt.verify(req.headers['verify-token'], SECRET, (err, data) => {
        if (err) {
            console.log(err);
            res.json({
                status: 400,
                info: 'Error in verify token'
            })
        } else {
            console.log("data   :", data.data);
            req.user_id = data.data.user_id;
            next();
        }
    });
}


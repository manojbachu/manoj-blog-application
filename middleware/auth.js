const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next){
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({
        msg: 'No token, Authorization denied'
    });

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(e){
        req.status(400).json({msg: 'Token is not valid'});
    }
}
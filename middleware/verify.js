const jwt=require('jsonwebtoken')

exports.verifyUser = (req, res, next) => {
    try{
        let token = req.headers.token;
        if(!token){
            return res.status(401).send({message:'access denied'});
        }
        let matched = jwt.verify(token, process.env.JWT_TOKEN);
        req.user=matched;
        next();
    }catch (e) {
        console.log(e);
        return res.status(400).send({message:'invalid token'});

    }
}
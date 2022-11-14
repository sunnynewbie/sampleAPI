const { login, updateuser, forgotpassword, resetpassword,uploadImage, getpostByUser} = require("../database/model/userModel");
const user = require("../database/schema/user");
const { responseData, passwordGenerator } = require("../utils/helper");
const { userValidate } = require("../utils/validator")

exports.signup = async (req, res, next) => {
    userValidate.validateAsync(req.body).then(async (value) => {
        try {
            let request = req.body;
            request.password = passwordGenerator(req.body.password);
            let result = await user.create(request);
            return res.status(200).send(responseData(true, "", result));
        } catch (error) {
            console.log(error);
            return res.status(400).send(responseData(error, "", error));
        }

    }).catch(error => {
        console.log(error);
        return res.status(400).send(responseData(false, "error", error));

    })


}
exports.login = (req, res, next) => {
    login(req,res,next)
    .then(result=>{
        return res.status(200).send(result);
    }).catch(err=>{
        
        return res.status(400).send(err);
    });
}
exports.profile = (req, res, next) => {

}
exports.updateprofile = (req, res, next) => {
    if(req.body.password ||req.body.email){
        if(req.body.email){
            return res.status(400).send(responseData(false,"email not allowed",null) );   
        }
        if(req.body.password){
            return res.status(400).send(responseData(false,"password not allowed",null) );  
        }
    }
    updateuser(req,res,next).then(result=>{
        return res.status(200).send(result);
    })
    .catch(er=>{
        return res.status(400).send(er);
    })
}

exports.forgotpassword=(req,res,next)=>{
    forgotpassword(req,res,next)
    .then(result=>{
        res.status(200).send(result);
    })
    .catch(err=>{
        return  res.status(400).send(err);
    })
}

exports.resetPassword=(req,res,next)=>{
   resetpassword(req,res,next)
   .then((result)=>{
    console.log(result);
   return res.status(200).send(result);
   })
   .catch(err=>{
   return res.status(400).send(err);
   })
}
exports.getposts=(req,res,next)=>{
    getpostByUser(req,res,next)
   .then((result)=>{
    console.log(result);
   return res.status(200).send(result);
   })
   .catch(err=>{
   return res.status(400).send(err);
   })
}
exports.uploadimage=(req,res,next)=>{

    uploadImage(req,res,next);
    return {};
}


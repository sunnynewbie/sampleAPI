const { hashSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

exports.responseData=(status,message,data)=>{

    return {
        status:status,
        message:message,
        data:data
    };
};
exports.createToken=(userId)=>{
    let token =process.env.JWT_TOKEN;
    var authToken= sign(userId, token);
    return authToken;
};

exports.passwordGenerator=(password)=>{
    let salt=process.env.SALT;
    return hashSync(password);
};
exports.checkPasseword=(currentPass,storedPass)=>{
   return compareSync(currentPass,storedPass);
}

const sharp = require('sharp');
const { use } = require('../..');
const { responseData, checkPasseword, createToken, passwordGenerator } = require('../../utils/helper');
const userModel = require('./../schema/user');

exports.signup = (req, res, next) => {
    return new Promise(async (resolve, resject) => {
        try {
            let request = req.body;
            request.password = passwordGenerator(req.body.password);
            let result = await userModel.create(request);
            resolve(responseData(true, "", result));
        } catch (error) {
            resject(responseData(false, 'error', error));
        }

    });
}
exports.login = (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            let email = req.body.email;
            let userFound = await userModel.findOne({ email: email });
            if (!userFound) {
                reject(responseData(false, "user not found", null));
            } else {
                var value = checkPasseword(req.body.password, userFound.password);
                if (value) {
                    let token = createToken(userFound.id);
                    console.log(token);
                    var updateduser = await userModel.findByIdAndUpdate(
                        {
                            _id: userFound.id
                        },
                        {
                            $set: {
                                token: token
                            },
                        },
                        {
                            projection: {
                                __v: 0,
                                password: 0,
                            },
                            returnDocument: 'after'
                        }
                    );
                    resolve(responseData(true, '', updateduser));
                }

            }
        } catch (error) {
            reject(false, 'error', null);
        }
    });
}
exports.updateuser = (req, res, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            let id = req.params.id;
            var result = await userModel.findByIdAndUpdate({ _id: id, },
                {
                    $set: req.body,
                },
                {
                    projection: {
                        __v: 0,
                        password: 0,
                    },
                    returnDocument: 'after',

                });
            resolve(responseData(true, 'user updated', result));

        } catch (error) {
            console.log(error);
            reject(responseData(false, 'error', error));
        }
    });

}

exports.forgotpassword = (req, res, next) => {
    return new Promise(async (resolve, reject) => {

        try {

            let email = req.body.email;
            var user = await userModel.findOne({ email: email }, {
                __v: 0,
                token: 0,
                fname: 0,
                lname: 0,
                bio: 0,
                password: 0,
            },
            );
            if (user) {
                resolve(responseData(true, "user found", user));
            } else {
                reject(responseData(false, "user not found with this email"));
            }
        } catch (e) {
            reject(responseData(false, e, null));
        }
    });
}
exports.resetpassword = (req, res, next) => {
    return new Promise(async (resolve, reject) => {

        try {
            var password = req.body.password;
            encptpassword = passwordGenerator(password);
            var user = await userModel.findOneAndUpdate(
                {
                    _id: req.body.id,
                },
                { $set: { password: encptpassword }, },
                {
                    projection: {
                        _id: 0,
                        __v: 0,
                        password: 0,
                        fname: 0,
                        lname: 0,
                        bio: 0,
                        token: 0,
                        updatedAt: 0,

                    },
                    returnDocument: "after",
                },
            );
            resolve(responseData(true, "Passowrd updated", user));
        } catch (e) {
            reject(responseData(false, "password change failed", null));
        }
    });
}

exports.uploadImage = (req, res, next) => {

    return new Promise(async (resolve, reject) => {
        try { 
            res.send(req.file);
            return res;
        } catch (error) {
            console.log(error);
            return res;
        }

    })
}

exports.getpostByUser=(req,res,next)=>{
   return new Promise(async (resolve,reject)=>{
    try {
      let user= await userModel.find().populate('diary');
      resolve(user);
    } catch (error) {
        reject(error);
    }
    });
}

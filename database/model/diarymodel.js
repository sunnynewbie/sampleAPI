const diary = require('./../schema/diary');
const userModel = require('./../schema/user')
const multer = require('multer');
const { responseData } = require('../../utils/helper');
const { default: mongoose } = require('mongoose');


exports.addPost = (req, res, next) => {
    return new Promise(async (resolve,reject)=>{
        try {
            let post= await diary.create(req.body);
            await userModel.findOneAndUpdate({ _id: post.userid },
              {
                  $push: { 'diary':post._id },
              },
              {
                  returnDocument: "after"
              }
          );
          resolve(responseData(true,"Post added",post));
          } catch (error) {
            console.log(error);
              reject(responseData(false,"error adding post",null));
          }
    });
}

function uploadfiles(listfiles) {
    for (var i = 0; i < listfiles.length; i++) {

    }
}
const { addPost } = require("../database/model/diarymodel")

exports.addDiary=(req,res,next)=>{
    addPost(req,res,next)
    .then(result=>{
        res.status(200).send(result);
    }).catch(err=>{
        res.status(400).send(err);
    })
    
}
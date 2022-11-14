const route = require('express').Router();
const controller=require('./../controller/diaryctrl')

route.post('/addpost',controller.addDiary);

module.exports=route;
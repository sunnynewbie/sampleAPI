const express=require('express')
const cors=require('cors');
const userRoute=require('./../routes/userRoute')
const diaryRoute=require('./../routes/diaryRoutes')
const { urlencoded, json } = require('body-parser');

const app=express();

app.use(cors());
app.subscribe(urlencoded({extends:true}));
app.use(json());
app.use(express.static('./public'));

app.use('',userRoute)
app.use('/posts',diaryRoute)

module.exports=app;
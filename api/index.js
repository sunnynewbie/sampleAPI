const express=require('express')
const cors=require('cors');

const dotenv = require('dotenv');
dotenv.config();

const userRoute=require('../routes/userRoute')
const diaryRoute=require('../routes/diaryRoutes')
const { urlencoded, json } = require('body-parser');

const http =require('http')

const app=express();

app.use(cors());
app.subscribe(urlencoded({extends:true}));
app.use(json());
app.use(express.static('./public'));

app.use('/users',userRoute)
app.use('/posts',diaryRoute)

const port=process.env.PORT;
require('./../database/db/db');
app.listen(port,()=>{
    
console.log('server connected');
})
const server= http.createServer(app);

server.listen(port,()=>{
console.log('server connected');
});
module.exports=app;
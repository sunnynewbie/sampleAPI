const http =require('http')
const dotenv = require('dotenv');
dotenv.config();
const app=require('./app')
const port=process.env.PORT;
require('./database/db/db');
const server= http.createServer(app);

server.listen(port,()=>{
console.log('server connected');
});
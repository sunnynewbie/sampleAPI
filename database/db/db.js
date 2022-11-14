const mongoose=require('mongoose');

let url=process.env.URL;
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true ,
},(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log(`database connected`);
    }

});
module.exports=mongoose;
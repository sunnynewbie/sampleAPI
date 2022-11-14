const mongoose = require('mongoose');

const user = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        require: true,
        unique: true,
        index: true,
    },
    token:{
        type:String,
        trim:true,
    },
    fname:{
        type:String,
    },
    lname:{
        type:String,
    },
    email:{
        type:String,
        require:true,
        trim:true,
        validate:{
            validator:function(val){
                var regex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                return ((!val || val.trim().length) ||regex.test(val))
            },
            message:'Email is invalid.'
        },
    },
    password:{
        type:String,
        require:true,
        trim:true,
        validate:{
            validator:function(val){
                var regex=/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;
                return ((!val || val.trim().length) || regex.test(val));
            },
            message:'Password should have one capital one small one special character and minimum 8 length.'
        }
    },
    bio:{
        type:String,
        trim:true,
        maxlength:144,
    },
    diary:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'notes'
    }]
},{timestamps:true});

module.exports=mongoose.model('user',user);
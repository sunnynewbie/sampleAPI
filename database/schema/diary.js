const mongoose = require('mongoose')

const notes = mongoose.Schema({
    title: {
        type: String,
    },
    content:{
        type:String,
        trim:true,
        require:true,
    },
    userid:{
        type:mongoose.Types.ObjectId,
        require:true,
    },
    images:{
        type:Array,
    },
    audio:{
        type:Array,
    }
},{timestamps:true});

module.exports=mongoose.model('notes',notes);
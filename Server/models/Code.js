const mongoose = require("mongoose");

const codeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", 
        required: true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    title:{
        type:String,
        required:true,
    },
    code:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model("code",codeSchema);
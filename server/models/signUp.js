const mongoose=require('mongoose')

const loginSchema=new mongoose.Schema({
     userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    agreeTerms:{
        type:Boolean,
        required:true
    }
})
const loginModel = mongoose.model('loginModel',loginSchema)
module.exports=loginModel;
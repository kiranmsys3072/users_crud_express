const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
   role: {
    type:String,
    default:"admin"
   },
    phone:{
        type:Number
    },
    deleted:{
        type:Boolean,
        default:false
    }
})

module.exports=new mongoose.model('user',userSchema)
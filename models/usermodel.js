const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({



    fname:{
        type:String,
        required:true
    },

    lname:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    phone:{
        type:Number,
        required:true
        
    },

    password:{
        type:String,
        required:true
    },

    cpassword:{
        type:String,
        required:true
    },


    is_admin:{
        type:Number,
        required:true
    }

    

})

module.exports= mongoose.model('User',userSchema);
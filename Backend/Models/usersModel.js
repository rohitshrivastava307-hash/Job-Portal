const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const crypto = require('crypto')
const usersSchema=new mongoose.Schema({

     role:{
        type:String,
        enum:['job_seeker','recruiter'],
        default:'job_seeker'
    },
    name:{type:String,
        required:[true,"Please Provide Name"]

    },

    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true
    },

    password:{
        type:String,
        select:false,
        required:[true,"password required"],
        minlength:8,
    },
    confirmPassword:{
        type:String,
        required:[true,"confirm password required"],
        validate:{
            validator:function(v){
                return v===this.password

            },
            message:"password is not same"
        }
        
    },
passwordupdate:Date,
passwordResetToken: String,
passwordResetExpires: Date
})
usersSchema.methods.compare=async function(userpassword){
    return await bcrypt.compare(userpassword,this.password)

}

usersSchema.pre('save',async function(){

    if(!this.isModified('password'))return

    this.password=await bcrypt.hash(this.password,8)

    this.confirmPassword=undefined
    

})

usersSchema.methods.ispasswordupdate=async function(jwttime){
    if(this.passwordupdate){
        const passwordtime=parseInt(this.passwordupdate.getTime()/1000,10)
  console.log(passwordtime, jwttime)
        return passwordtime>jwttime
    }

    return false
  
}


usersSchema.methods.passwordReset=function(){

    
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}
const User=mongoose.model('User',usersSchema)

module.exports=User
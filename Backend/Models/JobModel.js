const mongoose=require('mongoose')

const JobSchema=new mongoose.Schema({

    title:{
        type:String,
        required:["true","Title is a required"]
},

  desc:{
        type:String,
        required:["true","desc is a required"]
},

  company:{
        type:String,
        required:["true","company is a required"]
},

  location:{
        type:String,
        required:["true","Locstion is a required"]
},
  createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
},
 createdAt:{
        type:Date,
        default:Date.now()
},

})

const Job=mongoose.model('Job',JobSchema)

module.exports = Job
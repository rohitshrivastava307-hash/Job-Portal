const mongoose=require('mongoose')
const dotenv=require('dotenv')

const connectdb=async()=>{

    try{
mongoose.connect(process.env.CON_STR)
console.log('You are now connected to Jobseeker Database')
    }


    catch(e){
       console.log('Some error occured in Jobseeker Database',e.message) 
       process.exit(1)

    }


}


module.exports=connectdb
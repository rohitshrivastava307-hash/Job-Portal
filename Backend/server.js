const dotenv=require("dotenv")
dotenv.config({path:'./config.env'})
const connectdb=require('./database')
const app=require('./app')
const port=process.env.PORT||4000
connectdb()
app.listen(port,()=>{
    console.log("server started")
})


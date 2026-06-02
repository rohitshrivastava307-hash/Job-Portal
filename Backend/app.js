const express=require('express')
const cors = require('cors')
const globalErrorHandler = require('./Controller/errorController')
const app=express()
app.use(cors())
app.use(express.json())
const userRoutes=require('./Router/usersRouter')
const jobRoutes=require('./Router/jobRouter')
app.use('/api/users',userRoutes)

app.use('/api/jobs',jobRoutes)
app.use(globalErrorHandler)
module.exports=app
// let express = require('express')
import express from "express"
import monggoDB from './config/connectDB'
import initRouter from './routes/web'
import configViewEngine from './config/viewEngine'
import bodyParser from 'body-parser'
import connectFlash from 'connect-flash'
import configSession from './config/session'
require('dotenv').config()
let app = express()


// connect mongodb
monggoDB()

// cấu hình session
configSession(app)
// config viewengine
configViewEngine(app)




app.use(bodyParser.urlencoded({extended: true}))

// enable flash
app.use(connectFlash())

initRouter(app)
app.listen(process.env.APP_PORT,(req,res)=> {
    console.log(`hello tu tran. I'm runiing at : ` + process.env.APP_PORT)
})

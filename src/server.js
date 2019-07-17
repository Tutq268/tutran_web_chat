// let express = require('express')
import express from "express"
import monggoDB from './config/connectDB'
import initRouter from './routes/web'
import configViewEngine from './config/viewEngine'
import bodyParser from 'body-parser'

require('dotenv').config()
let app = express()


// connect mongodb
monggoDB()

// config viewengine
configViewEngine(app)

app.use(bodyParser.urlencoded({extended: true}))

initRouter(app)
app.listen(process.env.APP_PORT,(req,res)=> {
    console.log(`hello tu tran. I'm runiing at : ` + process.env.APP_PORT)
})

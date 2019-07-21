// let express = require('express')
import express from "express"
import monggoDB from './config/connectDB'
import initRouter from './routes/web'
import configViewEngine from './config/viewEngine'
import bodyParser from 'body-parser'
import connectFlash from 'connect-flash'
import configSession from './config/session'
import passport from 'passport'

import pem from 'pem'
import https from 'https'
require('dotenv').config()
pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
    if (err) {
      throw err
    }
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
    
    ///config passport
    app.use(passport.initialize())
    app.use(passport.session())
    
    initRouter(app)
 
    https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(process.env.APP_PORT,(req,res)=> {
        console.log(`hello tu tran. I'm runiing at : ` + process.env.APP_PORT)
    })
  })

//   let app = express()


//   // connect mongodb
//   monggoDB()
  
//   // cấu hình session
//   configSession(app)
//   // config viewengine
//   configViewEngine(app)
  
  
  
  
//   app.use(bodyParser.urlencoded({extended: true}))
  
//   // enable flash
//   app.use(connectFlash())
  
//   ///config passport

//   app.use(passport.initialize())
//   app.use(passport.session())
  
//   initRouter(app)



// app.listen(process.env.APP_PORT,(req,res)=> {
//     console.log(`hello tu tran. I'm runiing at : ` + process.env.APP_PORT)
// })
    
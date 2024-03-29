// let express = require('express')
import express from "express"
import monggoDB from './config/connectDB'
import initRouter from './routes/web'
import configViewEngine from './config/viewEngine'
import bodyParser from 'body-parser'
import connectFlash from 'connect-flash'
import session from './config/session'
import passport from 'passport'

import pem from 'pem'
import http from 'http'
import socketio from 'socket.io'
import initSockets from './../src/socket/index'
import cookieParser from 'cookie-parser'
import passportSocketIo from 'passport.socketio'
require('dotenv').config()


let app = express()

  let server = http.createServer(app)
  let io = socketio(server)
  // connect mongodb
  monggoDB()
  
  // cấu hình session
  session.config(app)
  // config viewengine
  configViewEngine(app)
  
  
  
  
  app.use(bodyParser.urlencoded({extended: true}))
  
  // enable flash
  app.use(connectFlash())
  
  ///config passport
  
  


  app.use(passport.initialize())
  app.use(passport.session())
  
  initRouter(app)


  io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: "express.sid",
    secret: "mySecret",
    store: session.sessionStore,
    success : (data,accept) =>{
       if(!data.user.logged_in){
         return accept("Invalid User",false)
       }
       return accept(null,true)
    },
    fail : (data,message, error,accept) => {
       if(error){
         console.log("ket noi voi socket  io that bai",message)
         accept(new Error(message),false)
       }
    }
  }))

  initSockets(io)
  server.listen(process.env.APP_PORT,(req,res)=> {
    console.log(`hello tu tran. I'm runiing at : ` + process.env.APP_PORT)
})
    

// pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
//     if (err) {
//       throw err
//     }
//     let app = express()


//     // connect mongodb
//     monggoDB()
    
//     // cấu hình session
//     configSession(app)
//     // config viewengine
//     configViewEngine(app)
    
    
    
    
//     app.use(bodyParser.urlencoded({extended: true}))
    
//     // enable flash
//     app.use(connectFlash())
    
//     ///config passport
//     app.use(passport.initialize())
//     app.use(passport.session())
    
//     initRouter(app)
 
//     https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(process.env.APP_PORT,(req,res)=> {
//         console.log(`hello tu tran. I'm runiing at : ` + process.env.APP_PORT)
//     })
//   })

  
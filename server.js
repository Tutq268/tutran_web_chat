// let express = require('express')
import express from "express"
import monggoDB from './config/connectDB'
// import ContactModel from './models/contact.model'
import initRouter from './routes/web'

import configViewEngine from './config/viewEngine'

require('dotenv').config()
let app = express()


// connect mongodb
monggoDB()


// config viewengine
configViewEngine(app)

// app.get("/test-database",async (req,res)=> {
//     try {
//      let item = {
//          userId: '654321',
//          contactId: '194321439432'
//      }
//     //  let contact = await ContactModel.createNew(item)
//     let contact = await ContactModel.createNew(item)
//      res.send(contact)
//     }catch(err){
//         console.log(err)
//     }
// })

initRouter(app)
app.listen(process.env.APP_PORT,(req,res)=> {
    console.log(`hello tu tran. I'm runiing at : ` + process.env.APP_PORT)
})
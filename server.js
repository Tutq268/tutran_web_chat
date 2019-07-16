// let express = require('express')
import express from "express"
import monggoDB from './config/connectDB'
import ContactModel from './models/contact.model'
require('dotenv').config()
let app = express()


// connect mongodb
monggoDB()


app.get("/test-database",async (req,res)=> {
    try {
     let item = {
         userId: '123456',
         contactId: '194321439432'
     }
    //  let contact = await ContactModel.createNew(item)
    let contact = await ContactModel.createNew(item)
     res.send(contact)
    }catch(err){
        console.log(err)
    }
})

app.listen(process.env.APP_PORT,(req,res)=> {
    console.log(`hello tu tran. I'm runiing at : ` + process.env.APP_PORT)
})
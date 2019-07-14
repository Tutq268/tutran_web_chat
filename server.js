// let express = require('express')
import express from "express"
let app = express()

let hostname = "localhost"
let port = 8686


app.get("/helloworld",(req,res)=> {
    res.send("<h1>hello world </h1>")
})

app.listen(port,(req,res)=> {
    console.log(`hello tu tran. I'm runiing at : ` + port)
})
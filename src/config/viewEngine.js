import express from 'express'
import expressEjsExtend from 'express-ejs-extend'

// cấu hình view engine cho app
// import css from './../public'
let configViewEngine = (app) => {
  app.use(express.static("./src/public"))
  app.engine("ejs", expressEjsExtend)
  app.set("view engine","ejs")
  app.set("views","./src/views")
}

module.exports = configViewEngine
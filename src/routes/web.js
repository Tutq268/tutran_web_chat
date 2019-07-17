import express from 'express'
import {home, auth} from './../controllers/index'
import {authVali} from "./../validation/index"
let router = express.Router()

let initRouter = (app) => {
  router.get("/",home.getHome)
 router.get("/login-register",auth.getAuth)

 router.post("/register", authVali.register, home.postRegister)
 return app.use("/",router)
}
module.exports = initRouter

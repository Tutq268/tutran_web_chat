import express from 'express'
import {home, auth} from './../controllers/index'
import {authVali} from "./../validation/index"
let router = express.Router()

let initRouter = (app) => {
  router.get("/login-register",auth.getAuth)
 router.get("/",home.getHome)
  router.get("/verify/:token", auth.verifyAccount)
 router.post("/register", authVali.register, auth.postRegister)
 return app.use("/",router)
}

module.exports = initRouter

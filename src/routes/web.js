import express from 'express'
import {home, auth} from './../controllers/index'
import {authVali} from "./../validation/index"
import passport from 'passport'
import initPassportLocal from './../config/passportController/local'
// init all passport
initPassportLocal()

let router = express.Router()

let initRouter = (app) => {
  router.get("/login-register",auth.getAuth)
 router.get("/",home.getHome)
  router.get("/verify/:token", auth.verifyAccount)
 router.post("/register", authVali.register, auth.postRegister)
 router.post("/login",passport.authenticate("local",{
   successRedirect: "/",
   failureRedirect: "/login-register",
   successFlash: true,
   failureFlash: true,
   session: false
 }))
 return app.use("/",router)
}

module.exports = initRouter

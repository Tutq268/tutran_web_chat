import express from 'express'
import {home, auth} from './../controllers/index'
import {authVali} from "./../validation/index"
import passport from 'passport'
import initPassportLocal from './../config/passportController/local'
// init all passport
initPassportLocal()

let router = express.Router()

let initRouter = (app) => {
  router.get("/login-register",auth.checkLogout,auth.getAuth)
 
  router.get("/verify/:token",auth.checkLogout, auth.verifyAccount)
 router.post("/register",auth.checkLogout, authVali.register, auth.postRegister)
 router.post("/login",auth.checkLogout,passport.authenticate("local",{
   successRedirect: "/",
   failureRedirect: "/login-register",
   successFlash: true,
   failureFlash: true,
   session: false
 }))
 router.get("/logout",auth.checkLogin, auth.getLogout)
 router.get("/",auth.checkLogin ,home.getHome)
 return app.use("/",router)
}

module.exports = initRouter

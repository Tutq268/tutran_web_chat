import express from 'express'
import {home, auth, user, contact,notification} from './../controllers/index'
import {authVali,userVali,contactVali} from "./../validation/index"
import passport from 'passport'
import initPassportLocal from './../controllers/passportController/local'
import initPassportFacebook from './../controllers/passportController/facebook'
import initPassportGoogle from './../controllers/passportController/google'

// init all passport
initPassportLocal()
initPassportFacebook()
initPassportGoogle()
let router = express.Router()

let initRouter = (app) => {
  router.get("/login-register", auth.checkLogout,auth.getAuth)
 router.get("/", auth.checkLogin,home.getHome)
  router.get("/verify/:token", auth.checkLogout, auth.verifyAccount)
 router.post("/register", auth.checkLogout, authVali.register, auth.postRegister)
 router.get("/logout",auth.checkLogin, auth.getLogout)
router.put("/user/update-avatar",auth.checkLogin, user.updateAvatar)
router.put('/user/update-info',auth.checkLogin, userVali.checUser,user.updateUserInfo)
router.put("/user/update-password",auth.checkLogin,userVali.checkPassword,user.updatePasswordUser)




router.get('/contact/user-users/:keyword',auth.checkLogin,contactVali.checkContactKeyWord, contact.findContactUser)
router.post("/contact/add-new",auth.checkLogin,contact.addContact)
router.delete("/contact/remove-request-contact",auth.checkLogin,contact.removeContact)

 router.post("/login", auth.checkLogout,passport.authenticate("local",{
   successRedirect: "/",
   failureRedirect: "/login-register",
   successFlash: true,
   failureFlash: true,
  //  session: false
 }))
 
 router.get("/auth/facebook", auth.checkLogout,passport.authenticate("facebook", {scope: ["email"]}))
 router.get("/auth/facebook/callback",auth.checkLogout, passport.authenticate("facebook",{
  successRedirect: "/",
  failureRedirect: "/login-register"
 }))
 router.get("/auth/google",auth.checkLogout, passport.authenticate("google", {scope: ["email"]}))
 router.get("/auth/google/callback",auth.checkLogout,passport.authenticate("google",{
  successRedirect: "/",
  failureRedirect: "/login-register"
 }))

 router.get("/notification/read-more",auth.checkLogin,notification.readMoreNotification)

 return app.use("/",router)
}

module.exports = initRouter

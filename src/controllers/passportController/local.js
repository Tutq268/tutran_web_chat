import passport from 'passport'
import passportLocal from 'passport-local'
import UserModel from './../../models/userModel'
import {transError,transSuccess} from './../../../lang/vi'
let localStrategy = passportLocal.Strategy

let initPassportLocal = () => {
  passport.use(new localStrategy({
     usernameField: "email",
     passwordField : "password",
     passReqToCallback: true
  },async (req,email,password,done) =>{
    try{
      let user = await UserModel.findByEmail(email)
      if (!user){
        return done(null, false, re.flash("errors", transError.LOGIN_FAILED))
      }
      if(!user.local.isActive){
        return done(null,false,req.flash("errors", transError.ACCOUNT_NOT_ACTIVE))
      }

      let checkPassword = await user.comparePassword(password)
      if(!checkPassword){
        return done(null, false, req.flash("errors", transError.LOGIN_FAILED))
      }
      return done(null,user,req.flash("success",transSuccess.loginSuccess(user.userName)))
      
    }catch(error){
      return done(null,false,req.flash("errors","Loi Server!"))
    }
      
  }
  ))
   // save user id to sesstion
    passport.serializeUser((user,done) => {
      done(null, user._id)  
    })  

  passport.deserializeUser((id, done) => {
    UserModel.findUserById(id)
    .then(user => {
        return done(null,user)
    })
    .catch(error => {
        return done(null,error) 
    })
  })
}
module.exports = initPassportLocal
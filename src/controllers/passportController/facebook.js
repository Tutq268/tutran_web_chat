import passport from 'passport'
import passportFacebook from 'passport-facebook'
import UserModel from '../../models/userModel'
import {transError,transSuccess} from '../../../lang/vi'
let facebookStrategy = passportFacebook.Strategy

let initPassportFacebook= () => {
  passport.use(new facebookStrategy({
     clientID: "1167213170117637",
     // 
     clientSecret: "a12e8ac5a41fff50e58d6261e98e2965",
     callbackURL: "https://localhost:8686/auth/facebook/callback",
     passReqToCallback: true,
     profileFields: ["email","gender","displayName"] 
  },async (req,accessToken,refreshToken,profile,done) =>{
    try{
      let user = await UserModel.findByFacebookUid(profile.id)

      if(user){
        return done(null,user,req.flash("success",transSuccess.loginSuccess(user.userName)))
      }
      let newUserItem = {
        userName: profile.displayName,
        gender: profile.gender,
        local: {isActive: true},
        facebook: {
          uid: profile.id,
          token: accessToken,
          email: profile.emails[0].value  
        }
      }

      let newUser = await UserModel.createNew(newUserItem)
      return done(null,newUser,req.flash("success",transSuccess.loginSuccess(newUser.userName)))
    }catch(error){
      console.log(error)
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
      console.log(user)
        return done(null,user)
    })
    .catch(error => {
        return done(null,error) 
    })
  })
}
module.exports = initPassportFacebook   
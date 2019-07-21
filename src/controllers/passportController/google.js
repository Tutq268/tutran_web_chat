// 892120096957-uk8v4sr20ikpcam04kaa2u2vtgdcg5r0.apps.googleusercontent.com

// NkNkh0zWzgVhsnqEIj6ukRS2
import passport from 'passport'
import passportGoogleAuth from 'passport-google-oauth'
import UserModel from '../../models/userModel'
import {transError,transSuccess} from '../../../lang/vi'
let googleStrategy = passportGoogleAuth.OAuth2Strategy

let initPassportGoogle= () => {
  passport.use(new googleStrategy({
     clientID: "892120096957-uk8v4sr20ikpcam04kaa2u2vtgdcg5r0.apps.googleusercontent.com",
     // 
     clientSecret: "NkNkh0zWzgVhsnqEIj6ukRS2",
     callbackURL: "https://localhost:8686/auth/google/callback",
     passReqToCallback: true,
  },async (req,accessToken,refreshToken,profile,done) =>{
    try{
      let user = await UserModel.findByGoogleUid(profile.id)
       console.log(profile)
      if(user){
        return done(null,user,req.flash("success",transSuccess.loginSuccess(user.userName)))
      }
      let newUserItem = {
        userName: profile.displayName,
        gender: profile.gender,
        local: {isActive: true},
        google: {
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
module.exports = initPassportGoogle   
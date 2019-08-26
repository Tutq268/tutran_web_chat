import {validationResult} from "express-validator/check"
import {auth} from './../services/index'
import {transSuccess} from "./../../lang/vi"

let getLoginRegister = (req,res)=>{
  return res.render("auth/master",{
    errors: req.flash("errors"),
    success: req.flash("success")
  })
}
// check logIn

let checkLogin = (req,res,next) => {
  if(!req.isAuthenticated()){
    return res.redirect("/login-register")
  }
  next()
}
let checkLogout = (req,res,next) => {
  if(req.isAuthenticated()){
    return res.redirect("/")
  }
  next()
}


 let postRegister = async  (req,res)=>{
    let errorArr = []
    let successArr = []
    let validationError = validationResult(req)
    if (!validationError.isEmpty()){
       let errors =Object.values(validationError.mapped())
       errors.forEach(item => {
         errorArr.push(item.msg)
       });
       req.flash("errors",errorArr)
       return res.redirect("/login-register")
    }
    
   try {
   let createUserSucces = await auth.register(req.body.email,req.body.gender,req.body.password, req.protocol, req.get("host"))
    successArr.push(createUserSucces)
    req.flash("success", successArr)
    return res.redirect("/login-register")

   }
   catch(error){
    errorArr.push(error)
     req.flash("errors", errorArr)
     return res.redirect("/login-register")

   }
 }
  let verifyAccount = async (req,res) => {
    let verifyError= []
    let verifySuccess = []
    try {
      let verifyStatus = await auth.verifyAccount(req.params.token)
      verifySuccess.push(verifyStatus)
      req.flash("success", verifySuccess)
      return res.redirect("/login-register")
    } catch (error) {
      verifyError.push(error)
      req.flash("errors", verifyError)
      return res.redirect("/login-register")

    }
  } 

  let getLogout = (req,res) => {
     req.logout() //remove sesstion passport user

     req.flash("success", transSuccess.logout_success)
     return res.redirect("/login-register")
  }

  
module.exports = {
  getAuth: getLoginRegister,
  postRegister: postRegister,
  verifyAccount: verifyAccount,
  getLogout: getLogout,
  checkLogin: checkLogin,
  checkLogout: checkLogout
}


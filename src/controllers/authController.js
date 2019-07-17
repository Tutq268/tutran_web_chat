import {validationResult} from "express-validator/check"


let getLoginRegister = (req,res)=>{
  return res.render("auth/master",{
    errors: req.flash("errors"),
    success: req.flash("success")
  })

}

 let postRegister = (req,res)=>{
    let errorArr = []
    let validationError = validationResult(req)
    if (!validationError.isEmpty()){
       let errors =Object.values(validationError.mapped())
       errors.forEach(item => {
         errorArr.push(item.msg)
       });
       req.flash("errors",errorArr)
       return res.redirect("/login-register")
    }
    console.log(req.body)
 }

module.exports = {
  getAuth: getLoginRegister,
  postRegister: postRegister
}


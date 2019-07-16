 let getLoginRegister = (req,res)=>{
  return res.render("auth/loginRegister")

}
module.exports = {
  getHome: getLoginRegister
}
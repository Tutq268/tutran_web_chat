import {contact} from './../services/index'
import {validationResult} from "express-validator/check"


let findContactUser =  async (req,res) => {
  let errorArr = []
  let validationError = validationResult(req)
  if (!validationError.isEmpty()){
     let errors =Object.values(validationError.mapped())
     errors.forEach(item => {
       errorArr.push(item.msg)
     });

     return res.status(500).send(errorArr)
    }
   let keyword = req.params.keyword
   let id = req.user._id

   try {
   let userContact =  await contact.findContactUser(id,keyword)
   res.render("main/contactsModal/session/_findUserContact",{userContact})
   } catch (error) {
     res.status(500).send(error)
   }
}
module.exports = {
  findContactUser : findContactUser
}
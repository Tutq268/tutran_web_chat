import UserModel from './../models/userModel'
import bcrypt from 'bcrypt'
import uuidv4 from 'uuid/v4'
import { rejects } from 'assert';
import {transError, transSuccess,transSendMail} from "./../../lang/vi"
import { resolve } from 'url';
import sendMail from './../config/mailer'


let saltRounds = 7
let register =  (email,gender,password,protocol,host) => {
  return new Promise( async (resolve, rejects)=> {
    let userByEmail = await UserModel.findByEmail(email)
    if (userByEmail){
      if (userByEmail.deletedAt !== null)
    {
      return rejects(transError.ACCOUNT_DELETE)
    }
    if(!userByEmail.local.isActive){
      return rejects(transError.ACCOUNT_NOT_ACTIVE)
    }
      return rejects(transError.ACCOUNT_IN_USE)
    }
   
   
   let salt = bcrypt.genSaltSync(saltRounds)
    let userItem = {
      userName: email.split("@")[0],
      gender: gender,
      local: {
       email: email,
       password: bcrypt.hashSync(password, salt),
       verifyToken: uuidv4()
      }
    }
    let user =  await UserModel.createNew(userItem)
    let linkVerify = `${protocol}://${host}/verify/${user.local.verifyToken}`
    sendMail(email, transSendMail.subject, transSendMail.template(linkVerify))
    .then(success => {
      resolve(transSuccess.user_created(user.local.email))

    })
    .catch(async (error) => {
      // remove user
      console.log(error)
    await UserModel.removeById(user._id)
      rejects(transSendMail.SEND_MAIL_FAILED)
    })
  })
  
}

let verifyAccount = (token) => {
  return new Promise(async (resolve,rejects)=>{
    let userByToken = await UserModel.findByToken(token)
    if(!userByToken){
      return rejects(transError.TOKEN_UNDEFIED)
    }
     await UserModel.verify(token)
     resolve(transSuccess.account_active)
  })
}
module.exports = {
  register: register,
  verifyAccount: verifyAccount
}

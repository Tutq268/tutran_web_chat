import UserModel from './../models/userModel'
import bcrypt from 'bcrypt'
import uuidv4 from 'uuid/v4'
import { rejects } from 'assert';
import {transError, transSuccess} from "./../../lang/vi"
import { resolve } from 'url';


let saltRounds = 7
let register =  (email,gender,password) => {
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
      username: email.split("@")[0],
      gender: gender,
      local: {
       email: email,
       password: bcrypt.hashSync(password, salt),
       verifyToken: uuidv4()
      }
    }
    let user =  await UserModel.createNew(userItem)
    resolve(transSuccess.user_created(user.local.email))
  })
  
}
module.exports = {
  register: register
}
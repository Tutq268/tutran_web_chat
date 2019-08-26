import UserModel from './../models/userModel'
import { resolve } from 'path';
import { rejects } from 'assert';
import {transError} from './../../lang/vi'
import bccrypt from 'bcrypt'

const saltRound = 7
let updateUser = (id, item ) => {
   return UserModel.updateUser(id, item)
}
let updatePassword = (id, item) => {
  return new Promise(async (resolve,rejects) => {
     let currentUser = await UserModel.findUserById(id)
     if(!currentUser){
      return rejects(transError.currentuser)
     }
     
     let checkCurrentPassword = await currentUser.comparePassword(item.currentPassword)
     if(!checkCurrentPassword){
      return rejects(transError.user_current_password_failed)
     }
     
     let salt = bccrypt.genSaltSync(saltRound)
     await(UserModel.updatePassword(id,bccrypt.hashSync(item.newPassword, salt)))
     return resolve(true)
     
  })

}
module.exports = { 
  updateUser: updateUser,
  updatePassword:updatePassword
}
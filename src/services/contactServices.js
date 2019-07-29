import ContactModel from './../models/contactModel'
import UserModel from './../models/userModel'
import { resolve } from 'url';
import { rejects } from 'assert';
import _ from 'lodash'

let findContactUser = (currentUserId,keyword) =>{
   return new Promise( async (resolve,rejects)=> {
     let contactByUser = await ContactModel.findContact(currentUserId)
     if(!contactByUser){
       rejects("Khong co ai khac ngoai ban trong ung dung nay")
     }
     let deprecateUserIds = []

     contactByUser.forEach(item => {
       deprecateUserIds.push(item.userId)
       deprecateUserIds.push(item.contactId)
     })
     deprecateUserIds = _.uniqBy(deprecateUserIds)
     
     let findUserContact = await UserModel.findAllUserForContact(deprecateUserIds,keyword)
     if(!findUserContact){
       rejects("Hinh nhu khong co ai ngoai ban trong web chat nay. ahiiii!!!")
     }
     resolve(findUserContact)

   }) 
}
module.exports = {
  findContactUser : findContactUser
}
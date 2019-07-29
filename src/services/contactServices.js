import ContactModel from './../models/contactModel'
import UserModel from './../models/userModel'
import { resolve } from 'url';
import { rejects } from 'assert';
import _ from 'lodash'
import { user } from '.';

let findContactUser = (currentUserId,keyword) =>{
   return new Promise( async (resolve,rejects)=> {
     let contactByUser = await ContactModel.findContact(currentUserId)
     if(!contactByUser){
       rejects("Khong co ai khac ngoai ban trong ung dung nay")
     }
     let deprecateUserIds = [currentUserId]

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


let addContact = (currentUserId, targetId) =>{
  return new Promise( async (resolve,rejects)=>{

    let userExists = await ContactModel.checkExists(currentUserId,targetId)
    if(userExists){
      return rejects(false)
    }
    let newContact = {
      userId: currentUserId,
      contactId: targetId
    }
    let addNewContact = await ContactModel.createNew(newContact)
    resolve(addNewContact)
  })
}
let removeContactRequest = (currentID,targetId) => {
   return new Promise(async (resolve,rejects)=>{
     let removeContact  = await ContactModel.removeContact(currentID,targetId)
    if(removeContact.n ===0){
      return rejects(false)
    }
     resolve(true)
   })
}
module.exports = {
  findContactUser : findContactUser,
  addContact: addContact,
  removeContactRequest: removeContactRequest
}
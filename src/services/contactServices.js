import ContactModel from './../models/contactModel'
import UserModel from './../models/userModel'
import NotificationModel from './../models/notificationModel'
import _ from 'lodash'

let findContactUser = (currentUserId,keyword) =>{
   return new Promise( async (resolve,rejects)=> {
     let contactByUser = await ContactModel.findContact(currentUserId)
     if(!contactByUser){
      return rejects("Khong co ai khac ngoai ban trong ung dung nay")
     }
     let deprecateUserIds = [currentUserId]

     contactByUser.forEach(item => {
       deprecateUserIds.push(item.userId)
       deprecateUserIds.push(item.contactId)
     })
     deprecateUserIds = _.uniqBy(deprecateUserIds)
     
     let findUserContact = await UserModel.findAllUserForContact(deprecateUserIds,keyword)
     if(!findUserContact){
      return rejects("Hinh nhu khong co ai ngoai ban trong web chat nay. ahiiii!!!")
     }
     return resolve(findUserContact)

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
//create notification
    
    let notificationItem = {
      sender:currentUserId,
      receiver: targetId,
      type: NotificationModel.types.ADD_CONTACT,
    }
    await NotificationModel.model.createNew(notificationItem)
 
    return resolve(addNewContact)
  })
}
let removeContactRequest = (currentID,targetId) => {
   return new Promise(async (resolve,rejects)=>{
     let removeContact  = await ContactModel.removeContact(currentID,targetId)
    if(removeContact.n ===0){
      return rejects(false)
    }
    let typeNotif = NotificationModel.types.ADD_CONTACT
    NotificationModel.model.removeNotifContact(currentID,targetId,typeNotif)
    return resolve(true)
   })
}
module.exports = {
  findContactUser : findContactUser,
  addContact: addContact,
  removeContactRequest: removeContactRequest
}
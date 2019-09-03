import ContactModel from './../models/contactModel'
import UserModel from './../models/userModel'
import NotificationModel from './../models/notificationModel'
import _ from 'lodash'

const LIMIT_CONTACT_COUNT = 1

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

let removeContactRequestReceive = (currentID,contactId) => {

  return new Promise(async (resolve,rejects)=>{
    let removeContactReceive  = await ContactModel.removeContactReceive(currentID,contactId)
   if(removeContactReceive.n ===0){
     return rejects(false)
   }
   return resolve(true)
  })
}

let getContacts = (currentId) => {
  return new Promise(async (resolve, rejects) =>{
    try {
   let getContacts = await ContactModel.getContacts(currentId,LIMIT_CONTACT_COUNT)
   let users = getContacts.map(async (contact)=> {
      if(contact.contactId == currentId ){
        return await UserModel.findUserById(contact.userId)
      }
      else{
        return await UserModel.findUserContact(contact.contactId)
      }
   })
   resolve(await Promise.all(users))
    }
    catch (error) {
        rejects(error)
    }
 })
}
let getContactsSend = (currentId) => {
  return new Promise(async (resolve, rejects) =>{
    try {
      let getContactsSend = await ContactModel.getContactsSend(currentId,LIMIT_CONTACT_COUNT)
       let users = getContactsSend.map(async (contact) => {
         return await UserModel.findUserContact(contact.contactId)
       })
       resolve(await Promise.all(users))
    }
    catch (error) {
        rejects(error)
    }
 })
}
let getContactsReceived = (currentId) => {
  return new Promise(async (resolve, rejects) =>{
    try {
      let getContactsReceived = await ContactModel.getContactsReceived(currentId,LIMIT_CONTACT_COUNT)
      let users = getContactsReceived.map(async (contact) => {
        return await UserModel.findUserContact(contact.userId)
      })
      resolve(await Promise.all(users))
    }
    catch (error) {
        rejects(error)
    }
 })
}


let  getCountContacts = (currentId) => {
  return new Promise(async (resolve, rejects) =>{
      try {
   let countContact  = await ContactModel.getCountContacts(currentId)
      resolve(countContact)
      }
      catch (error) {
          rejects(error)
      }
  })
}
let  getCountContactSend = (currentId) => {
  return new Promise(async (resolve, rejects) =>{
      try {
        let getCountContactsSend  = await ContactModel.getCountContactSend(currentId)
      resolve(getCountContactsSend)
      }
      catch (error) {
          rejects(error)
      }
  })
}
let  getCountContactReceived = (currentId) => {
  return new Promise(async (resolve, rejects) =>{
      try {
        let getCountContactReceived  = await ContactModel.getCountContactReceived(currentId)
      resolve(getCountContactReceived)
      }
      catch (error) {
          rejects(error)
      }
  })
}



let loadMoreContact = (currentID,skipNumber)=>{
  return new Promise(async (resolve, rejects) =>{
    try {
      let getCountContactReceived  = await ContactModel.loadMoreContacts(currentID,skipNumber,LIMIT_CONTACT_COUNT)
      let contacts = getCountContactReceived.map(async (contact) => {
        if(contact.contactId == currentID ){
          return await UserModel.findUserContact(contact.userId)
        }
        else{
          return await UserModel.findUserContact(contact.contactId)
        }
      })
       resolve(await Promise.all(contacts))
    }
    catch (error) {
        rejects(error)
    }
})
}

let loadMoreContactSent = (currentID,skipNumber) => {
  return new Promise(async (resolve, rejects) =>{
    try {
      let getCountContactReceived  = await ContactModel.loadMoreContactsSent(currentID,skipNumber,LIMIT_CONTACT_COUNT)
      let contacts = getCountContactReceived.map(async (contact) => {
          return await UserModel.findUserContact(contact.contactId)
      })
       resolve(await Promise.all(contacts))
    }
    catch (error) {
        rejects(error)
    }
})
}

let loadMoreContactReceive = (currentID,skipNumber)=>{
  return new Promise(async (resolve, rejects) =>{
    try {
      let getCountContactReceived  = await ContactModel.loadMoreContactsReceive(currentID,skipNumber,LIMIT_CONTACT_COUNT)
      let contacts = getCountContactReceived.map(async (contact) => {
          return await UserModel.findUserContact(contact.userId)
      })
       resolve(await Promise.all(contacts))
    }
    catch (error) {
        rejects(error)
    }
})
}

let approvedContact = (contactId,currentId) => {
  return new Promise(async (resolve,rejects) =>{
    try {
     
      let approvedContact = await ContactModel.approvedContactRequest(contactId,currentId)
      if(approvedContact.nModified === 0){
       return rejects(false)
      }
      let notificationItem = {
        sender:contactId,
        receiver: currentId,
        type: NotificationModel.types.APPROVED_CONTACT,
      }

      await NotificationModel.model.createNew(notificationItem)
      resolve(true)
    } catch (error) {
      console.log(error)
      rejects(error)
    }
  })
}

let removeContactUser = (currentId,contactId) => {
  return new Promise(async (resolve,rejects)=>{
    try {
      let removeContact = await ContactModel.removeContactUser(currentId,contactId)
      if(removeContact.n ===0){
        return rejects(false)
      }
      resolve(true)
    } catch (error) {
      rejects(error)
    }
  })
}
module.exports = {
  findContactUser : findContactUser,
  addContact: addContact,
  removeContactRequest: removeContactRequest,
  removeContactRequestReceive: removeContactRequestReceive,
  getContacts: getContacts,
  getContactsSend: getContactsSend,
  getContactsReceived: getContactsReceived,
  getCountContacts: getCountContacts,
  getCountContactSend : getCountContactSend,
  getCountContactReceived: getCountContactReceived,
  loadMoreContact: loadMoreContact,
  loadMoreContactSent:loadMoreContactSent,
  loadMoreContactReceive: loadMoreContactReceive,
  approvedContact: approvedContact,
  removeContactUser: removeContactUser
}
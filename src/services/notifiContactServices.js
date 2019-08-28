import NotificationModel from '../models/notificationModel'
import UserModel from '../models/userModel'

const LIMIT_NOTIF_COUNT = 10
let notificationServices = (currentId) => {
   return new Promise(async (resolve, rejects) =>{
      try {
          let notifications = await NotificationModel.model.getContentOfUser(currentId,LIMIT_NOTIF_COUNT)
          let getNotiContents =  notifications.map(async (notification) => {
              let getSenderUser = await UserModel.findUserById(notification.sender)
              return NotificationModel.content.getContent(notification.type,notification.isRead,getSenderUser._id,getSenderUser.userName,getSenderUser.avatar)
          })
          resolve(Promise.all(getNotiContents))
      } catch (error) {
          rejects(error)
      }
   })
}

let getCountNotif = (currentId) => {
    return new Promise(async (resolve, rejects) =>{
        try {
           let countNotif = await NotificationModel.model.getCountNotif(currentId)
           resolve(countNotif)
        } catch (error) {
            rejects(error)
        }
     })
}

let readmore = (userId,skipNumber)=>{
    return new Promise(async (resolve, rejects) =>{
        try {
          let readMoreNotif = await NotificationModel.model.readMoreNotif(userId,skipNumber,LIMIT_NOTIF_COUNT)
          let getMoreNotifContent =  readMoreNotif.map(async (notification) => {
            let getSenderUser = await UserModel.findUserById(notification.sender)
            return NotificationModel.content.getContent(notification.type,notification.isRead,getSenderUser._id,getSenderUser.userName,getSenderUser.avatar)
        })
        resolve(Promise.all(getMoreNotifContent))
        } catch (error) {
            rejects(error)
        }
     })
}

let markReaded = (currentId,targetUsers)=>{
    return new Promise(async (resolve, rejects) =>{
        try {
        await NotificationModel.model.notifAsReaded(currentId,targetUsers)
        resolve(true)
        }
        catch (error) {
            rejects(error)
        }
    })
}

module.exports = {
    notificationServices: notificationServices,
    getCountNotif:getCountNotif,
    readmore:readmore,
    markReaded: markReaded
}
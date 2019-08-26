import NotificationModel from '../models/notificationModel'
import UserModel from '../models/userModel'
let notificationServices = (currentId, limit = 10) => {
   return new Promise(async (resolve, rejects) =>{
      try {
          let notifications = await NotificationModel.model.getContentOfUser(currentId,limit)
          console.log(notifications)
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
module.exports = {
    notificationServices: notificationServices
}
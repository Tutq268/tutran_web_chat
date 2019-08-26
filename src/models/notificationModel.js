import mongoose from 'mongoose'
let Schema = mongoose.Schema

let NotificationSchema = new Schema({
  sender:String,
  receiver: String,
  type: String,
  isRead: {type: Boolean, default: false},
  createdAt: {type: String, default: Date.now}
})
NotificationSchema.statics = {
  createNew(item){
    return this.create(item)
  },
  removeNotifContact(currentID,targetId,type){
    return this.deleteOne({
      $and: [{"userId": currentID},{"contactId" : targetId},{"type": type}]
    }).exec()
  },
  getContentOfUser(currentId,limit){
    return this.find({"receiver": currentId}).sort({"createdAt": -1}).limit(limit).exec()
  }
}

const NOTIFICATION_TYPE = {
  ADD_CONTACT: "add contact"
}

const NOTIFICATION_CONTENT = {
  getContent(notifiType,isRead,userId,username,userAvatar){
    if(notifiType === NOTIFICATION_TYPE.ADD_CONTACT){
      // .notif-readed-false
      if(!isRead){
        return `<span class= "notif-readed-false" data-uid="${userId}">
        <img class="avatar-small" src="images/users/${userAvatar}" alt=""> 
        <strong>${username}</strong> đã gửi cho bạn một lời mời kết bạn!
      </span><br><br><br>`
      }
      else{
        return `<span data-uid="${userId}">
        <img class="avatar-small" src="images/users/${userAvatar}" alt=""> 
        <strong>${username}</strong> đã gửi cho bạn một lời mời kết bạn!
      </span><br><br><br>`
      }
      
    }
    return 'No matching with any notufication type'
  }
}

module.exports ={ 
  model: mongoose.model("notification", NotificationSchema),
  types:NOTIFICATION_TYPE,
  content: NOTIFICATION_CONTENT
}

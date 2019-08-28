import mongoose from 'mongoose'
let schema = mongoose.Schema

let ContactSchema = new schema({
  userId: String,
  contactId: String,
  status: {type: Boolean, default: false},
  createdAt: {type: String, default: Date.now},
  updatedAt: {type: String, default: null},
  deletedAt: {type: String, default: null}
})

ContactSchema.statics = {
  createNew(item){
    return this.create(item)
  },
  findContact(userId){
    return this.find({
      $or: [
      {"userId": userId},
      {"contactId": userId}
      ]
    }).exec()
  },
  checkExists(userId,contactId){
    return this.findOne({
      $or: [
        {$and:[
          {"userId": userId},
          {"contactId": contactId}
        ]},
        {$and: [
          {"userId": contactId},
          {"contactId": userId}
        ]}
      ]
    }).exec()
  },
  removeContact(currentID,targetId){
    return this.deleteOne({
      $and: [{"userId": currentID},{"contactId" : targetId}]
    }).exec()
  },
  getContacts(currentId,limit){
    return this.find({
      $and: [{ $or : [
        {"userId": currentId},{"contactId" : currentId}
      ]},{"status": true}
    ]
    })
    .sort({"createdAt": -1})
    .limit(limit)
    .exec()
  },
  getContactsSend(currentId,limit){
    return this.find({
      $and : [{"userId": currentId},{"status": false}]
    })
    .sort({"createdAt": -1})
    .limit(limit)
    .exec()
  },
  getContactsReceived(currentId,limit){
    return this.find({
      $and : [
        {"contactId": currentId},{"status": false}
      ]
    })
    .sort({"createdAt": -1})
    .limit(limit)
    .exec()
  },
  getCountContacts(currentId){
    return this.countDocuments({
      $and: [
        {$or: [{"userId": currentId},{"contactId": currentId}]},{"status": true}
      ]
    }).exec()
  },
  getCountContactReceived(currentId){
    return this.countDocuments({
      $and: [
        {"contactId": currentId},{"status": false}
      ]
    }).exec()
  },
  getCountContactSend(currentId){
    return this.countDocuments({
      $and : [
        {"userId": currentId},{"status": false}
      ]
    }).exec()
  }
}
module.exports = mongoose.model("contact", ContactSchema)

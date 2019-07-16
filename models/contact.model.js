import mongoose from 'mongoose'
let schema = mongoose.Schema

let ContactSchema = new Schema({
  userId: String,
  contactId: String,
  status: {type: Boolean, default: false},
  createAt: {type: String, default: Date.now},
  updateAt: {type: String, default: Date.now},
  deleteAt: {type: String, default: Date.now}
})

module.exports = mongoose.model("contact", ContactSchema)
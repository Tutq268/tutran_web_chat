import mongoose from 'mongoose'
let Schema = mongoose.Schema

let ChatGroupSchema = new Schema({
  name: String,
  userAmount: {type: Number, min: 3, max: 100},
  messageAmount: {type: Number, default: 0},
  userId: String,
  members: [
    {userId: String}
  ],
  createdAt: {type: String, default: Date.now},
  updatedAt: {type: String, default: null},
  deletedAt: {type: String, default: null}
})



module.exports = mongoose.model("chat-group", ChatGroupSchema)
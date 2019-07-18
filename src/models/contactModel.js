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
  }
}

module.exports = mongoose.model("contact", ContactSchema)
import mongoose from 'mongoose'
let schema = mongoose.Schema

let ContactSchema = new schema({
  userId: String,
  contactId: String,
  status: {type: Boolean, default: false},
  createAt: {type: String, default: Date.now},
  updateAt: {type: String, default: Date.now},
  deleteAt: {type: String, default: Date.now}
})

ContactSchema.statics = {
  createNew(item){
    return this.create(item)
  }
}

module.exports = mongoose.model("contact", ContactSchema)
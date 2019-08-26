import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdInArray} from './../../Helpers/socketHelper'

let addNewContact = (io) => {
  let clients = {}
  io.on("connection",(socket)=>{


    //add socketId currentUser
    let currentUserId = socket.request.user._id
    pushSocketIdToArray(clients,currentUserId,socket.id)

    //socket add new contact
    socket.on("add-new-contact", (data) => {
      let currentUser = {
        id: socket.request.user._id,
        userName: socket.request.user.userName,
        avatar: socket.request.user.avatar
      }
       emitNotifyToArray(clients,data.contactId,io,"response-add-new-contact",currentUser)
    })


    //remove socketid when user disconnect
    socket.on("disconnect",() => {
      removeSocketIdInArray(clients,currentUserId,socket.id)
    })
    
  })
}
module.exports = addNewContact
import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdInArray} from './../../Helpers/socketHelper'


let removeContact = (io) => {
  let clients = {}
  io.on("connection",(socket)=> {
     let currentUserId = socket.request.user._id
     pushSocketIdToArray(clients,currentUserId,socket.id)

    socket.on("remove-contact",(data) => {
      let currentUserIdPushToClient = {
        id : currentUserId
      }

      emitNotifyToArray(clients,data.contactId,io,"remove-contact-user",currentUserIdPushToClient)
    })

    socket.on("disconnect",()=>{
      removeSocketIdInArray(clients,currentUserId,socket.id)
    })
    

  })
}
module.exports = removeContact
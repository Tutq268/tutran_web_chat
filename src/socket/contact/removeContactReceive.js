import {pushSocketIdToArray, emitNotifyToArray, removeSocketIdInArray} from './../../Helpers/socketHelper'


let removeContact = (io) => {
  let clients = {}
  io.on("connection",(socket)=> {
     let currentUserId = socket.request.user._id
     pushSocketIdToArray(clients,currentUserId,socket.id)

    socket.on("remove-request-user-received",(data) => {
      let currentUserIdPushToClient = {
        id : currentUserId
      }

      emitNotifyToArray(clients,data.contactId,io,"remove-request-user-received",currentUserIdPushToClient)
    })

    socket.on("disconnect",()=>{
      removeSocketIdInArray(clients,currentUserId,socket.id)
    })
    

  })
}
module.exports = removeContact
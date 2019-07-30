export let pushSocketIdToArray = (clients,userId,socketId) =>{
  if(clients[userId]){
    clients[userId].push(socketId)
  }
  else{
    clients[userId] = [socketId]
  }
  return clients
}

export let emitNotifyToArray = (clients, contactId,eventName,data) => {
  if(clients[contactId]){
    clients[contactId].forEach(socketId => {
      io.sockets.connected[socketId].emit(eventName,data)
    });
  }
}
export let removeSocketIdInArray = (clients,userId,socket) =>{
  clients[userId] = clients[userId].filter((socketId)=>  socketId != socket)
  if(!clients[userId].length){
    delete clients[userId]
  }
  return clients
}
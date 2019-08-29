import addNewContact from './contact/addNewContact'
import removeContact from './contact/removeContact'
import removeContactReceived from './contact/removeContactReceive'

let initSockets = (io) => {
  addNewContact(io)
  removeContact(io)
  removeContactReceived(io)
}
module.exports = initSockets
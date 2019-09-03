import addNewContact from './contact/addNewContact'
import removeContact from './contact/removeContact'
import removeContactReceived from './contact/removeContactReceive'
import approvedContact from './contact/approvedContact'
import removeContactUser from './contact/removeContactUser'

let initSockets = (io) => {
  addNewContact(io)
  removeContact(io)
  removeContactReceived(io)
  approvedContact(io)
  removeContactUser(io)
}
module.exports = initSockets
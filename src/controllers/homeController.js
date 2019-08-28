import {notifContact,contact} from './../services/index'
let getHome = async (req,res)=> {
 
   let notifContent = await notifContact.notificationServices(req.user._id)
   let countNotif = await notifContact.getCountNotif(req.user._id)
  
   let getContacts = await contact.getContacts(req.user._id)
   let getContactsSend = await contact.getContactsSend(req.user._id)
   let getContactsReceived = await contact.getContactsReceived(req.user._id)

   let getCountContact = await contact.getCountContacts(req.user._id)
   let getCountContactsSend = await contact.getCountContactSend(req.user._id)
   let getCountContactReceived = await contact.getCountContactReceived(req.user._id)

    return res.render("main/home/home",{
      errors: req.flash("errors"),
      success: req.flash("success"),
      user: req.user,
      notifications : notifContent,
      countNotifications : countNotif,
      getContacts:getContacts,
      getContactsSend : getContactsSend,
      getContactsReceived: getContactsReceived,
      getCountContact: getCountContact,
      getCountContactsSend: getCountContactsSend,
      getCountContactReceived : getCountContactReceived
    })


}

module.exports = {
  getHome: getHome
}


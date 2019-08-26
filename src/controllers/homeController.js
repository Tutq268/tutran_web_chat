import {notifContact} from './../services/index'
let getHome = async (req,res)=> {
 
   let notifContent = await notifContact.notificationServices(req.user._id)
   let countNotif = await notifContact.getCountNotif(req.user._id)
    return res.render("main/home/home",{
      errors: req.flash("errors"),
      success: req.flash("success"),
      user: req.user,
      notifications : notifContent,
      countNotifications : countNotif
    })


}

module.exports = {
  getHome: getHome
}


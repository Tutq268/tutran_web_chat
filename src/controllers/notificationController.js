import {notifContact} from './../services/index'

let readMoreNotification = async (req,res) =>{
    let skipNumver = +(req.query.skipNumber)
    let uidCurrent = req.user._id
  try {
      let readMoreNotif = await notifContact.readmore(uidCurrent,skipNumver)
      
      res.status(200).send(readMoreNotif)
  } catch (error) {
      res.status(500).send(error)
  }
}
module.exports = {
    readMoreNotification: readMoreNotification
}
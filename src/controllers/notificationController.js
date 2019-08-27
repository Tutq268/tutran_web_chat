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

let markAsNotifReaded =async (req,res) => {
    try {
        let targetUsers = req.body.targetUsers
        let markReaded = await notifContact.markReaded(req.user._id,targetUsers)
        res.status(200).send(markReaded)
    } catch (error) {
        console.log("failed with error: " + error)
        res.status(500).send(false)    
    }
}
module.exports = {
    readMoreNotification: readMoreNotification,
    markAsNotifReaded:markAsNotifReaded
}
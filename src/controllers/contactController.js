import {contact} from './../services/index'
import {validationResult} from "express-validator/check"


let findContactUser =  async (req,res) => {
  let errorArr = []
  let validationError = validationResult(req)
  if (!validationError.isEmpty()){
     let errors =Object.values(validationError.mapped())
     errors.forEach(item => {
       errorArr.push(item.msg)
     });

     return res.status(500).send(errorArr)
    }
   let keyword = req.params.keyword
   let id = req.user._id

   try {
   let userContact =  await contact.findContactUser(id,keyword)
   res.render("main/contactsModal/session/_findUserContact",{userContact})
   } catch (error) {
     res.status(500).send(error)
   }
}

let addContact = async (req,res) => {
 try {
   let currentId = req.user._id
    let targetId = req.body.uid
    let newContact = await contact.addContact(currentId,targetId)
   return res.status(200).send({success: !!newContact})
 } catch (error) {
   return res.status(500).send(error)
 }
}

let removeContact = async (req,res) => {
 try {
   let currentID = req.user._id
   let targetId = req.body.uid
   
   let removeContact = await contact.removeContactRequest(currentID,targetId)

   res.status(200).send({success: removeContact})

 } catch (error) {
   return res.status(500).send(error)
   
 }
}

let removeContactReceive = async (req,res) =>{

  try {
    let contactId = req.body.uid
    let currentId = req.user._id
    let removeContactReceive = await contact.removeContactRequestReceive(currentId,contactId)
    res.status(200).send({success: removeContactReceive})
  } catch (error) {
    res.status(500).send(error)
  }
}

// load more contact 

let loadMoreContacts = async (req,res) =>{
  let skipNumber = +(req.query.skipNumber)
  try {
    let loadMoreContacts = await contact.loadMoreContact(req.user._id, skipNumber)
    res.status(200).send(loadMoreContacts)
  } catch (error) {
    console.log("loi khi load more contact" + error)
    res.status(500).send(error)
  }
}

let loadMoreContactsSent = async (req,res) =>{
  let skipNumber = +(req.query.skipNumber)
  try {
    let loadMoreContactsSent = await contact.loadMoreContactSent(req.user._id, skipNumber)
    res.status(200).send(loadMoreContactsSent)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}


let loadMoreContactsReceive = async (req,res)=>{
  let skipNumber = +(req.query.skipNumber)
  try {
    let loadMoreContactsReceive = await contact.loadMoreContactReceive(req.user._id, skipNumber)
    res.status(200).send(loadMoreContactsReceive)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

let approvedRequestContact = async (req,res)=>{
  let contactId = req.body.uid
  let currentId = req.user._id
  try {
    let approvedContact = await contact.approvedContact(contactId,currentId)
    res.status(200).send({success: approvedContact})
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

let removeContactUser = async (req,res)=>{
   let currentId = req.user._id
   let contactId = req.body.uid
   try {
     let removeContactUser = await contact.removeContactUser(currentId,contactId)
     res.status(200).send({success : removeContactUser})
   } catch (error) {
     console.log(error)
     res.status(500).send(error)
   }
}
module.exports = {
  findContactUser : findContactUser,
  addContact: addContact,
  removeContact: removeContact,
  removeContactReceive: removeContactReceive,
  loadMoreContacts: loadMoreContacts,
  loadMoreContactsSent: loadMoreContactsSent,
  loadMoreContactsReceive: loadMoreContactsReceive,
  approvedRequestContact: approvedRequestContact,
  removeContactUser: removeContactUser
}
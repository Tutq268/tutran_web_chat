import multer from 'multer'
import app from './../config/app'
import {transError,transSuccess} from './../../lang/vi'
import uuidv4 from 'uuid/v4'
import {user} from './../services/index'
import fsExtra from 'fs-extra'
import {validationResult} from "express-validator/check"


let storageAvatar = multer.diskStorage({
  destination: (req,file,callback) =>{
    callback(null,"src/public/images/users")
  },
  filename: (req, file, callback) => {
    let math = ["image/png","image/jpg","image/jpeg"]
    if(math.indexOf(file.mimetype) === -1){
      return callback(transError.avatar_type, null)
    }
    let avatarName = `${Date.now()}-${uuidv4()}-${file.originalname}`
    callback(null,avatarName)
  }
})
let avatarUploadFile = multer({
  storage: storageAvatar,
  limits: {fileSize: 1048576}
}).single("avatar")
let updateAvatar = (req,res) => {
   avatarUploadFile(req, res, async (error) => {
    if(error){
      console.log(error)
      if(error.message){
        return res.status(500).send(transError.avatar_size)
      }
      return res.status(500).send(error)

    }
    console.log(req.file)
   try {
     let updateUserItem = {
       avatar : req.file.filename,
       updatedAt : Date.now()
     }
     //update user
    let userUpdate = await user.updateUser(req.user._id, updateUserItem)

    // remove user cu
     await fsExtra.remove(`src/public/images/users/${userUpdate.avatar}`)
     let result = {
       message: transSuccess.avatar_updated,
       imageSrc: `/images/users/${req.file.filename}`
     }
     return res.status(200).send(result)

   } catch (error) {
     return res.status(500).send(error)
   }
   })
}

let updateUserInfo = async (req,res) =>{

try {
  let errorArr = []
  let validationError = validationResult(req)
  if (!validationError.isEmpty()){
     let errors =Object.values(validationError.mapped())
     errors.forEach(item => {
       errorArr.push(item.msg)
     });

     return res.status(500).send(errorArr)
    }
  let updateUserItem = req.body
  await user.updateUser(req.user._id, updateUserItem)
  let result = {
    message: transSuccess.user_info_updateted,
    }
    return res.status(200).send(result)
} catch (error) {
  console.log(error)
  return res.status(500).send(error)
}
}

let updatePasswordUser = async (req,res) => {
  let errorArr = []
  let validationError = validationResult(req)
  if (!validationError.isEmpty()){
     let errors =Object.values(validationError.mapped())
     errors.forEach(item => {
       errorArr.push(item.msg)
     });

     return res.status(500).send(errorArr)
    }
try {
  let updateUserItem = req.body
  await user.updatePassword(req.user._id, updateUserItem)
  let result = {
    message: transSuccess.user_password_updated
  }
  res.status(200).send(result)
} catch (error) {
  return res.status(500).send(error)
}}

module.exports ={
  updateAvatar: updateAvatar,
  updateUserInfo: updateUserInfo,
  updatePasswordUser: updatePasswordUser
}
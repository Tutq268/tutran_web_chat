import {check} from "express-validator/check"
import {transValidation} from "./../../lang/vi"

let checUser = [
  check("userName", transValidation.user_check_username)
  .optional()
  .matches(/^[s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/)
  .isLength({min: 3, max: 17}),
  check("gender",transValidation.user_check_gender)
  .optional()
  .isIn(["male","female"]),
  check("address",transValidation.user_check_address)
  .optional()
  .isLength({min: 3,max: 20}),
  check("phone",transValidation.user_check_phone)
  .optional()
  .matches(/^(0)[0-9]{9,10}$/)
]

let checkPassword = [
  check("currentPassword", transValidation.password_incorrect)
  .isLength({min: 8})
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),

  check("newPassword",transValidation.password_incorrect)
  .isLength({min: 8})
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),

  check("confirmPassword",transValidation.password_confirmation_incorrect)
  .isLength({min: 8})
  .custom((value,{req}) => value === req.body.newPassword)
]
module.exports = {
  checUser: checUser,
  checkPassword: checkPassword
}

export const transValidation = {
  email_incorrect : "Email phải có định dang example@gmail.com",
  gender_incorrect : "ủa, tại sao giới tính lại bị sai?",
  password_incorrect : "Password phải có ít nhất 8 kí tư, bao gồm chữ hoa, số và kí tự đăck biệt",
  password_confirmation_incorrect : "Nhập lại sai mật khẩu"
}

export const transError = {
  ACCOUNT_IN_USE : "email nay da duoc su dung",
  ACCOUNT_DELETE: " Tài khoản này đã bị xoá",
  ACCOUNT_NOT_ACTIVE: " Bạn chưa active email. vui lòng vào email và active tài khoản"
}

export const transSuccess = {
  user_created: (userEmail) => {
     return `Tai khoan <strong>${userEmail}</strong> da duoc tao, vui long kiem tra email cua ban de active tai khoan.`
  }
}
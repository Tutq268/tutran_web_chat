export const transValidation = {
  email_incorrect : "Email phải có định dang example@gmail.com",
  gender_incorrect : "ủa, tại sao giới tính lại bị sai?",
  password_incorrect : "Password phải có ít nhất 8 kí tư, bao gồm chữ hoa, số và kí tự đăck biệt",
  password_confirmation_incorrect : "Nhập lại sai mật khẩu",

  user_check_username: "Username phai co do dai tu 3-17 ki tu va khong chua ki tu dac biet",
  user_check_gender: "OOps, are you hacker?",
  user_check_address: "Address phai nho hon 20 ki tu",
  user_check_phone: "So dien thoai phai bat dau bang so 0 va co 10 hoac 11 chu so"
}

export const transError = {
  ACCOUNT_IN_USE : "email nay da duoc su dung",
  ACCOUNT_DELETE: " Tài khoản này đã bị xoá",
  ACCOUNT_NOT_ACTIVE: " Bạn chưa active email. vui lòng vào email và active tài khoản",
  TOKEN_UNDEFIED: " Tai Khoan Da Duoc kich Hoat Truoc Do",
  LOGIN_FAILED: " Sai tai khoan hoac mat khau",
  avatar_type: "Sai dinh dang anh",
  avatar_size : "dung luong anh khong duoc vuot qua 1MB"
} 

export const transSuccess = {
  user_created: (userEmail) => {
     return `Tai khoan <strong>${userEmail}</strong> da duoc tao, vui long kiem tra email cua ban de active tai khoan.`
  },
  account_active: " Tai Khoan Cua Ban Da Duoc Kich Hoat Thanh Cong. ",
  loginSuccess: (userEmail) => {
    return ` Xin chao ${userEmail}, Dang Nhap Thanh Cong `
  },
  logout_success: "Dang Xuat Tai Khoan Thanh Cong",
  avatar_updated: "cap nhat anh dai dien thanh cong",
  user_info_updateted: "cap nhat thong tin nguoi dung thanh cong"
}

export const transSendMail = {
  subject: "Xác Thực Kích Hoạt Tài Khoản",
  template: (linkVerify) => {
       return `<h2>Bạn nhận được email này vì đã đăng kí ứng dụng chat</h2>
        <h3>Vui Lòng Click Vào Liên Kết Bên dưới để xác nhận kích hoạt tài khoản</h3>
        <h3><a href="${linkVerify}" target="blank">${linkVerify}</a></h3>
        <h4>Nếu tin rằng email này là nhầm lẫn. Hãy bỏ qua nó</h4>
       `
  },
  SEND_MAIL_FAILED: "co loi trong qua trinh gui email. vui long lien he lai voi bo phan ho tro cua chung toi"
}



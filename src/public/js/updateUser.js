let userAvatar = null
let userInfo = {}
let  avatarOriginSrc = null
let originUserInfo = {}
let userUpdatePassword = {}


function updateUserInfo(){
  $("#input-change-avatar").bind("change",function(){
    let fileData = $(this).prop("files")[0]
    let math =["image/png","image/jpg","image/jpeg"]
    let limit = 1048576

    if($.inArray(fileData.type,math) === -1){
      alertify.notify("Định dạng ảnh không hợp lệ, vui lòng chọn ảnh khác","error",7)
      $(this).val(null)
      return false
    }
    if(fileData.size > limit){
      alertify.notify("Dung lượng ảnh không được vươt quá 1MB","error",7)
      $(this).val(null)
      return false
    }
    if(typeof(FileReader) != "undefined"){
      let imagePreview = $("#image-edit-profile")
      imagePreview.empty()
      let fileReader = new FileReader();
      fileReader.onload = function(element){
        $("<img>",{
          "src": element.target.result,
          "class": "avatar img-circle",
          "id": "user-modal-avatar",
          "alt": "avatar"
        }).appendTo(imagePreview)
      }
      imagePreview.show()
      fileReader.readAsDataURL(fileData)
       
      let formData = new FormData()
      formData.append("avatar",fileData)
      userAvatar = formData
    }
    else{
      alertify.notify("Trinh duyet khong duoc ho tro","error",7)
    }
  })
  $("#input-change-username").bind("change",function(){
    userInfo.userName = $(this).val()
  })
  $("#input-change-gender-male").bind("click",function(){
    userInfo.gender = $(this).val()
  })
  $("#input-change-gender-female").bind("click",function(){
    userInfo.gender = $(this).val()
  })
  $("#input-change-address").bind("change",function(){
    userInfo.address = $(this).val()
  })
  $("#input-change-phone").bind("change",function(){
    userInfo.phone = $(this).val()
  })


  // update password
  $("#input_change_current_password").bind("change",function(){
    let currentPassword = $(this).val()
    let reqexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/)

    if(!reqexPassword.test(currentPassword)){
      alertify.notify("Kieu mat khau bi sai","error",7)
      $(this).val(null)
      delete userUpdatePassword.currentPassword
      return false
    }
    userUpdatePassword.currentPassword = currentPassword

  })

  $("#input_change_new_password").bind("change",function(){
    let newPassword = $(this).val()
    console.log(newPassword)
    let reqexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/)

    if(!reqexPassword.test(newPassword)){
      alertify.notify("Nhap sai kieu mat khau moi","error",7)
      $(this).val(null)
      delete userUpdatePassword.newPassword
      return false
    }
    userUpdatePassword.newPassword = newPassword

  })

  $("#input_change_confirm_new_password").bind("change",function(){
    let confirmPassword = $(this).val()
    console.log(confirmPassword)
    if(!userUpdatePassword.newPassword){
      alertify.notify("ban chua nhap mat khau moi","error",7)
      $(this).val(null)
      delete userUpdatePassword.confirmPassword
      return false
    }
    if(confirmPassword !== userUpdatePassword.newPassword){
      alertify.notify("nhap lai mat khau chua chinh xac","error",7)
      $(this).val(null)
      delete userUpdatePassword.confirmPassword
      return false
    }
    userUpdatePassword.confirmPassword = confirmPassword

  })
  
}

function callUpdateAvatar() {
  $.ajax({
    url: "/user/update-avatar",
    type: "put",
    cache: false,
    contentType: false,
    processData: false,
    data: userAvatar,
    success: function(result){
      $(".user-modal-alert-success").find("span").text(result.message)
      $(".user-modal-alert-success").css("display", "block")
      $("#navbar-avatar").attr("src", result.imageSrc)
     //update origin avatar src 
      avatarOriginSrc = result.imageSrc
      $("#input-btn-cancle-update-user").click()


    },
    error: function(error){
      // hien thi loi
      console.log(error)
      $(".user-modal-alert-error").find("span").text(error.responseText)
      $(".user-modal-alert-error").css("display", "block")
      $("#input-btn-cancle-update-user").click()
      $("#input-change-username").val(originUserInfo.username)
      (originUserInfo.gender === "male") ? $("#input-change-gender-male").click() : $("#input-change-gender-female").click()
      $("#input-change-address").val(originUserInfo.address)
      $("#input-change-phone").val(originUserInfo.phone)
    }
  })
}

function callUpdateUserInfo(){
  $.ajax({
    url: "/user/update-info",
    type: "put",
    data: userInfo,
    success: function(result){
      $(".user-modal-alert-success").find("span").text(result.message)
      $(".user-modal-alert-success").css("display", "block")
      //update origin avatar src 

      originUserInfo = Object.assign(originUserInfo, userInfo)

      $("#navbar-username").text = originUserInfo.username
      $("#input-btn-cancle-update-user").click()


    },
    error: function(error){
      // hien thi loi
      $(".user-modal-alert-error").find("span").text(error.responseText)
      $(".user-modal-alert-error").css("display", "block")
      $("#input-btn-cancle-update-user").click()
      $("#input-change-username").val(originUserInfo.userName)
      (originUserInfo.gender === "male") ? $("#input-change-gender-male").click() : $("#input-change-gender-female").click()
      $("#input-change-address").val(originUserInfo.address)
      $("#input-change-phone").val(originUserInfo.phone)
    }
  })
}

// ajax pass word
function allUpdateUserPassword(){
  $.ajax({
    url: "/user/update-password",
    type: "put",
    data: userUpdatePassword ,
    success: function(result){
      $(".user-modal-password-alert-success").find("span").text(result.message)
      $(".user-modal-password-alert-success").css("display", "block")
      //update origin avatar src 

      $("#input_btn_cancle_password").click()


    },
    error: function(error){
      // hien thi loi
      console.log(error)
      $(".user-modal-password-alert-error").find("span").text(error.responseText)
      $(".user-modal-password-alert-error").css("display", "block")
      $("#input_btn_cancle_password").click()
      $("#input-change-username").val(originUserInfo.userName)
      (originUserInfo.gender === "male") ? $("#input-change-gender-male").click() : $("#input-change-gender-female").click()
      $("#input-change-address").val(originUserInfo.address)
      $("#input-change-phone").val(originUserInfo.phone)
    }
  })
}




$(document).ready(function(){
  updateUserInfo()
  avatarOriginSrc = $("#user-modal-avatar").attr("src")
  originUserInfo = {
    userName : $("#input-change-username").val(),
    gender: ($("#input-change-gender-male").is(":checked")) ? $("#input-change-gender-male").val() : ("#input-change-gender-female").val(),
    address: $("#input-change-address").val(),
    phone: $("#input-change-phone").val()
  }
  $("#input-btn-update-user").bind("click", function(){
    if($.isEmptyObject(userInfo)&& !userAvatar){
      alertify.notify("ban phai thay doi thong tin truoc khi cap nhat du lieu","error",7)
      return false
    }
   if(userAvatar){
    callUpdateAvatar()
   }
   if (!$.isEmptyObject(userInfo)){
    callUpdateUserInfo()
   }
  })
  $("#input-btn-cancle-update-user").bind("click", function(){
    userAvatar = null
    userInfo = {}
    $("#user-modal-avatar").attr("src",avatarOriginSrc)
    $("#input-change-username").val(originUserInfo.userName),
    ($("#input-change-gender-male").is(":checked")) ? $("#input-change-gender-male").val(originUserInfo.gender) : ("#input-change-gender-female").val(originUserInfo.gender),
    $("#input-change-address").val(originUserInfo.address),
    $("#input-change-phone").val(originUserInfo.phone)

  })



  // update password


  $("#input_btn_update_password").bind("click",function(){
     console.log(userUpdatePassword)

     if(!userUpdatePassword.currentPassword || !userUpdatePassword.newPassword || !userUpdatePassword.confirmPassword){
       alertify.notify("ban phai thay doi day du thong tin","error", 7)
       return false
     }
     allUpdateUserPassword()

  })


  $("#input_btn_cancle_password").bind("click",function(){
    userUpdatePassword = {}
    $("#input_change_current_password").val(null)
    $("#input_change_new_password").val(null)
    $("#input_change_confirm_new_password").val(null)


  })
  
})
let userAvatar = null
let userInfo = {}
let avatarOriginSrc = null
let originUserInfo = {}

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
  
})
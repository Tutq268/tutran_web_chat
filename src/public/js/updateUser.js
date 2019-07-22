let userAvatar = null
let userInfo = {}
let avatarOriginSrc = null
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
$(document).ready(function(){
  updateUserInfo()
  avatarOriginSrc = $("#user-modal-avatar").attr("src")
  $("#input-btn-update-user").bind("click", function(){
    if($.isEmptyObject(userInfo)&& !userAvatar){
      alertify.notify("ban phai thay doi thong tin truoc khi cap nhat du lieu","error",7)
      return false
    }
    $.ajax({
      url: "/user/update-avatar",
      type: "put",
      cache: false,
      contentType: false,
      processData: false,
      data: userAvatar,
      success: function(result){},
      error: function(error){}
    })
  })
  $("#input-btn-cancle-update-user").bind("click", function(){
    userAvatar = null
    userInfo = {}
    $("#user-modal-avatar").attr("src",avatarOriginSrc)
  })
  
})
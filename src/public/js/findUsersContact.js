

function callFindUsers(element){
  if(element.which === 13 || element.type === "click"){
    let keyword = $("#input_find_users_contact").val()
   if(!keyword.length){
    alertify.notify("Ban van chua nhap thong tin tim kiem","error",7)
    return false
   }
    let regexpFindUser = new RegExp(/^[s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/)
    if(!regexpFindUser.test(keyword)){
      alertify.notify("Loi tu khoa tim kiem, tu khoa tim kiem khong duoc chua ki tu dac biet","error",7)
      return false
    }
    $.get(`/contact/user-users/${keyword}`,function(data){
      $("#find-user ul").html(data)
      addContact()
      removeUserContact()
    })
  }
}




$(document).ready(function(){
  $("#input_find_users_contact").bind("keypress", callFindUsers)
  $("#btn_find_users_contact").bind("click",callFindUsers)
})
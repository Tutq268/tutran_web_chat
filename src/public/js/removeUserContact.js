function removeUserContact(){
  $(".user-remove-request-contact").unbind().on("click", function(){
    let targetId = $(this).data("uid")
    $.ajax({
      url: "/contact/remove-request-contact",
      type: "delete",
      data: {uid: targetId},
      success : function(data){
        if(data.success){
          $("#find-user").find(`div.user-remove-request-contact[data-uid=${targetId}]`).hide()
          $("#find-user").find(`div.user-add-new-contact[data-uid=${targetId}]`).css("display","inline")
          $("#request-contact-sent").find(`ul li[data-uid = ${targetId}] `).remove()
          decreaseNumberNotifContact("count-request-contact-sent")
          decreaseNumberNotification("noti_contact_counter",1)

          socket.emit("remove-request-user", {contactId: targetId})
        }
      }
    })
  })
}
socket.on("remove-request-user",function(user){
  $(".noti_content").find(`div[data-uid=${user.id}]`).remove()
  $("ul.list-notifications").find(`li>div[data-uid=${user.id}]`).parent().remove()
  $("#request-contact-received").find(`li[data-uid=${user.id}]`).remove()
  decreaseNumberNotifContact("count-request-contact-received")
  // decreaseNumberNotification("noti_contact_counter",1)
  decreaseNumberNotification("noti_contact_counter",1)
  decreaseNumberNotification("noti_counter",1)
})
$(document).ready(function(){
  removeUserContact()
})
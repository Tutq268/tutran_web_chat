function removeUserContact(){
  $(".user-remove-request-contact").bind("click", function(){
    let targetId = $(this).data("uid")
    $.ajax({
      url: "/contact/remove-request-contact",
      type: "delete",
      data: {uid: targetId},
      success : function(data){
        if(data.success){
          $("#find-user").find(`div.user-remove-request-contact[data-uid=${targetId}]`).hide()
          $("#find-user").find(`div.user-add-new-contact[data-uid=${targetId}]`).css("display","inline")
          decreaseNumberNotifContact("count-request-contact-sent")
          socket.emit("remove-request-user", {contactId: targetId})
        }
      }
    })
  })
}
socket.on("remove-request-user",function(user){
  $(".noti_content").find(`div[data-uid=${user.id}]`).remove()
  $("ul.list-notifications").find(`li>div[data-uid=${user.id}]`).parent().remove()
  decreaseNumberNotifContact("count-request-contact-received")
  decreaseNumberNotification("noti_contact_counter")
  decreaseNumberNotification("noti_counter")
})
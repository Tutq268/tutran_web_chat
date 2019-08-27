function addContact(){
  $(".user-add-new-contact").bind("click", function(){
    let targetId = $(this).data("uid")
    $.post("/contact/add-new",{uid: targetId}, function(data){
      if(data.success){
        $("#find-user").find(`div.user-add-new-contact[data-uid=${targetId}]`).hide()
        $("#find-user").find(`div.user-remove-request-contact[data-uid=${targetId}]`).css("display","inline")
        increaseNumberNotifContact("count-request-contact-sent")
        socket.emit("add-new-contact",{contactId : targetId})
      }
    })
  })
}
socket.on("response-add-new-contact",function(user){
  console.log(user)
  let noti = `<div data-uid="${ user.id }">
                <img class="avatar-small" src="images/users/${user.avatar}" alt=""> 
                <strong>${user.userName}</strong> đã gửi cho bạn một lời mời kết bạn!
              `
    $(".noti_content").prepend(noti)
    $("ul.list-notifications").prepend(`<li>${noti}</li>`)
    increaseNumberNotifContact("count-request-contact-received")
    increaseNumberNotification("noti_counter",1)
    increaseNumberNotification("noti_contact_counter",1)

})
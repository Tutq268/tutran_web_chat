function addContact(){
  $(".user-add-new-contact").bind("click", function(){
    let targetId = $(this).data("uid")
    $.post("/contact/add-new",{uid: targetId}, function(data){
      if(data.success){
        $("#find-user").find(`div.user-add-new-contact[data-uid=${targetId}]`).hide()
        $("#find-user").find(`div.user-remove-request-contact[data-uid=${targetId}]`).css("display","inline")
        let userInfoHtml = $("#find-user").find(`ul li[data-uid = ${targetId}]`).get(0).outerHTML
        $("#request-contact-sent").find("ul").prepend(userInfoHtml)
        socket.emit("add-new-contact",{contactId : targetId})
        increaseNumberNotifContact("count-request-contact-sent")
 
      }
    })
  })
}
socket.on("response-add-new-contact",function(user){
  let noti = `<div data-uid="${ user.id }">
                <img class="avatar-small" src="images/users/${user.avatar}" alt=""> 
                <strong>${user.userName}</strong> đã gửi cho bạn một lời mời kết bạn!
              `
  let addNewContact = ` <li class="_contactList" data-uid="${user._id}">
  <div class="contactPanel">
      <div class="user-avatar">
          <img src="images/users/${user.avatar}" alt="">
      </div>
      <div class="user-name">
          <p>
              ${user.userName}
          </p>
      </div>
      <br>
      <div class="user-address">
          <span>${user.address} </span>
      </div>
      <div class="user-acccept-contact-received" data-uid="${user._id}">
          Chấp nhận
      </div>
      <div class="user-reject-request-contact-received action-danger" data-uid="${user._id}">
          Xóa yêu cầu
      </div>
  </div>
</li>`

    $(".noti_content").prepend(noti)
    $("ul.list-notifications").prepend(`<li>${noti}</li>`)
    $("#request-contact-received").find("ul").prepend(addNewContact)
    increaseNumberNotifContact("count-request-contact-received")
    increaseNumberNotification("noti_counter",1)
    increaseNumberNotification("noti_contact_counter",1)

})
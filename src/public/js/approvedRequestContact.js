function approvedRequestContact(){
    $(".user-acccept-contact-received").unbind().on("click",function(){
        let targetId = $(this).data("uid")
    $.ajax({
        url: "/contact/approved-request-contact",
        type: "put",
         data: {uid : targetId},
         success: function(data){
             console.log(data)
             if(data.success){
                let userInfo = $("#request-contact-received").find(`ul li[data-uid=${targetId}]`)
                $(userInfo).find(`div.user-acccept-contact-received`).remove()
                $(userInfo).find(`div.user-reject-request-contact-received`).remove()
        
                $(userInfo).find(`div.contactPanel`).append(
                    `
                    <div class="user-talk" data-uid="${targetId}">
                    Trò chuyện
                     </div>
                     <div class="user-remove-contact action-danger" data-uid="${targetId}">
                       Xóa liên hệ
                     </div>
                    `
                )
                let  userAcceptInfo = userInfo.get(0).outerHTML
                $("#contacts").find(`ul`).prepend(userAcceptInfo)
                
                decreaseNumberNotifContact("count-request-contact-received")
                decreaseNumberNotification("noti_contact_counter",1)
                socket.emit("approved-request-contact", {contactId: targetId})
                removeContact()
             }
         }
    })

    })
}

socket.on("approved-request-user-contact",function(user){
  $("#request-contact-sent").find(`ul li[data-uid= ${user.id}]`).hide()
  decreaseNumberNotifContact("count-request-contact-sent")
  increaseNumberNotification("noti_counter",1)
  decreaseNumberNotification("noti_contact_counter",1)
  let noti = `
            <div data-uid="${user.id}">
            <img class="avatar-small" src="images/users/${user.avatar}" alt=""> 
            <strong>${user.userName}</strong> đã chấp nhận lời mời kết bạn của bạn!
            </div>
            `

  $(".noti_content").prepend(noti)
  $("ul.list-notifications").prepend(`<li>${noti}</li>`)
  $("#contacts").find("ul").prepend(
      `
      <li class="_contactList" data-uid="${user.id}">
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
              <span>${user.address}</span>
          </div>
          <div class="user-talk" data-uid="${user.uid}">
              Trò chuyện
          </div>
          <div class="user-remove-contact action-danger" data-uid="${user.uid}">
              Xóa liên hệ
          </div>
      </div>
  </li>
      `
  )
  removeContact()
})
$(document).ready(function(){
    approvedRequestContact()
})
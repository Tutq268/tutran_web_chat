$(document).ready(function(){
    $("#read_more_contacts_send").bind("click",function(){
        let skipNumber = $("#request-contact-sent").find("li").length
        $.get(`/contacts/read-more-contacts-sent?skipNumber=${skipNumber}`,function(contacts){
            $(".load_more_contacts").css("display","inline-block")
            $("#read_more_contacts_send").css("display","none")
            if(!contacts.length){
                $(".load_more_contacts").css("display","none")
                $("#read_more_contacts_send").css("display","inline-block")
                alertify.notify("Bạn Không Còn Bạn Bè Nào Nữa","error",7)
                return false
            }
          
            contacts.forEach(contact =>{
              $("#request-contact-sent").find("ul").append(
                  `
                  <li class="_contactList" data-uid="${contact._id}">
                  <div class="contactPanel">
                      <div class="user-avatar">
                          <img src="images/users/${contact.avatar}" alt="">
                      </div>
                      <div class="user-name">
                          <p>
                          ${contact.userName}
                          </p>
                      </div>
                      <br>
                      <div class="user-address">
                          <span>${(contact.address !== null) ? contact.address : ""}</span>
                      </div>
                      <div class="user-remove-request-contact display-important action-danger" data-uid="${contact._id}">
                          Hủy yêu cầu
                      </div>
                  </div>
              </li>
                  `
              )
            })
            removeUserContact()
            $(".load_more_contacts").css("display","none")
            $("#read_more_contacts_send").css("display","inline-block")
        })
    })
})
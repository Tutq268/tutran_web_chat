$(document).ready(function(){
    $("#read_more_contacts-received").bind("click",function(){
        let skipNumber = $("#request-contact-received").find("li").length
        $.get(`/contacts/read-more-contacts-receive?skipNumber=${skipNumber}`,function(contacts){
            $(".load_more_contacts").css("display","inline-block")
            $("#read_more_contacts-received").css("display","none")
            if(!contacts.length){
                $(".load_more_contacts").css("display","none")
                $("#read_more_contacts-received").css("display","inline-block")
                alertify.notify("Bạn Không Còn Bạn Bè Nào Nữa","error",7)
                return false
            }
            $(".load_more_contacts").css("display","none")
            $("#read_more_contacts-received").css("display","inline-block")
            contacts.forEach(contact =>{
             $("#request-contact-received").find("ul").append(
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
                     <div class="user-acccept-contact-received" data-uid="${contact._id}">
                         Chấp nhận
                     </div>
                     <div class="user-reject-request-contact-received action-danger" data-uid="${contact._id}">
                         Xóa yêu cầu
                     </div>
                 </div>
             </li>
                 `
             )
            })
            removeRequestContactReceive()

        })
    })
})
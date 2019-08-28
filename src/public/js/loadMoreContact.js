$(document).ready(function(){
    $("#modal_read_more_contacts").bind("click",function(){
        let skipNumber = $("#contacts").find("li").length
        $.get(`/contacts/read-more-contacts?skipNumber=${skipNumber}`,function(contacts){
            $(".load_more_contacts").css("display","inline-block")
            $("#modal_read_more_contacts").css("display","none")
            if(!contacts.length){
                $(".load_more_contacts").css("display","none")
                $("#modal_read_more_contacts").css("display","inline-block")
                alertify.notify("Bạn Không Còn Bạn Bè Nào Nữa","error",7)
                return false
            }
            $(".load_more_contacts").css("display","none")
            $("#modal_read_more_contacts").css("display","inline-block")
            contacts.forEach(contact =>{
                $("#contacts").find("ul").append(
                    `
                    <li class="_contactList" data-uid=" ${contact._id}">
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
                        <div class="user-talk" data-uid="${contact._id}">
                            Trò chuyện
                        </div>
                        <div class="user-remove-contact action-danger" data-uid="${contact._id}">
                            Xóa liên hệ
                        </div>
                    </div>
                </li>
                    `
                )
            })

        })
    })
})
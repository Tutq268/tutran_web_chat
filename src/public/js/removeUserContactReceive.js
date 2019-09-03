function removeRequestContactReceive(){
    $(".user-reject-request-contact-received").unbind().on("click",function(){
     
      let targetID = $(this).data("uid")
        $.ajax({
            url: "/contact/remove-request-contact-receive",
            type: "delete",
             data: {uid : targetID},
             success: function(data){
                 if(data.success){
                    decreaseNumberNotifContact("count-request-contact-received")
                    decreaseNumberNotification("noti_contact_counter",1)
                    $("#request-contact-received").find(`li[data-uid=${targetID}]`).remove()
                    socket.emit("remove-request-user-received", {contactId: targetID})
                 }
             }
        })
    })
}
socket.on("remove-request-user-received",function(user){
    $("#find-user").find(`div.user-remove-request-contact[data-uid=${user.id}]`).hide()
    $("#find-user").find(`div.user-add-new-contact[data-uid=${user.id}]`).css("display","inline")
    decreaseNumberNotifContact("count-request-contact-sent")
    $("#request-contact-sent").find(`ul li[data-uid = ${user.id}] `).remove()
    decreaseNumberNotification("noti_contact_counter",1)

})
$(document).ready(function(){
    removeRequestContactReceive()
})
function removeContact(){
    $(".user-remove-contact").unbind().on("click",function(){
        let targetId = $(this).data("uid")
       
    $.ajax({
        url: "/contact/remove-contact",
        type: "delete",
         data: {uid : targetId},
         success: function(data){
             console.log(data)
             if(data.success){
               
                $("#contacts").find(`ul li[data-uid = ${targetId}]`).remove()
                decreaseNumberNotification("count-contacts",1)
                socket.emit("remove-contact", {contactId: targetId})
             }
         }
    })

    })
}

socket.on("remove-contact-user",function(user){
$("#contacts").find(`ul li[data-uid= ${user.id}]`).remove()
decreaseNumberNotification("count-contacts",1)
})
$(document).ready(function(){
    removeContact()
})
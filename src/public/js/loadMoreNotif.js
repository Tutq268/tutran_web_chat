$(document).ready(function(){
    $("#modal_read_more_notif").bind("click",function(){
        let skipNumber = $("ul.list-notifications").find("li").length
        $.get(`/notification/read-more?skipNumber=${skipNumber}`,function(notifications){
            $(".load_more_spinner").css("display","inline-block")
            $("#modal_read_more_notif").css("display","none")
            if(!notifications.length){
                $(".load_more_spinner").css("display","none")
                $("#modal_read_more_notif").css("display","inline-block")
                alertify.notify("Bạn Không Có Thông Báo Nào Nữa","error",7)
                return false
            }
            $(".load_more_spinner").css("display","none")
            $("#modal_read_more_notif").css("display","inline-block")
            notifications.forEach(notification =>{
                $("ul.list-notifications").append(notification)
            })

        })
    })
})
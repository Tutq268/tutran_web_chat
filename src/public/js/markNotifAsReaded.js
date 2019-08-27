function updateMarkNotifAsReadrd(targetUsers){
  $.ajax({
      url: "/notification/mark-as-notif-readed",
      type : "put",
      data: {targetUsers: targetUsers},
      success: function(result){
          if(result){
              targetUsers.forEach(function(uid){
                  $(".noti_content").find(`div[data-uid = ${uid}]`).removeClass("notif-readed-false")
                  $("ul.list-notifications").find(`li>div[data-uid=${uid}]`).removeClass("notif-readed-false")
                  decreaseNumberNotification("noti_counter",targetUsers.length)
              })
          }
      },
      error: function(error){
          console.log("Đã Xảu Ra Lỗi " + error)
      }
  })
}

$(document).ready(function(){
    $("#notif_readed").bind("click",function(){
        let targetUsers = []
        $(".noti_content").find("div.notif-readed-false").each(function(index,notification){
            targetUsers.push($(notification).data("uid"))
        })
        if(!targetUsers.length){
            alertify.notify("Tất Cả Thông Báo Đã Được Đọc","error",7)
        }
        updateMarkNotifAsReadrd(targetUsers)

    })

    $(".mark-notif-as-read").bind("click",function(){
        let targetUsers = []
        $("ul.list-notifications").find("li>div.notif-readed-false").each(function(index,notification){
            targetUsers.push($(notification).data("uid"))
        })
        updateMarkNotifAsReadrd(targetUsers)
    })
})
$(function(){
	//选择充值金额
	$(".rechargeprice").on("tap",function(){
		$(this).toggleClass("backcolor");
		$(this).siblings().removeClass("backcolor");
		var text = $(this).find("span").eq(0).html();
		var price = text.slice(0,text.length-2);
		$(".rechargenum").find("span").eq(1).html(price + "元")
	});
	//选择支付方式
    $(".checked").on("tap",function(){
    	if($(this).children().length){
    		$(this).removeClass("bordercolor01").addClass("bordercolor02");
    		$(this).children().remove();
    	}else{
    		$(this).removeClass("bordercolor02").addClass("bordercolor01");
    		$(this).append("<img src='images/xuanzhong.png'/>");
    		$(".checked").not($(this)).removeClass("bordercolor01").addClass("bordercolor02").children().remove();
    	}
    })
    //是否同意小鱼儿协议
    $(".choise").on("tap",function(){
    	if($(this).children().length){
    		$(this).removeClass("bordercolor01").addClass("bordercolor02");
    		$(this).children().remove();
    	}else{
    		$(this).removeClass("bordercolor02").addClass("bordercolor01");
    		$(this).append("<img src='images/xuanzhong.png'/>");
    	}
    });
    
    //立刻充值
    $(".goapply").on("tap",function(){
		
    	if (Cookie.get("xiaoyuerUserMes")) {
    		var openid = JSON.parse(Cookie.get("xiaoyuerUserMes")).openid;
    		var userid = Cookie.get("userId");
    		var paymoney = $(".rechargenum").find("span").eq(1).html();
    		paymoney = paymoney.substring(0,paymoney.length-1);
    		var paystatus = 'SUCCESS';
    		if (openid) {
    			$.ajax({
    				type : "post",
    				url : Config.url + "/recharge",
    				async : false,
    				data : {
    					openid : openid,
    					userid : userid,
    					chargeAmount : paymoney,
    					payStatus : paystatus
    				},
    				success : function(data, status, xhr) {
    					if (data) {
    						if (data.resultCode == '0000') {
    							layer.open({
    								content : data.resultMessage,
    								btn : "确定",
    								yes: function(index, layero){
    									location.href = "./my_mine.html";
    								}
    							});
    						} else if (data.resultCode == '9999') {
    							layer.open({
    								content : data.resultMessage,
    								btn : "确定"
    							});
    						}
    					}
    				},
    				error : function(xhr, errorType, error) {
						layer.open({
							content : error,
							btn : "确定"
						});
    				}
    			})
    		}
    	}
    })
})
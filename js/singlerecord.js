
$(function(){
	
	
	//切换抢单与甩单的状态
	$(".singlerstyle").find("p").on("tap",function(){
		$(this).css("background","#f18a09").siblings("p").css("background","#ff9408");
		var _index = $(this).index();
		if(_index == 0){
			$(".dottitle").find("span").eq(0).html("抢单");
		}else{
			$(".dottitle").find("span").eq(0).html("甩单");
		}
	})
})
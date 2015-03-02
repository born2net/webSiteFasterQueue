var bars=6;
var bar_height=60;
var now_bar=1;
function move_bar(){
	$("#sliding_bar_main").animate({
			"margin-left": -720
		},1000,function(){
			$("#sliding_bar_main").css("margin-left", 0);
			content=$("#sliding_bar_line"+now_bar).html();
			$("#sliding_bar_line"+now_bar).remove();
			$("#sliding_bar_main").append("<div class=\"sliding_bar_line\" id=\"sliding_bar_line"+now_bar+"\">"+content+"</div>");
			if(now_bar>=bars){
				now_bar=1;
			}else{
				now_bar++;
			}
		});
}
$(document).ready(function(){
	setInterval("move_bar()", 4000);
		
});
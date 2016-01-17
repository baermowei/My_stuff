function backTop(){
	var $fixBox = $("#fixBox");
		$backBtn = $("#backBtn");
	var bSys = true;
	var timer = null;
	
	window.onscroll = function(){
	 	if(!bSys){
	 		clearInterval(timer);	
	 	}
		bSys = false;
		
		var clientHeight=document.documentElement.clientHeight; 
		var pageHeight=document.body.clientHeight;
		var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
		var top = scrollTop;

	 	if(pageHeight < clientHeight){
	 		$fixBox.hide();
	 	}
	 	else{
	 			if(scrollTop > $fixBox.height()){
	 				$fixBox.fadeIn();
	 			}else{
	 				$fixBox.hide();
	 		}
	 	}		
	};

	$backBtn.click(function(){
		timer = setInterval(function(){
				var iSpeed = Math.floor(-scrollTop/6);
				var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
				if(scrollTop === 0){
				clearInterval(timer);
				}
				bSys = true;	
				document.documentElement.scrollTop = document.body.scrollTop = scrollTop + iSpeed;
			},5);
	});
}
backTop();

//对class获取的封装
function getByClass(Oparent,iName )
	{
		var oall=document.getElementsByTagName('*')
		var arr=[];
		for (var i = 0; i < oall.length; i++)
		 {
			if (oall[i].className==iName)
			 {
				arr.push(oall[i])
			}

		}
		return arr;
	}
//对当前样式函数的封装
		function getStyle(obj,attr) 
		{
					if (obj.currentStyle) 
					{
						return obj.currentStyle[attr];
					} else {
						return getComputedStyle(obj,false)[attr];
					}
		}

//运动框架函数 （可以用在宽高、位置、和透明度）
		function moveStart(obj,json,fn) 
		{
			clearInterval(obj.timer);

		obj.timer=setInterval(function()
			{	var istop=true;
				for(attr in json)
				{

					var icurrent=0;											
					if (attr=="opacity")									//因为透明度比较特殊，所以特别判断
					 {
						icurrent=parseInt(parseFloat(getStyle(obj,attr))*100);
					} else
					 {
						icurrent=parseInt(getStyle(obj,attr));
					}

					var itarget=json[attr];
					var ispeed=(itarget- icurrent)/8;
					ispeed=ispeed>0?Math.ceil(ispeed):Math.floor(ispeed);


					if (icurrent!=itarget) 
					{
						istop=false;
					}
				
						if (attr=="opacity") 
						{
							obj.style.opacity=(icurrent+ispeed)/100;
							obj.style.fliter="alpha(opacity:"+icurrent+ispeed+")";
						} else 
						{
							obj.style[attr]=icurrent+ispeed+"px";
						}

				}
				
				if (istop) 
				{
					clearInterval(obj.timer);
					if (fn) 
					{
						fn();
					}
				}
			},30)	
		}

//简单的弹性运动使用
		var ispeed=0;
		function tanxing(obj,itarget){
			clearInterval(obj.timer)
			obj.timer=setInterval(function(){
				ispeed+=(itarget-obj.offsetLeft)/5;
				ispeed*=0.7;

				if (Math.abs(ispeed)<1 && Math.abs(itarget-obj.offsetLeft)<1) {
					clearInterval(obj.timer);
					obj.offsetLeft=itarget;//这个是为了关闭定时器时候有一个像素的误差的
				} 
					else {
					obj.style.left=obj.offsetLeft+ispeed+"px";
				}
				
			},30)

		}
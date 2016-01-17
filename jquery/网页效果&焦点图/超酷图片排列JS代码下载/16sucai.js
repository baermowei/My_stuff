window.onload = function(){
	var oBox = document.getElementById('box');
	var oMenu = getClass(oBox, 'menu')[0];
	var aMenu_a = oMenu.getElementsByTagName('a');
	var aLi = oBox.getElementsByTagName('li');
	var aA = oBox.getElementsByTagName('a');
	var i = aList = 0;
	var len = aMenu_a.length;
	var li_len = aLi.length;
	var zIndex = li_len-1;
	var timer = null;
	var oSwitch = true;
	var oPlace = [];
	var aTit = [
		{title:'功能筛选',url:'http://www.16sucai.com/daima/script/Filter/',img:'images/01.jpg'},
		{title:'手风琴效果(海贼王)',url:'http://www.16sucai.com/daima/script/accordion/',img:'images/02.jpg'},
		{title:'海贼王通缉令',url:'http://www.16sucai.com/daima/script/hzw/',img:'images/03.jpg'},
		{title:'孔明社区图片切换效果',url:'http://www.16sucai.com/daima/script/kmsq/',img:'images/04.jpg'},
		{title:'绝对固定位置回到顶部按钮',url:'http://www.16sucai.com/daima/js/positionFixed',img:'images/05.jpg'},
		{title:'模拟表单控件',url:'http://www.16sucai.com/daima/js/ten/05.html',img:'images/06.jpg'},
		{title:'拼图小游戏',url:'http://www.16sucai.com/daima/js/ten/04.html',img:'images/07.jpg'},
		{title:'苹果导航栏',url:'http://www.16sucai.com/daima/js/ten/03.html',img:'images/08.jpg'},
		{title:'模仿QQ登录窗口',url:'http://www.16sucai.com/daima/js/ten/02.html',img:'images/09.jpg'},
		{title:'窗口拖拽（Cookie保存拖拽位置）',url:'http://www.16sucai.com/daima/js/ten/01.html',img:'images/10.jpg'},
		{title:'仿土豆滚动条',url:'http://www.16sucai.com/daima/js/nine/04.html',img:'images/11.jpg'},
		{title:'照片墙',url:'http://www.16sucai.com/daima/js/nine/03.html',img:'images/12.jpg'},
		{title:'DIV弹出拖拽层',url:'http://www.16sucai.com/daima/js/nine/02.html',img:'images/13.jpg'},
		{title:'图片预加载播放器',url:'http://www.16sucai.com/daima/js/nine/01.html',img:'images/14.jpg'},
		{title:'手风琴焦点图',url:'http://www.16sucai.com/daima/js/eight/07.html',img:'images/15.jpg'},
		{title:'仿土豆底部菜单效果',url:'http://www.16sucai.com/daima/js/eight/06.html',img:'images/16.jpg'},
		{title:'仿腾讯微博效果',url:'http://www.16sucai.com/daima/js/eight/05.html',img:'images/17.jpg'},
		{title:'淘宝幻灯片2',url:'http://www.16sucai.com/daima/js/eight/04.html',img:'images/18.jpg'},
		{title:'图片淡入淡出',url:'http://www.16sucai.com/daima/js/eight/03.html',img:'images/19.jpg'},
		{title:'多级右键菜单',url:'http://www.16sucai.com/daima/js/eight/02.html',img:'images/20.jpg'},
		{title:'图片大小缩放',url:'http://www.16sucai.com/daima/js/eight/01.html',img:'images/21.jpg'},
		{title:'缓冲运动回到顶部按钮',url:'http://www.16sucai.com/daima/js/seven/06.html',img:'images/05.jpg'},
		{title:'淘宝图片幻灯片',url:'http://www.16sucai.com/daima/js/seven/04.html',img:'images/22.jpg'},
		{title:'倒计时时钟',url:'http://www.16sucai.com/daima/',img:'images/23.jpg'},
		{title:'淡入淡出焦点图',url:'http://www.16sucai.com/daima/',img:'images/24.jpg'},
		{title:'焦点图',url:'http://www.16sucai.com/daima/',img:'images/24.jpg'},
		{title:'简易选项卡',url:'http://www.16sucai.com/daima/',img:'images/25.jpg'},
		{title:'评分系统',url:'http://www.16sucai.com/daima/',img:'images/26.jpg'},
		{title:'淘宝焦点图效果(面向对象)',url:'http://www.16sucai.com/daima/',img:'images/32.jpg'},
		{title:'弹出层效果(面向对象)',url:'http://www.16sucai.com/daima/',img:'images/31.jpg'},
		{title:'延时加载(面向对象)',url:'http://www.16sucai.com/daima/',img:'images/30.jpg'},
		{title:'图片连续滚动(面向对象)',url:'http://www.16sucai.com/daima/',img:'images/29.jpg'},
		{title:'放大镜(面向对象)',url:'http://www.16sucai.com/daima/',img:'images/28.jpg'},
		{title:'淡入淡出焦点图(面向对象)',url:'http://www.16sucai.com/daima/',img:'images/24.jpg'},
		{title:'焦点图(面向对象)',url:'http://www.16sucai.com/daima/',img:'images/24.jpg'},
		{title:'选项卡(面向对象)',url:'http://www.16sucai.com/daima/',img:'images/27.jpg'},
		{title:'评分系统(面向对象)',url:'http://www.16sucai.com/daima/',img:'images/26.jpg'}
	];
	function list(){
		for(i=0;i<li_len;i++){
			var oTit_img = aLi[i].getElementsByTagName('img')[0];
			var oTit_a = aLi[i].getElementsByTagName('a')[1];
			if(aList<aTit.length){
				aLi[i].style.display= 'block';
				oTit_img.src = aTit[aList].img;
				oTit_a.href = aTit[aList].url;
				oTit_a.title = aTit[aList].title;
				oTit_a.innerHTML = aTit[aList].title;
			}else{
				aLi[i].style.display= 'none';
			}
			aList++
		}
	}
	list();
	for(i=0;i<li_len;i++){
		aLi[i].style.top = aLi[i].offsetTop+'px';
		aLi[i].style.left = aLi[i].offsetLeft+'px';
		aLi[i].style.zIndex = zIndex--;
	}
	for(i=0;i<li_len;i++){
		aLi[i].style.margin = '0';
		aLi[i].style.position = 'absolute';
		aLi[i].index = i;
		oPlace.push({left:aLi[i].offsetLeft,top:aLi[i].offsetTop});
		aLi[i].onclick = function(){
			img(this)
		};
	}
	for(i=0;i<aA.length;i++){
		aA[i].onclick = function(){
			return false;
		};
	}
	for(i=0;i<len;i++){
		var cli = 0;
		aMenu_a[i].index = i;
		aMenu_a[i].onclick = function(){
			var _this = this;
			if(this.className != 'hover'){
				var iNow = diNow = li_len-1;
				for(i=0;i<len;i++)aMenu_a[i].className = '';
				aMenu_a[this.index].className = 'hover';
				for(i=0;i<li_len;i++)aLi[i].onclick = null;
				if(cli==0){
					timer = setInterval(function(){
						if(oSwitch){
							startMove(aLi[iNow],{opacity:0,top:600,left:parseInt(918/2-130/2)});
							iNow--;
							if(iNow<0)oSwitch=false,cli=0,_this.index == 0 ? (aList = 0,list()) : (aList = 20,list());
						}else{
							setTimeout(function(){
								iNow++;
								if(diNow>=0)startMove(aLi[diNow],{opacity:100,top:oPlace[diNow].top,left:oPlace[diNow].left});
								diNow--;
								if(iNow==li_len-1){
									oSwitch=true;
									clearInterval(timer);
									for(i=0;i<li_len;i++){
										aLi[i].onclick = function(){
											img(this)
										};
									}
								}
							},1100);
						}
					},100);
				}
				cli++;
			}
		};
	}
};
//img
function img(obj){
	var oBg = document.getElementById('bg');
	var oImg_kuang = document.getElementById('img_kuang');
	var oImg_img = oImg_kuang.getElementsByTagName('img')[0];
	var oImg_H2 = oImg_kuang.getElementsByTagName('h2')[0];
	var oImg_span = oImg_kuang.getElementsByTagName('span')[0].getElementsByTagName('a')[0];
	var oImg = obj.getElementsByTagName('img')[0].src;
	var oH3 = obj.getElementsByTagName('h3')[0].getElementsByTagName('a')[0];
	oImg_img.src = oImg.replace('images/','images/big/');
	oImg_H2.innerHTML = oH3.innerHTML;
	oImg_span.href = oH3.href;
	oBg.style.display = 'block';
	oBg.style.height = document.documentElement.scrollHeight+'px';
	setTimeout(function(){
		startMove(oBg,{opacity:70},function(){
			oImg_kuang.style.display = 'block';
			startMove(oImg_kuang,{height:500,marginTop:document.documentElement.scrollTop-250},function(){
				var oClose = document.getElementById('close');
				oClose.onclick = function(){
					startMove(oImg_kuang,{height:0,marginTop:0},function(){
						oImg_kuang.style.display = 'none';
						startMove(oBg,{opacity:0},function(){
							oBg.style.display = 'none';
						});
					});
				};
			});
		});
	},1000);
}
//运动框架 一流素材网www.16sucai.com
function startMove(obj, json, fnEnd){
	if(obj.timer)clearInterval(obj.timer);
	obj.timer = setInterval(function (){
		doMove(obj, json, fnEnd);
	}, 30);
}
function getStyle(obj, attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}
function doMove(obj, json, fnEnd){
	var iCur = 0;
	var attr = '';
	var bStop = true;
	for(attr in json){
		attr == 'opacity' ? iCur = parseInt(parseFloat(getStyle(obj, 'opacity'))*100) : iCur = parseInt(getStyle(obj, attr));
		if(isNaN(iCur))iCur = 0;
		if(navigator.userAgent.indexOf("Firefox") > 0){
			var iSpeed = (json[attr]-iCur) / 6;
		}else{
			var iSpeed = (json[attr]-iCur) / 4;
		}
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		if(parseInt(json[attr])!=iCur)bStop = false;
		if(attr=='opacity'){
			obj.style.filter = "alpha(opacity:"+(iCur+iSpeed)+")";
			obj.style.opacity = (iCur + iSpeed) / 100;
		}else{
			attr == 'zIndex' ? obj.style[attr] = iCur + iSpeed : obj.style[attr] = iCur + iSpeed +'px';
		}
	}
	if(bStop){
		clearInterval(obj.timer);
		obj.timer = null;		
		if(fnEnd)fnEnd();
	}
}
//class函数
function getClass(oParent, sClass){
	var aElem = oParent.getElementsByTagName('*');
	var aClass = [];
	var i = 0;
	for(i=0;i<aElem.length;i++)if(aElem[i].className == sClass)aClass.push(aElem[i]);
	return aClass;
}
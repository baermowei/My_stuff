function EffectBuffer(fDistanceCoefficient, iMinSpeed)
{
	this.distanceCoefficient=fDistanceCoefficient;
	this.iMinSpeed=iMinSpeed;
}

EffectBuffer.prototype.initMotion=function (aMotionData)
{
	//do nothing
};

EffectBuffer.prototype.next=function (aMotionData)
{
	var motion=null;
	var i=0;
	var complete=true;
	
	for(i=0;i<aMotionData.length;i++)
	{
		motion=aMotionData[i];
		
		//计算速度
		motion.speed=(motion.target-motion.cur)/this.distanceCoefficient;
		motion.speed=ceilSpeed(motion.speed);
		if(Math.abs(motion.speed)<this.iMinSpeed)
		{
			motion.speed=this.iMinSpeed>0?this.iMinSpeed:-this.iMinSpeed;
		}
		//document.title=motion.target+"-"+motion.cur+"="+(motion.target-motion.cur)/this.distanceCoefficient;
		
		//最大速度
		if(Math.abs(motion.speed)>motion.speedMax)
		{
			motion.speed=(motion.speed>0)?motion.speedMax:-motion.speedMax;
		}
		motion.cur+=motion.speed;
		
		//检查是否停止
		/*if
		(
			(motion.speed>0 && motion.cur<motion.target) ||
			(motion.speed<0 && mon
		{
			complete=false;
		}*/
		
		if(motion.cur!=motion.target)
		{
			complete=false;
		}
	}
	
	if(complete)
	{
		for(i=0;i<aMotionData.length;i++)
		{
			aMotionData[i].cur=aMotionData[i].target;
			aMotionData[i].speed=0;
		}
		
		return true;
	}
	
	return false;
};
function ImgViewer(aImgs, oContainer, fnOnGoto)
{
	var obj=this;
	
	this.__aImgs__=aImgs;
	this.fnOnGoto=fnOnGoto;
	
	this.__imgScaleLimit__=0.5;
	this.__distanceMax__=1000;
	this.__imgSpace__=180;
	
	this.__contentWidth__=480;
	this.__contentHeight__=300;
	this.__imgWidth__=355;
	this.__imgHeight__=242;
	
	this.__totalWidth__=0;
	
	this.__oImgViewer__=oContainer;
	
	this.__iCurrentTop__=-1;
	
	this.__oImgViewerContent__=document.createElement('div');
	this.__oImgViewerContent__.style.height=this.__contentHeight__+'px';
	this.__oImgViewerContent__.style.position='relative';
	this.__oImgViewerContent__.style.overflow='hidden';
	this.__oImgViewer__.appendChild(this.__oImgViewerContent__);
	
	this.__oWorkInfoTips__=null;
	this.__createTips__();
	
	this.__em__=new MoveLib
	(
		[0], [160],
		function (arr)
		{
			obj.__fixItems__(arr[0].cur);
		},
		function (){},
		MoveLibType.BUFFER
	);
	
	this.__createImages__();
	this.__fixItems__(0);
}

ImgViewer.prototype.__calcImagePos__=function (scale, width, height)
{
	var curWidth=scale*width;
	var curHeight=scale*height;
	var oResult={};
	
	oResult.top=(height-curHeight)/2;
	oResult.width=curWidth;
	oResult.height=curHeight;
	
	return oResult;
};

ImgViewer.prototype.__calcImagesSize__=function (width, limit, distanceMax, pos, imgCount)
{
	var arrScale=[];
	var arrLeft=[];
	var arrZIndex=[];
	var sumWidth=width*imgCount;
	var i=0;
	var j=0;
	var x=0;
	var distance=0;
	var scale=0;
	var w=0;
	
	var zIndexBase=imgCount;
	
	var orgPos=pos;
	
	for(i=0;i<imgCount;i++)
	{
		x=i*width+0.5*width;

		distance=pos-x;
		if(Math.abs(distance)<=distanceMax)
		{
			scale=1-Math.abs(distance)/distanceMax;
		}
		else
		{
			scale=limit;
		}
		
		if(scale<limit)
		{
			scale=limit;
		}
		
		w=width*scale;
		
		arrScale[i]=scale;
		
		if(i>0 && scale>arrScale[i-1])
		{
			j=i;
		}
		
		//arrLeft[i]=-distance-w/2+this.__contentWidth__/2-(0.5-pos/(sumWidth))*(this.__contentWidth__-width);
		arrLeft[i]=-distance-w/2+this.__contentWidth__/2;
		//arrLeft[i]=-pos+w/2+i*width;
	}
	
	for(i=j;i>=0;i--)
	{
		arrZIndex[i]=(zIndexBase-(j-i))*10;
	}
	
	for(i=j+1;i<imgCount;i++)
	{
		arrZIndex[i]=(zIndexBase-(i-j))*10;
	}
	
	this.__totalWidth__=sumWidth;

	return {sum_width: sumWidth, arr_width:arrScale, arr_left:arrLeft, arr_zIndex: arrZIndex, current_index: j};
};

ImgViewer.prototype.__fixItems__=function (pos)
{
	var objImageData=this.__calcImagesSize__(this.__imgSpace__, this.__imgScaleLimit__, this.__distanceMax__, pos, this.__aImgs__.length);
	
	var posImage=null;
	
	var opacity=0;
	
	var i;
	
	this.__oImgViewerContent__.width=objImageData.sum_width+"px";
	
	for(i=0;i<this.__aImgs__.length;i++)
	{
		posImage=this.__calcImagePos__(objImageData.arr_width[i], this.__imgWidth__, this.__imgHeight__);
		
		this.__aImgs__[i].oCtrl.style.top=20+posImage.top+"px";
		this.__aImgs__[i].oBg.style.left=this.__aImgs__[i].oTxt.style.left=this.__aImgs__[i].oCtrl.style.left=objImageData.arr_left[i]+"px";
		this.__aImgs__[i].oBg.style.width=this.__aImgs__[i].oTxt.style.width=this.__aImgs__[i].oCtrl.style.width=posImage.width+"px";
		this.__aImgs__[i].oCtrl.style.height=posImage.height+"px";
		this.__aImgs__[i].oCtrl.style.zIndex=objImageData.arr_zIndex[i];
		this.__aImgs__[i].oBg.style.zIndex=objImageData.arr_zIndex[i]+1;
		this.__aImgs__[i].oTxt.style.zIndex=objImageData.arr_zIndex[i]+2;
		
		this.__aImgs__[i].oBg.style.top=this.__aImgs__[i].oTxt.style.top=-24+this.__aImgs__[i].oCtrl.offsetTop+this.__aImgs__[i].oCtrl.offsetHeight-this.__aImgs__[i].oBg.offsetHeight+'px';
		
		opacity=objImageData.arr_width[i];
		
		this.__aImgs__[i].oCtrl.style.filter="alpha(opacity="+Math.ceil(opacity*100)+")";
		this.__aImgs__[i].oCtrl.style.opacity=opacity;
		
		
		
	}
	
	//为当前图片添加提示框
	if(this.__iCurrentTop__!=objImageData.current_index)
	{
		this.__showTips__(objImageData.current_index);
		this.__iCurrentTop__=objImageData.current_index;
	}
	
	
	this.__oWorkInfoTips__.style.top=this.__aImgs__[this.__iCurrentTop__].oCtrl.offsetTop+this.__aImgs__[this.__iCurrentTop__].oCtrl.offsetHeight*0.7+'px';
	this.__oWorkInfoTips__.style.left=this.__aImgs__[this.__iCurrentTop__].oCtrl.offsetLeft+(this.__aImgs__[this.__iCurrentTop__].oCtrl.offsetWidth-this.__oWorkInfoTips__.offsetWidth)/2+'px';
};

ImgViewer.prototype.__createTips__=function ()
{
	var oAdorn=null;
	var oBg=null;
	
	this.__oWorkInfoTips__=document.createElement('div');
	this.__oWorkInfoTips__.id='photo_info';
	this.__oWorkInfoTips__.style.display='none';
	
	oAdorn=document.createElement('div');
	oAdorn.className='adorn';
	
	oBg=document.createElement('div');
	oBg.className='bg';
	
	this.__oWorkInfoTips__.appendChild(oAdorn);
	this.__oWorkInfoTips__.appendChild(oBg);
	
	this.__oImgViewerContent__.appendChild(this.__oWorkInfoTips__);
};

ImgViewer.prototype.__showTips__=function (index)
{
	this.__oWorkInfoTips__.style.display='block';
};

ImgViewer.prototype.__createImages__=function ()
{
	var img=null;
	var i=0;
	var obj=this;
	var oTmpA=null;
	
	for(i=0;i<this.__aImgs__.length;i++)
	{
		this.__aImgs__[i].oImgOnPage=document.createElement("img");
		this.__aImgs__[i].oImgOnPage.src='images/lightbox-ico-loading.gif';
		//this.__aImgs__[i].oImgOnPage.alt=this.__aImgs__[i].alt;
		this.__aImgs__[i].oImgOnPage.style.height=this.__imgHeight__+"px";
		this.__aImgs__[i].oImgOnPage.style.position="absolute";
		this.__aImgs__[i].oImgOnPage.style.left="0px";
		this.__aImgs__[i].oImgOnPage.style.top="0px";
		this.__aImgs__[i].oImgOnPage.style.cursor="pointer";
		
		this.__aImgs__[i].oImgOnPage.imgIndex=i;
		this.__aImgs__[i].oImgOnPage.onclick=function()
		{
			obj.gotoImg(this.imgIndex);
		};
		
		this.__aImgs__[i].oTxt=document.createElement("span");
		this.__aImgs__[i].oTxt.style.width="345px";
		this.__aImgs__[i].oTxt.className="text";
		oTmpA=document.createElement('a');
		oTmpA.innerHTML=this.__aImgs__[i].info;
		oTmpA.href=this.__aImgs__[i].href;
		oTmpA.target=this.__aImgs__.link_target;
		//this.__aImgs__[i].oTxt.innerHTML=this.__aImgs__[i].info;
		this.__aImgs__[i].oTxt.appendChild(oTmpA);
		this.__oImgViewerContent__.appendChild(this.__aImgs__[i].oTxt);
		
		this.__aImgs__[i].oBg=document.createElement("span");
		this.__aImgs__[i].oBg.className="bg";
		this.__aImgs__[i].oBg.style.width="355px";
		this.__aImgs__[i].oBg.style.height="32px";
		this.__oImgViewerContent__.appendChild(this.__aImgs__[i].oBg);
		
		this.__aImgs__[i].oDiv=document.createElement("div");
		this.__aImgs__[i].oDiv.style.background='url(images/lightbox-ico-loading.gif) no-repeat center center';
		this.__aImgs__[i].oDiv.style.height=this.__imgHeight__+"px";
		this.__aImgs__[i].oDiv.style.position="absolute";
		this.__aImgs__[i].oDiv.style.left="0px";
		this.__aImgs__[i].oDiv.style.top="0px";
		this.__aImgs__[i].oDiv.style.cursor="pointer";
		
		this.__aImgs__[i].oCtrl=this.__aImgs__[i].oDiv;
		
		this.__oImgViewerContent__.appendChild(this.__aImgs__[i].oDiv);
		
		this.__aImgs__[i].oImg=document.createElement('img');
		this.__aImgs__[i].oImg.imgIndex=i;
		this.__aImgs__[i].oImg.onload=function ()
		{
			var index=this.imgIndex;
			
			obj.__aImgs__[index].oImgOnPage.src=obj.__aImgs__[index].src;
			obj.__aImgs__[index].oImg=null;
			
			obj.__aImgs__[index].oImgOnPage.style.zIndex=obj.__aImgs__[index].oDiv.style.zIndex;
			obj.__aImgs__[index].oImgOnPage.style.position=obj.__aImgs__[index].oDiv.style.position;
			obj.__aImgs__[index].oImgOnPage.style.filter=obj.__aImgs__[index].oDiv.style.filter;
			obj.__aImgs__[index].oImgOnPage.style.width=obj.__aImgs__[index].oDiv.style.width;
			obj.__aImgs__[index].oImgOnPage.style.background=obj.__aImgs__[index].oDiv.style.background;
			obj.__aImgs__[index].oImgOnPage.style.height=obj.__aImgs__[index].oDiv.style.height;
			obj.__aImgs__[index].oImgOnPage.style.top=obj.__aImgs__[index].oDiv.style.top;
			obj.__aImgs__[index].oImgOnPage.style.cursor=obj.__aImgs__[index].oDiv.style.cursor;
			obj.__aImgs__[index].oImgOnPage.style.left=obj.__aImgs__[index].oDiv.style.left;
			obj.__aImgs__[index].oImgOnPage.style.opacity=obj.__aImgs__[index].oDiv.style.opacity;

			obj.__oImgViewerContent__.removeChild(obj.__aImgs__[index].oDiv);
			obj.__oImgViewerContent__.appendChild(obj.__aImgs__[index].oImgOnPage);
			
			obj.__aImgs__[index].oCtrl=obj.__aImgs__[index].oImgOnPage;
			
			obj.__aImgs__[index].oDiv=null;
		};
		this.__aImgs__[i].oImg.src=this.__aImgs__[i].src;
		
		//this.__oImgViewerContent__.appendChild(this.__aImgs__[i].oImgOnPage);
	}
};

ImgViewer.prototype.gotoImg=function (index)
{
	var l=0;
	
	if(index<0)
	{
		index=0;
	}
	else if(index>=this.__aImgs__.length)
	{
		index=this.__aImgs__.length-1;
	}
	
	l=95+index*this.__imgSpace__;
	this.__em__.setTarget([l]);
	if(this.fnOnGoto)
	{
		this.fnOnGoto(index);
	}
};
if(typeof MoveLibType == "undefined")
{
	MoveLibType = 
	{
		COLLISION:1,
		ELASTICITY:2,
		BUFFER:3,
		DIRECT:4,
		DIRECT_SLOW:5,
		DIRECT_FAST:6,
		BUFFER_CUSTOM:7
	};
}

if(typeof ceilSpeed == "undefined")
{
	ceilSpeed = function (fSpeed)
	{
		return fSpeed>0?Math.ceil(fSpeed):-Math.ceil(-fSpeed);
	};
}

function MoveLib(aCur, aSpeedMax, fnDoMove, fnMoveEnd, iEffectType)
{
	var i=0;
	
	switch(iEffectType)
	{
		case MoveLibType.COLLISION:
			this.__oEffect__=new EffectCollision(-0.6, 3);
			break;
		case MoveLibType.ELASTICITY:
			this.__oEffect__=new EffectElasticity(4, 0.65);
			break;
		case MoveLibType.BUFFER:
			this.__oEffect__=new EffectBuffer(8);
			break;
		case MoveLibType.DIRECT:
			this.__oEffect__=new EffectDirect(10);
			break;
		case MoveLibType.DIRECT_SLOW:
			this.__oEffect__=new EffectDirect(20);
			break;
		case MoveLibType.DIRECT_FAST:
			this.__oEffect__=new EffectDirect(5);
			break;
		case MoveLibType.BUFFER_CUSTOM:
			this.__oEffect__=new EffectBuffer(parseInt(arguments[5]),parseInt(arguments[6]));
			break;
		default:
			alert('未知的类型'+iEffectType);
			return;
	}
	
	this.motionDatas=[];
	
	for(i=0;i<aCur.length;i++)
	{
		this.motionDatas[i]={target: aCur[i], speed:0, speedMax: aSpeedMax[i], cur:aCur[i]};
	}
	
	this.fnDoMove=fnDoMove;
	this.fnMoveEnd=fnMoveEnd;
	
	this.interval=40;
	
	this.timer=null;
	this.lastTimer=0;
	
	this.enabled=true;
	
	this.pause=false;
}

MoveLib.prototype.setTarget=function (aValue)
{
	var t=(new Date()).getTime();
	var allSame=true;
	var i=0;

	for(i=0;i<aValue.length;i++)
	{
		this.motionDatas[i].target=parseInt(aValue[i]);
		if(this.motionDatas[i].target!=this.motionDatas[i].cur)
		{
			allSame=false;
		}
	}
	
	if(allSame)
	{
		if(!this.timer)
		{
			this.start();
		}
		return;
	}
	
	this.__oEffect__.initMotion(this.motionDatas);
	
	if(this.enabled)
	{
		if(!this.timer)
		{
			this.start();
		}
		
		if(t-this.lastTimer>this.interval)
		{
			this.__timerHandler__();
			this.lastTimer=t;
		}
	}
};

MoveLib.prototype.setCurrent=function (aValue)
{
	var i=0;
	
	for(i=0;i<aValue.length;i++)
	{
		this.motionDatas[i].cur=parseInt(aValue[i]);
	}
};

MoveLib.prototype.start=function ()
{
	var obj=this;
	
	if(!this.enabled)
	{
		return;
	}
	
	if(this.timer)
	{
		clearInterval(this.timer);
	}
	else
	{
		this.timer=setInterval
		(
		 	function ()
			{
				obj.__timerHandler__();
			},
			this.interval
		);
	}
	
	this.iStartTime=((new Date()).getTime());
	this.iCounter=0;
};

MoveLib.prototype.stop=function ()
{
	if(this.timer)
	{
		clearInterval(this.timer);
		this.timer=null;
	}
};

MoveLib.prototype.__timerHandler__=function ()
{
	var bEnd=false;
	
	if(this.pause)
	{
		return;
	}
	
	bEnd=this.__oEffect__.next(this.motionDatas);
	
	if(bEnd)
	{
		if(this.fnMoveEnd)
		{
			this.fnMoveEnd(this.motionDatas);
		}
		
		this.fnDoMove(this.motionDatas);
		this.stop();
	}
	else
	{
		this.iCounter++;
		this.fnDoMove(this.motionDatas);
	}
	
	this.lastTimer=((new Date()).getTime());
};
//一流素材网收藏整理：www.16sucai.com 代码来源妙味课堂www.miaov.com
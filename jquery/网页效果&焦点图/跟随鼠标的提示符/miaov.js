var g_aData=
[
	'妙味课堂于10月10日举办了 <a href="http://blog.miaov.com/787.html">第一期JavaScript研讨会</a>。由石川(blue)为大家分享了以下内容：新浪微博效果、DOM、闭包使用技巧、面向对象、高级拖拽、运动特效、AJax、官网导航效果等。在北京的朋友想参加此类活动，可通过 电话、QQ群、在线留言、博客留言 等方式与我们取得联系，以便我们为各位朋友安排座位^_^！',
	'妙味课堂 <a href="http://www.miaov.com/message.html.php">JavaScript课程</a> 简介：针对各大公司（如：淘宝/百度/新浪/搜狐）的招聘要求，妙味课堂精心打造此课程，满足企业实际用人需要。课程内容特别精选了JavaScript的高级DOM操作、AJAX技术应用、OOP思想、继承等知识进行深度剖析，本课程全部精美的实例皆为妙味课堂原创，力图为学员揭秘各种网站交互效果，并帮助学员建立正确而清晰的编程思路……',
	'妙味课堂 <a href="http://www.miaov.com/course_detail_2.html.php">高级页面架构师精品课程</a>是为了让大家制作出较为规范的页面，例如：符合 W3C 标准、标签语义化、模块化布局、能熟练解决浏览器兼容性、能洞晰 CSS 代码性能等问题的朋友们而设。通过这门课程，你可以充分了解到标准带来的好处、页面代码的简洁与 CSS 样式的高重用性……',
	'妙味课堂 <a href="http://www.miaov.com/course_detail_3.html.php">零基础网页制作精品课程</a> 从零基础出发，站在完全不懂的学员角度考虑，在 课程安排、案例讲解、作业布置、课后辅导 等几个方面着手，力求为学员带来一门系统化极强、讲解风格却通俗易懂的 精品入门课程，欢迎朋友们来试听，一探究竟！'
];

var g_oTimerHide=null;

window.onload=function ()
{
	var aLi=document.getElementById('content').getElementsByTagName('li');
	
	bindTopic(aLi);
};

function bindTopic(aElement)
{
	var i=0;
	
	for(i=0;i<aElement.length;i++)
	{
		aElement[i].miaovIndex=i;
		aElement[i].onmouseover=function (ev){showTopic(this.miaovIndex, window.event || ev);};
		aElement[i].onmouseout=function (){hideTopic();};
		aElement[i].onmousemove=function (ev)
		{
			var oEvent=window.event || ev;
			setPosition(oEvent.clientX, oEvent.clientY);
		};
	}
}

function showTopic(index, oEvent)
{
	var oTopic=document.getElementById('topic');
	
	if(g_oTimerHide)
	{
		clearTimeout(g_oTimerHide);
	}
	
	oTopic.getElementsByTagName('div')[1].innerHTML=g_aData[index];
	oTopic.style.display='block';
	
	setPosition(oEvent.clientX, oEvent.clientY);
}

function hideTopic()
{
	var oTopic=document.getElementById('topic');
	
	if(g_oTimerHide)
	{
		clearTimeout(g_oTimerHide);
	}
	g_oTimerHide=setTimeout
	(
		function ()
		{
			oTopic.style.display='none';
		},50
	);
}

function setPosition(x, y)
{
	var top=document.body.scrollTop || document.documentElement.scrollTop;
	var left=document.body.scrollLeft || document.documentElement.scrollLeft;
	
	x+=left;
	y+=top;
	
	var oTopic=document.getElementById('topic');
	var l=x+20;
	var t=y-(oTopic.offsetHeight-20);
	var bRight=true;
	var iPageRight=left+document.documentElement.clientWidth;
	
	if(l+oTopic.offsetWidth>iPageRight)
	{
		bRight=false;
		
		l=x-(oTopic.offsetWidth+20);
		oTopic.getElementsByTagName('div')[0].className='adorn_r';
	}
	else
	{
		oTopic.getElementsByTagName('div')[0].className='adorn';
	}
	
	oTopic.style.left=l+'px';
	oTopic.style.top=t+'px';
}
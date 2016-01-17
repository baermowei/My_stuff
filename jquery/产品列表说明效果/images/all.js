/**
 * 
 */
//var isInOpenDay;
$(function(){
	bindApplyButton();
	changeLan();
});
function changeLan(){
	var href= window.location.href;
	$('.header .edition').find('a[attr=en]').click(function(){			
			window.location.href=href+"&lan=en";	
	});
	$('.header .edition').find('a').eq(0).click(function(){	
		if(href.match(/\&lan\=en/)){
			href=href.replace(/\&lan=en/,'');
			window.location.href=href;
		}		
	});
}
function bindApplyButton(){
	var lan='';
	$('.banner .opt_btn').bind("click",function(){
		if($('body').hasClass('zh')){
			lan = 'zh';			
		}else{
			lan = 'en';
		}
		getWeTicket(lan);	
	});
}
//点击申领
function getWeTicket(lan){
	var isInOpenDay=null;
	//如果没有点击过
		$.ajax({
			url:'ajax.php',
			data:'act=isOpenDay',
			type:'POST',
			dataType:'text',
			timeout:15000,
			error:function(e){
				if(e.statusText=='timeout'){
					showTimeOutDiv(lan);
				}else{
					showTimeOutDiv(lan);
				}
			},
			success:function(text){
				var r = eval('('+$.trim(text)+')');								
				if (r[0]){
					showAlertDiv(r[0],lan);
				}else if(r[0]=='-1'){
					showStopDiv(lan,r[1]);
				}else{
					alert("申领失败");
				}
			}
		});
}
function showAlertDiv(inOpenDay,lan){
	var alertJq = null;
	if(inOpenDay=="1"){	//在开放日内
		alertJq = $(getInOpenDayHtml(lan));
	}else if(inOpenDay=="0"){//不在开放日内
		alertJq = $(showTimeOutHtml(lan));			
	}else if(inOpenDay=="-1"){
		alertJq = $(showStopHtml(lan));
	}
	if(alertJq){
		alertJq.setLightBox({layoverBg:'#000',layoverOpa:'0.4',alertdivWidth:'800px',closeBut:'.closebut',layerdivClick:true,canNotDrag:true});
	}else{
		showTimeOutDiv(lan);
	}
	$('#changecode,#codeimg').unbind().bind('click',function(){
		$('#codeimg').attr('src','checkno.php?'+Math.random());					
	});
	$(".application_input input").blur(function(){
		validateStep1(lan,true);
	});
}
function showStopDiv(lan,msg){
	var alertJq = null;
	alertJq = $(showStopHtml(lan));
	if(alertJq){
		alertJq.setLightBox({layoverBg:'#000',layoverOpa:'0.4',alertdivWidth:'800px',closeBut:'.closebut',layerdivClick:true,canNotDrag:true});
	}else{
		showTimeOutDiv(lan);
	}

}
//开放日的HTML
function getInOpenDayHtml(lan){
	if (lan=='zh'){
		return html ='<div class="layer_shadow"><div class="mod_layer_wrap"><a id="alertclose" href="javascript:;" class="btn_close_layer closebut"></a><div class="main_tip_wrap application"><div class="tickets_application"><h2>No more than 1200 tickets!</h2><p>Ticket application available between Oct 28 and Oct 30.</p></div></div><!-- main_tip_wrap --><div class="mod_layer_content"><p class="application_tip">您需要有效填写以下信息，抢票成功将收到WE大会官方发出的手机确认短信及注册码。<br>申领订单一经提交，则无法修改，重复提交无效</p><ul class="application_input"><li><label for="applicant_name" class=" ">姓名</label><input name="Name" type="text" id="applicant_name" class=""><div style="display:block;" class="error_tip"></div></li><li><label for="applicant_company" class=" ">工作单位/职务</label><input name="Department" type="text" id="applicant_company"><div style="display:block;" class="error_tip"></div></li><li><label for="applicant_phone_number" class=" ">手机</label><input name="MobilePhoneNum" type="text" id="applicant_phone_number"><div style="display:block;" class="error_tip"></div></li><li><label for="applicant_email" class=" ">E-mail</label><input name="Email" type="text" id="applicant_email"><div style="display:block;" class="error_tip"></div></li><li><label for="applicant_checkno">验证码</label><input type="text" class="" id="applicant_checkno" name="checkno"><div class="error_tip" style="display:block;"></div></li></ul><div class="checkno"><img width="80" alt="验证码" id="codeimg" class="pointer" src="checkno.php?v='+rand+'"><a href="javascript:;" id="changecode">看不清，换一张</a></div></div><!--mod_layer_content --><div class="mod_layer_btn"><a id="submit" onclick="submitApply(\'zh\'\,false);" href="javascript:;" class="mod_btn">提交</a></div></div></div>	<div class="layer_shadow succeed none"><div class="mod_layer_wrap"><a class="btn_close_layer closebut" href="javascript:;"></a><div class="main_tip_wrap"><div class="success_tip"><div class="tip_wrap"><i class="ico_success"></i><p class="success">您的申领信息已经被记录!</p></div><p>抢票成功将在2013年11月5日前收到WE大会官方发出的手机确认短信及注册码。<br /><br />凭手机短信和注册码即可签到入场。手机确认短信转发无效</p></div></div><div class="mod_layer_content"><h3 class="follow_us">大会最新信息请关注：</h3><div class="mod_wrap"><div class="wechat_wrap"><h4>WE大会微信公众账号：WEsummit </h4><div class="qr_wrap"><img src='+file_root +'images/qr_code.png'+'></div></div><div class="weibo_wrap">	<h4>腾讯、新浪微博账号：WE大会</h4>	<div class="weibo_unit">		<a class="ico_tencent_weibo" title="腾讯微博" href="http://t.qq.com/wesummit">腾讯微博</a>		<p>腾讯微博</p>	</div>	<div class="weibo_unit sina_weibo">		<a class="ico_sina_weibo" title="新浪微博" href="http://weibo.com/u/3820933068">新浪微博</a>		<p>新浪微博</p>	</div></div></div></div><div class="mod_layer_btn"><a class="mod_btn closebut" href="javascript:;">确认</a></div></div></div><div class="layer_shadow fail none"><div class="mod_layer_wrap"><a href="javascript:;" class="btn_close_layer closebut"></a><div class="main_tip_wrap"><div class="wrong_tip"><i class="ico_fail"></i><p class="fail_info"></p></div></div><!--mod_layer_content --><div class="mod_layer_btn"><a href="javascript:;" class="mod_btn closebut">返回</a></div></div></div>';		
	}else{
		return html = '<div class="layer_shadow"><div class="mod_layer_wrap"><a class="btn_close_layer closebut" href="javascript:;"></a><div class="main_tip_wrap application"><div class="tickets_application"><h2>No more than 1200 tickets!</h2><p>Ticket application available between Oct 28 and Oct 30.</p></div></div> <div class="mod_layer_content"><p class="application_tip">Please complete information required below. You will receive a conformation text message to mobile phone once you have successfully obtained the free ticket. No modification can be made after submission. Re-submission is invalid.</p><ul class="application_input"><li><label class="applicant_name" for="applicant_name">name</label><input class="" id="applicant_name" type="text" /><div class="error_tip" style="display:block;"></div></li><li><label class="applicant_company" for="applicant_company">Post, Company </label><input id="applicant_company" type="text" /><div class="error_tip" style="display:block;"></div></li><li><label class="applicant_phone_number" for="applicant_phone_number">Mobile Phone. NO.</label><input id="applicant_phone_number" type="text" /><div class="error_tip" style="display:block;"></div></li><li><label class="applicant_email" for="applicant_email">E-mail</label><input id="applicant_email" type="text" /><div class="error_tip" style="display:block;"></div></li><li><label class="applicant_checkno" for="applicant_checkno">Code</label><input type="text" name="checkno" id="applicant_checkno" class=""><div style="display:block;" class="error_tip"></div></li></ul><div class="checkno"><img width="80" class="pointer" id="codeimg" alt="code" src="checkno.php?v='+rand+'"><a id="changecode" href="javascript:;">change code</a></div></div><div class="mod_layer_btn"><a class="mod_btn btn_submit" onclick="submitApply(\'en\');" href="javascript:;">submit</a></div></div></div>		<div class="layer_shadow  succeed none"><div class="mod_layer_wrap"><a class="btn_close_layer closebut" href="javascript:;"></a><div class="main_tip_wrap"><div class="success_tip"><div class="tip_wrap"><i class="ico_success"></i><p class="success">success!</p></div><p>You will receive a conformation text message to mobile phone before the Nov 5 once you have successfully obtained the free ticket. Entry shall be permitted upon sight of the text message.</p></div></div><div class="mod_layer_content"><h3 class="follow_us">Please follow us</h3><div class="mod_wrap"><div class="wechat_wrap"><h4>WeChat public account: WEsummit</h4><div class="qr_wrap"><img src='+file_root +'images/qr_code.png'+'></div></div><div class="weibo_wrap">	<h4>Tencent, Sina Weibo accounts: WE大会</h4>	<div class="weibo_unit">		<a class="ico_tencent_weibo" title="Tencent Weibo" href="http://t.qq.com/wesummit">Tencent Weibo</a>		<p>Tencent Weibo</p>	</div>	<div class="weibo_unit sina_weibo">		<a class="ico_sina_weibo" title="Sina Weibo" href="http://weibo.com/u/3820933068">Sina Weibo</a><p>Sina Weibo</p></div></div></div></div><div class="mod_layer_btn"><a class="mod_btn btn_confirm closebut" href="javascript:;">confirm</a></div></div></div>	<div class="layer_shadow fail none"><div class="mod_layer_wrap"><a class="btn_close_layer closebut" href="javascript:;"></a><div class="main_tip_wrap"><div class="wrong_tip"><i class="ico_fail"></i><p class="fail_info">Fail!<br>You had applied！</p></div></div><div class="mod_layer_btn"><a class="mod_btn btn_back closebut" href="javascript:;">confirm</a></div></div></div>';
	}

}
//异常发生HTMl
function showTimeOutHtml(lan,other){
	if(lan == 'zh'){
		return html = '<div class="layer_shadow fail "><div class="mod_layer_wrap"><a href="javascript:;" class="btn_close_layer closebut"></a><div class="main_tip_wrap"><div class="wrong_tip"><i class="ico_fail"></i><p class="fail_info">未成功！<br>系统现在小忙，请稍后再试。</p></div></div><!--mod_layer_content --><div class="mod_layer_btn"><a href="javascript:;" class="mod_btn closebut">返回</a></div></div></div>';
	}else{
		return html = '<div class="layer_shadow fail "><div class="mod_layer_wrap"><a href="javascript:;" class="btn_close_layer closebut"></a><div class="main_tip_wrap"><div class="wrong_tip"><i class="ico_fail"></i><p class="fail_info">Fail!<br>System is busy now, please try again.</p></div></div><!--mod_layer_content --><div class="mod_layer_btn"><a href="javascript:;" class="mod_btn closebut">confirm</a></div></div></div>';
	}	
}
function showTimeOutDiv(lan){
	var alertJq = null;
	alertJq = $(showTimeOutHtml(lan));
	if(alertJq){
		alertJq.setLightBox({layoverBg:'#000',layoverOpa:'0.4',alertdivWidth:'800px',closeBut:'.closebut',layerdivClick:true,canNotDrag:true});
	}else{
		alert('异常');
	}	
	
}
//提前关闭的HTML
function showStopHtml(lan){
	if(lan == 'zh'){
		return html = '<div class="layer_shadow fail "><div class="mod_layer_wrap"><a href="javascript:;" class="btn_close_layer closebut"></a><div class="main_tip_wrap"><div class="wrong_tip"><i class="ico_fail"></i><p class="fail_info" style="font-size:1.8em;">门票申领已经结束，多谢您的关注。</span></p></div></div><!--mod_layer_content --><div class="mod_layer_btn"><a href="javascript:;" class="mod_btn closebut">返回</a></div></div></div>';
	}else{
		return html = '<div class="layer_shadow fail "><div class="mod_layer_wrap"><a href="javascript:;" class="btn_close_layer closebut"></a><div class="main_tip_wrap"><div class="wrong_tip"><i class="ico_fail"></i><p class="fail_info" style="font-size:1.8em;">The tickets had been booked up already.<br/> <span style="display:inline-block;text-indent:0px;">Thanks for your attention.</span></p></div></div><!--mod_layer_content --><div class="mod_layer_btn"><a href="javascript:;" class="mod_btn closebut" style="text-indent: 0px;">confirm</a></div></div></div>';
	}	
	
}

//非开放日的HTML
function getNotInOpenDayHtml(lan){
	var alertJq = null;
	if(lan=='zh'){
		return html = '<div class="layer_shadow"><div class="mod_layer_wrap"><a class="btn_close_layer closebut" href="javascript:;"></a>	<div class="main_tip_wrap">		<div class="tickets_application"><h2>限量1200张！</h2><p>WE大会门票免费申领（10月28日至30日）</p>		</div>	</div>	<div class="mod_layer_content">		<h3 class="follow_us">大会最新信息请关注：</h3><div class="mod_wrap"><div class="wechat_wrap">	<h4>WE大会微信公众账号：WEsummit </h4>	<div class="qr_wrap"><img src='+file_root +'images/qr_code.png'+'></div></div><div class="weibo_wrap">	<h4>腾讯、新浪微博账号：WE大会</h4>	<div class="weibo_unit">		<a class="ico_tencent_weibo" title="腾讯微博" href="http://t.qq.com/wesummit">腾讯微博</a>		<p>腾讯微博</p>	</div>	<div class="weibo_unit sina_weibo">		<a class="ico_sina_weibo" title="新浪微博" href="http://weibo.com/u/3820933068">新浪微博</a>		<p>新浪微博</p>	</div></div>		</div>	</div>	<div class="mod_layer_btn">		<a class="mod_btn closebut" href="javascript:;">关闭</a>	</div></div></div>';		
	}else{
		return html = '<div class="layer_shadow"><div class="mod_layer_wrap"><a class="btn_close_layer closebut" href="javascript:;"></a>	<div class="main_tip_wrap">		<div class="tickets_application"><h2>No more than 1200 tickets!</h2><p>Ticket application available between Oct 28 and Oct 30.</p>		</div>	</div><!-- main_tip_wrap -->	<div class="mod_layer_content">		<h3 class="follow_us">Please follow us</h3>		<div class="mod_wrap"><div class="wechat_wrap">	<h4>WeChat public account: WEsummit</h4><div class="qr_wrap"><img src='+file_root +'images/qr_code.png'+'></div></div><div class="weibo_wrap">	<h4>Tencent, Sina Weibo accounts: WE大会</h4>	<div class="weibo_unit">		<a class="ico_tencent_weibo" title="Tencent Weibo" href="http://t.qq.com/wesummit">Tencent Weibo</a>		<p>Tencent Weibo</p>	</div>	<div class="weibo_unit sina_weibo">		<a class="ico_sina_weibo" title="Sina Weibo" href="http://weibo.com/u/3820933068">Sina Weibo</a>		<p>Sina Weibo</p>	</div></div>		</div>	</div><!--mod_layer_content -->	<div class="mod_layer_btn">		<a class="mod_btn btn_close closebut" href="javascript:;">close</a>	</div></div></div>';
	}

}
//提交申领
function submitApply(lan,m){
	if(!validateStep1(lan,m)){
		return false;
	}
	var name = encodeURIComponent($.trim($('#applicant_name').val()));
	var tel = encodeURIComponent($.trim($('#applicant_phone_number').val()));
	var deparment = encodeURIComponent($.trim($('#applicant_company').val()));
	var email = encodeURIComponent($.trim($('#applicant_email').val()));
	var code = encodeURIComponent($.trim($('#applicant_checkno').val()));
	$('.application_input .error_tip').val('');
	$.ajax({
		url:'ajax.php',
		data:'act=saveapply&Name='+name+'&MobilePhoneNum='+tel+'&Department='+deparment+'&Email='+email+'&code='+code,
		type:'POST',
		dataType:'text',
		timeout:15000,
		error:function(e){
			if(e.statusText=='timeout'){
				showTimeOutDiv(lan);
			}else{
				showTimeOutDiv(lan);
			}			
		},
		success:function(text){
			var r = eval('('+$.trim(text)+')');
			if(r[0]){//成功
				$('.layer_shadow ').addClass('none');
				$('.layer_shadow.succeed').removeClass('none');
			}else{	//失败
				if(r[1]=='-1'){
					var ele =$('#applicant_checkno');
					ele.addClass('on_error');
					if(lan == 'zh'){
						ele.next().text('验证码不正确');
					}else{
						ele.next().text('code error');
					}					
				}else{
					$('.layer_shadow ').addClass('none');
					$('.layer_shadow.fail').removeClass('none');
					if(lan=='zh'){
						$('.layer_shadow.fail .wrong_tip').find('.fail_info').html('未成功！<br>'+r[1]);
					}else{
						r[1]="You had applied！";
						$('.layer_shadow.fail .wrong_tip').find('.fail_info').html('Fail！<br>'+r[1]);
					}
										
				}
			}
		}
	});
}
//验证
function validateStep1(lan,isBlur){
	var flag = false;
    var e = null; var val = '';
    e = $('#applicant_name');
    if ($.trim(e.val()) == '') {
        if (lan == 'zh') {
            e.next().html('请输入您的姓名');
        } else {
            e.next().html('Please enter your name.');
        }
        e.addClass('on_error'); 
		if(isBlur){
			return flag;
		}
    } else {
        clearTip();
    }
    e = $('#applicant_company');
    val = $.trim(e.val());
    if (val == '') {
        if (lan == 'zh') {
            e.next().html('工作单位/职务是必填项');
        } else {
            e.next().html('Please enter your post,company');
        }
        e.addClass('on_error');
		if(isBlur){
			return flag;
		}
    } else {
        clearTip();
    }
    e = $('#applicant_phone_number');
    val = $.trim(e.val());
    if (val == '') {
        if (lan == 'zh') {
            $tip = '手机是必填项';
        } else {
            $tip = 'Please enter your phone number';
        }
        e.next().html($tip);
        e.addClass('on_error');
		if(isBlur){
			return flag;
		}
    } else if (val.match(/\D/)) {
        if (lan == 'zh') {
            $tip = '只能是数字';
        } else {
            $tip = 'Number only';
        }
        e.next().html($tip);
        e.addClass('on_error');
		if(isBlur){
			return flag;
		}
    }
    e = $('#applicant_email');
    val = $.trim(e.val());
    if (!val.match(/^([\w-+\._]+){1,}@[\w-]{2,}(\.[\w-]{2,}){1,2}$/)) {
        if (lan == 'zh') {
            e.next().html('邮箱格式不正确');
        } else {
            e.next().html('Email format not correct');
        }
        e.addClass('on_error');
		if(isBlur){
			return flag;
		}
    } else {
        clearTip();
    }
    e = $('#applicant_checkno');
    val = $.trim(e.val());
    if(val == ''){
        if (lan == 'zh') {
            e.next().html('请输入验证码');
        } else {
            e.next().html('Please enter code');
        }
        e.addClass('on_error');
		if(isBlur){
			return flag;
		}
    } else {
    	 clearTip();
    }
    if($('.on_error').length>0){
    	if(!isBlur){
    		$('.on_error').eq(0).focus();//第一个错误的输入框获得焦点
    	}
    }else{
    	flag = true;
    }
	
    return flag;
}
function clearTip(){
    $('.application_input .error_tip').text("");
    $('ul input').removeClass('on_error');
}
	jQuery.fn.setLightBox=function(options){
	var layoverBg=options.layoverBg?options.layoverBg:'transparent';
	var layoverOpa=options.layoverOpa?options.layoverOpa:'0.5';
	var alertdivWidth=options.alertdivWidth?options.alertdivWidth:'auto';
	var alertdivHeight=options.alertdivHeight?options.alertdivHeight:'auto';
	var alertdivBg=options.alertdivBg?options.alertdivBg:'transparent';
	var closebut=options.closeBut;
	var layerdiv,alertdiv;var isfirst=true;
	if(jQuery('.layoverdiv').length==0){
	layerdiv=jQuery('<div class="layoverdiv" style="position:absolute;width:100%;height:100%;z-index:9998;left:0;top:0;display:none;"></div>');
	alertdiv=jQuery('<div class="alertdiv" style="position:absolute;top:50%;left:50%;display:none;z-index:9999;"></div>');
	jQuery('body').append(alertdiv).append(layerdiv);
	}else{
	isfirst=false;
	layerdiv=jQuery('.layoverdiv');
	if(options.multil){
	off=jQuery('.alertdiv').length*3+50+'%';
	alertdiv=jQuery('<div class="alertdiv alertmultil" style="overflow:auto;position:absolute;top:'+off+';left:'+off+';display:none;z-index:9999;"></div>');
	jQuery('body').append(alertdiv);
	}else{
	jQuery('.alertmultil').remove();
	alertdiv=jQuery('.alertdiv');
	}
	}
	layerdiv.css('background',layoverBg);
	layerdiv.width(jQuery('body').outerWidth(true));
	layerdiv.height(jQuery('body').outerHeight(true)>document.documentElement.scrollHeight?jQuery('body').outerHeight(true):document.documentElement.scrollHeight);
	alertdiv.css('background',alertdivBg);
	alertdiv.css({'width':alertdivWidth,'height':alertdivHeight}).html('').append(jQuery(this));
	if(!options.multil){
	layerdiv.css('opacity','0').css('display','block').fadeTo(500,layoverOpa);
	}
	alertdiv.fadeIn(600,function(){
	layerdiv.height(jQuery('body').outerHeight(true)>document.documentElement.scrollHeight?jQuery('body').outerHeight(true):document.documentElement.scrollHeight);
	});
	if(!options.canNotDrag){
	var dragbodys=options.dragbody?alertdiv.find(options.dragbody):alertdiv;
	if(alertdiv.find('img').length!=0){
	if(options.closeBut||options.multil){
	dragbodys.drag({dragbody: alertdiv,opacity: '0.8',preventEvent:true});
	}else{
	dragbodys.drag({dragbody: alertdiv,opacity: '0.8',preventEvent:true,mouseupFn:function(){if(!draged){$('.alertdiv,.layoverdiv').fadeOut();}}});
	}
	}else{
	if(options.closeBut||options.multil){
	dragbodys.drag({dragbody: alertdiv,opacity: '0.8'});
	}else{
	dragbodys.drag({dragbody: alertdiv,opacity: '0.8',mouseupFn:function(){if(!draged){$('.alertdiv,.layoverdiv').fadeOut();}}});
	}
	}
	}
	var mtop = -(alertdiv.outerHeight()/2);
	var clientH = document.documentElement.clientHeight;
	var clientW = document.documentElement.clientWidth;
	var stop = clientH/2+document.documentElement.scrollTop;
	if(stop+mtop<0){
	stop = 20;
	mtop = 0;
	}
	var inwindow_padding = 15;
	alertdiv.css('top',stop+'px');
	alertdiv.css({'margin-left':'-'+(alertdiv.outerWidth()/2+'px'),'margin-top':mtop+'px'});
	jQuery(this).add(jQuery(this).find('img')).load(function(){
	if(options.inWindow){
	if(($(this).height())>clientH){
	$(this).height(clientH-inwindow_padding*2);
	}
	if((false&&$(this).width())>clientH){
	$(this).width(clientW-inwindow_padding*2);
	}
	}
	stop = clientH/2+document.documentElement.scrollTop;
	mtop = -(alertdiv.outerHeight()/2);
	if(stop+mtop<0){
	stop = 20;
	mtop = 0;
	alertdiv.css('top',stop+'px');
	}
	alertdiv.css('top',stop+'px');
	alertdiv.css({'margin-left':'-'+(alertdiv.outerWidth()/2+'px'),'margin-top':mtop+'px'});
	});
	//}
	if(!options.layerdivClick&&!options.multil){
	layerdiv.unbind('click').click(function(){
	$('.alertdiv,.layoverdiv').fadeOut();
	});
	}
	if(closebut!=undefined){
	alertdiv.find(closebut).unbind('click').click(function(){
	if(options.closeSelf){
	$('.alertdiv,.layoverdiv').css('display','none');
	}else if(options.multil){
	alertdiv.remove();
	}else{
	$('.alertdiv,.layoverdiv').fadeOut();
	}
	});
	}
	if(options.sureBut!=undefined){
	alertdiv.find(options.sureBut).unbind('click').click(function(){
	$(this).attr('disabled',true);
	if(options.closeSelf){
	$('.alertdiv,.layoverdiv').css('display','none');
	}
	if(typeof(options.sureFn)=='function'&&options.sureFn($(this),options.suerPara)===false){
	$(this).attr('disabled',false);
	return;
	}
	$(this).attr('disabled',false);
	if(!options.closeSelf){
	if(options.multil){
	alertdiv.remove();
	}else{
	$('.alertdiv,.layoverdiv').fadeOut();
	}
	}
	});
	}
	if(options.closeSelfBut!=undefined){
	alertdiv.find(options.closeSelfBut).unbind('click').click(function(){
	alertdiv.remove();
	});
	}
	};
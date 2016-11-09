/* spig.js */
//右键菜单
jQuery(document).ready(function ($) {
    $("#spig").mousedown(function (e) {
        if(e.which==3){
        showMessage("确定要关闭吗？:<br /><a href=\"javascript:void(0)\" onclick=\"close_spig()\" title=\"确定\">确定</a>    <a href=\"javascript:void(0)\"onclick=\"closeMessage()\" title=\"取消\">取消</a>",10000);
}
});
$("#spig").bind("contextmenu", function(e) {
    return false;
});
});

//鼠标在消息上时
jQuery(document).ready(function ($) {
    $("#message").hover(function () {
       $("#message").fadeTo("100", 1);
     });
});


//鼠标在上方时
jQuery(document).ready(function ($) {
    //$(".mumu").jrumble({rangeX: 2,rangeY: 2,rangeRot: 1});
    $(".mumu").mouseover(function () {
       $(".mumu").fadeTo("300", 0.3);
       msgs = ["我隐身了，你看不到我"];
       var i = Math.floor(Math.random() * msgs.length);
        showMessage(msgs[i]);
    });
    $(".mumu").mouseout(function () {
        $(".mumu").fadeTo("300", 1)
    });
});

//开始
jQuery(document).ready(function ($) {
    if (isindex) { //如果是主页
        var now = (new Date()).getHours();
        if (now > 0 && now <= 6) {
            showMessage(' 你是夜猫子呀？还不睡觉，明天起的来么你？', 6000);
        } else if (now > 6 && now <= 11) {
            showMessage(' 早上好，早起的鸟儿有虫吃噢！一大早就开始学术，给你个赞！', 6000);
        } else if (now > 11 && now <= 14) {
            showMessage(visitor + ' 中午好！科研也要吃饭哟！', 6000);
        } else if (now > 14 && now <= 18) {
            showMessage(' 午后的时光真难熬！注意劳逸结合！', 6000);
        } else {
            showMessage(' 快来逗我玩吧！', 6000);
        }
    }
    $(".spig").animate({
        top: $(".spig").offset().top + 400,
        left: document.body.offsetWidth - 160
    },
	{
	    queue: false,
	    duration: 1000
	});
});

//鼠标在某些元素上方时
jQuery(document).ready(function ($) {
    $('.navbar-header a').mouseover(function () {//标题被点击时
        showMessage('<span style="color:#0099cc;">' + $(this).text() + '</span></br>一个具有网络重塑功能的可视化平台');
    });
    $('#air-tip').mouseover(function () {
        showMessage('<span style="color:#0099cc;">Air Traffic</span></br>中国空域网络图');
    });
    $('#les-tip').mouseover(function () {
        showMessage('<span style="color:#0099cc;">Les-Miserables</span></br>《悲惨世界》中的人物关系网络');
    });
    $('#train-tip').mouseover(function () {
        showMessage('<span style="color:#0099cc;">Train Boming</span></br>2003年3·11马德里火车爆炸袭击的恐怖组织网络');
    });
    $('#network-tip').mouseover(function () {
        showMessage('<span style="color:#0099cc;">Network 1</span></br>更多网络更新中');
    });
    $('#filename').mouseover(function () {
        showMessage('打开其他的网络图！</br><span style="color:red;">网络格式有严格限定</br>不建议使用</span>');
    });

    $('#main-menu').mouseover(function(){
        showMessage('这是侧面快速导航栏</br>由上自下依次为：</br><span style="color:#0099cc;">主面板</span></br><span style="color:#ec971f;">网络可视化图</span></br><span style="color:#0099cc;">网络基本信息</span></br><span style="color:#ec971f;">节点操作</span></br><span style="color:#0099cc;">更多信息</span></br><span style="color:#ec971f;">帮助页面</span></br><span style="color:#0099cc;">向导小助手</span>');
    });
    $('#next-page').mouseover(function(){
        showMessage('要翻到下一页吗?');
    });
    $('#index-links li a').mouseover(function () {
        showMessage('去 <span style="color:#0099cc;">' + $(this).text() + '</span> 逛逛');
    });
    $('.comments').mouseover(function () {
        showMessage('<span style="color:#0099cc;">' + visitor + '</span> 向评论栏出发吧！');
    });
    $('#submit').mouseover(function () {
        showMessage('确认提交了么？');
    });
    $('#s').mouseover(function () {
        showMessage('输入你想搜索的关键词再按Enter(回车)键就可以搜索啦!');
    });
    $('#go-prev').mouseover(function () {
        showMessage('点它可以后退哦！');
    });
    $('#go-next').mouseover(function () {
        showMessage('点它可以前进哦！');
    });
    $('#refresh').mouseover(function () {
        showMessage('点它可以重新载入此页哦！');
    });
    $('#go-home').mouseover(function () {
        showMessage('点它就可以回到首页啦！');
    });
    $('#addfav').mouseover(function () {
        showMessage('点它可以把此页加入书签哦！');
    });
    $('#nav-two a').mouseover(function () {
        showMessage('嘘，从这里可以进入控制面板的哦！');
    });
    $('.post-category a').mouseover(function () {
        showMessage('点击查看此分类下得所有文章');
    });
    $('.post-heat a').mouseover(function () {
        showMessage('点它可以直接跳到评论列表处.');
    });
    $('#tho-shareto span a').mouseover(function () {
        showMessage('你知道吗?点它可以分享本文到'+$(this).attr('title'));
    });
    $('#switch-to-wap').mouseover(function(){
        showMessage('点击可以切换到手机版博客版面');
    });
});


//无聊讲点什么
jQuery(document).ready(function ($) {

    window.setInterval(function () {
        msgs = ["半天不动是不会用还是用的飞起呀？~</br>右键可以关闭我哟"];
        var i = Math.floor(Math.random() * msgs.length);
        showMessage(msgs[i], 10000);
    }, 35000);
});

/***
//无聊动动
jQuery(document).ready(function ($) {
    window.setInterval(function () {
        msgs = ["播报明日天气<iframe name=\"xidie\" src=\"http://heartmoving.com/skin/2010-0601.html\"frameborder=\“0\” scrolling=\"no\" height=\"15px\"  width=\"130px\" allowtransparency=\"true\" ></iframe>", "快快订阅我的博客吧！<a href=\"http://heartmoving.com/\" target=\"_blank\" rel=\"external\" tip=\"Feed\"><img border=\"0\" title=\"订阅乱了感觉\" alt=\"Feed\" src=\"/wp-content/themes/chromeStyle/images/rss.png\"></a>", "乾坤大挪移！", "我飘过来了！~", "我飘过去了", "我得意地飘！~飘！~"];
        var i = Math.floor(Math.random() * msgs.length);
        s = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6,0.7,0.75,-0.1, -0.2, -0.3, -0.4, -0.5, -0.6,-0.7,-0.75];
        var i1 = Math.floor(Math.random() * s.length);
        var i2 = Math.floor(Math.random() * s.length);
            $(".spig").animate({
            left: document.body.offsetWidth/2*(1+s[i1]),
            top:  document.body.offsetHeight/2*(1+s[i1])
        },
			{
			    duration: 2000,
			    complete: showMessage(msgs[i])
			});
    }, 45000);
});
***/

var spig_top = 50;
//滚动条移动
jQuery(document).ready(function ($) {
    var f = $(".spig").offset().top;
    $(window).scroll(function () {
        $(".spig").animate({
            top: $(window).scrollTop() + f +300
        },
		{
		    queue: false,
		    duration: 1000
		});
    });
});

//鼠标点击时
jQuery(document).ready(function ($) {
    var stat_click = 0;
    $(".mumu").click(function () {
        if (!ismove) {
            stat_click++;
            if (stat_click > 4) {
                msgs = ["你有完没完呀？", "你已经摸我" + stat_click + "次了", "非礼呀！救命！OH，My ladygaga"];
                var i = Math.floor(Math.random() * msgs.length);
                //showMessage(msgs[i]);
            } else {
                msgs = ["筋斗云！~我飞！", "我跑呀跑呀跑！~~", "别摸我，大男人，有什么好摸的！", "惹不起你，我还躲不起你么？", "不要摸我了，我会告诉老婆来打你的！", "干嘛动我呀！小心我咬你！"];
                var i = Math.floor(Math.random() * msgs.length);
                //showMessage(msgs[i]);
            }
        s = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6,0.7,0.75,-0.1, -0.2, -0.3, -0.4, -0.5, -0.6,-0.7,-0.75];
        var i1 = Math.floor(Math.random() * s.length);
        var i2 = Math.floor(Math.random() * s.length);
            $(".spig").animate({
            left: document.body.offsetWidth/2*(1+s[i1]),
            top:  document.body.offsetHeight/2*(1+s[i1])
            },
			{
			    duration: 500,
			    complete: showMessage(msgs[i])
			});
        } else {
            ismove = false;
        }
    });
});
//显示消息函数 
function showMessage(a, b) {
    if (b == null) b = 10000;
    jQuery("#message").hide().stop();
    jQuery("#message").html(a);
    jQuery("#message").fadeIn();
    jQuery("#message").fadeTo("1", 1);
    jQuery("#message").fadeOut(b);
};

function closeMessage(){
    jQuery("#message").css("display","none");
}

function close_spig(){
    $("#spig").css("display","none");
}

function show_spig(){
    $("#spig").css("display","block");
}


//拖动
var _move = false;
var ismove = false; //移动标记
var _x, _y; //鼠标离控件左上角的相对位置
jQuery(document).ready(function ($) {
    $("#spig").mousedown(function (e) {
        _move = true;
        _x = e.pageX - parseInt($("#spig").css("left"));
        _y = e.pageY - parseInt($("#spig").css("top"));
     });
    $(document).mousemove(function (e) {
        if (_move) {
            var x = e.pageX - _x; 
            var y = e.pageY - _y;
            var wx = $(window).width() - $('#spig').width();
            var dy = $(document).height() - $('#spig').height();
            if(x >= 0 && x <= wx && y > 0 && y <= dy) {
                $("#spig").css({
                    top: y,
                    left: x
                }); //控件新位置
            ismove = true;
            }
        }
    }).mouseup(function () {
        _move = false;
    });
});
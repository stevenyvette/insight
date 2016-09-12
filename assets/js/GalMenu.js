; (function($) {
    var GalMenu = {
        defaults: {
            click_to_close: true,
            stay_open: false
        },
        init: function(options) {
            var o = options,
            $this = $(this);
            $this.each(function(i) {
                var $this = $(this),
                settings = $.extend({},
                GalMenu.defaults, o),
                $menu = $('.' + settings.menu);
                var options={
								photo: "images/avtar.png", //图片路径
								name: 'fsr',                 //姓名
								sex: '男',                //性别
								love: '女',               //爱好
								remark: "模仿中"
							}
                $('body').prepend("<div id='user' class='user' style='display:none;z-index:1000;-webkit-box-sizing: none;box-sizing: none;'><span></span><div class='out'><div class='ins'><a href='#' title='查看资料'><img src='" + options.photo + "' alt='' /></a><div>名称：" + options.name + "<br />性别：" + options.sex + "<br />爱好：" + options.love + "<br />介绍：" + options.remark + "<br /><a href='#' class='btn btn-success btn-small' title='加关注'>+加关注</a>&nbsp;&nbsp;<a href='#' class='btn btn-success btn-small' title='加好友'>+加好友</a></div></div></div></div>");
	            var $btip = $("#user");
                $this.on('click',
	                function(e) {
	                    if (e.which !== 3 && $(e.target).parents('.GalMenu').length < 1 && settings.click_to_close&&click==undefined) {
	                        $this.find('.GalMenu').stop(true, false).animate({
	                            opacity: 0
	                        },
	                        {
	                            duration: 100,
	                            queue: false,
	                            complete: function() {
	                                $(this).css('display', 'none').find('.active').removeClass('active').next().stop(true, true).slideUp('normal')
	                            }
	                        });
	                        $(".circle").removeClass("open");
	                        $("#overlay").hide();
	                        setTimeout(function(){$("#option").hide();},100);
	                        $btip.hide();
	//                      $("#option").css('display','none');
	                    }else if(click!=undefined){
	                    	GalMenu.getCoords(e);
	                    	var add = 150;
	                    	var top = Coords.clickY-225;
	                    	console.log(top);
	                    	left = (Coords.clickX+290>$(window).width()) ? Coords.clickX-250: Coords.clientX-20;
	                    	$btip.find("span").addClass('bl');
	                    	$btip.css('display','block');
			                $btip.css({
			                    top: top + 'px',
	                        	left: left + 'px',
			                }).show();
			                click=undefined;
	                   };
	                   $btip.off().on('mouseover', function () {
					            $btip.show();
					        }).on('mouseout', function () {
					            $btip.hide();
					        });
                });
                
                $this.on('contextmenu',
                	function(e) {
                		console.log(trans);
                		$btip.hide();
	                    e.preventDefault();
	                    e.stopPropagation();
	                    GalMenu.getCoords(e);
	                    $('.GalMenu_close_me').stop(true, false).animate({
	                        opacity: 0
	                    },
	                    {
	                        duration: 100,
	                        queue: false,
	                        complete: function() {
	                            $(this).css('display', 'none')
	                        }
	                    });
	                    var add = 150;
	                    var top = Coords.clientY - add,
	                    left = ($('body')[0] === e.target) ? Coords.clickX + add: Coords.clientX - add;
	                    $menu.css({
	                        top: top + 'px',
	                        left: left + 'px',
	                        display: 'block'
	                    }).stop(true, false).animate({
	                        opacity: 1
	                    },
	                    {
	                        duration: 100,
	                        queue: false
	                    });
	                    if ($("#gal").hasClass("open")) {
	                        $(".circle").removeClass("open");
	                        $("#overlay").hide();
	                        setTimeout(function(){$("#option").hide();},100);
	                    } else {
	                        $(".circle").addClass("open");
	                        $("#overlay").show();
	                    }
	                })		
            })
        },
        getCoords: function(e) {
            var evt = e ? e: window.event;
            var clickX = 0,
            clickY = 0;
            if ((evt.clientX || evt.clientY) && document.body && document.body.scrollLeft != null) {
                clickX = evt.clientX + document.body.scrollLeft;
                clickY = evt.clientY + document.body.scrollTop
            };
            if ((evt.clientX || evt.clientY) && document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.scrollLeft != null) {
                clickX = evt.clientX + document.documentElement.scrollLeft;
                clickY = evt.clientY + document.documentElement.scrollTop
            };
            if (evt.pageX || evt.pageY) {
                clickX = evt.pageX;
                clickY = evt.pageY
            };
            Coords = {
                clickX: clickX,
                clickY: clickY,
                clientX: evt.clientX,
                clientY: evt.clientY,
                screenX: evt.screenX,
                screenY: evt.screenY
            }
            return Coords;
        }
    };
    $.fn.GalMenu = function(method, options) {
        if (GalMenu[method]) {
            return GalMenu[method].apply(this, Array.prototype.slice.call(arguments, 1))
        } else if (typeof method === 'object' || !method) {
            return GalMenu.init.apply(this, arguments)
        } else {
            $.error('Method ' + method + ' does not exist')
        }
    }
})(jQuery);
String.prototype.removeWS = function() {
    return this.toString().replace(/\s/g, '')
};
String.prototype.pF = function() {
    return parseFloat(this)
};
Number.prototype.pF = function() {
    return parseFloat(this)
};

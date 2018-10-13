//首页广告轮播
function index_Swipe(){
	 new Swipe(document.getElementById('index-slidebox'), {
         speed: 500,
         auto: 3000,
         callback: function(){
             var lis = $(this.element).next("ol").children();
             lis.removeClass("on").eq(this.index).addClass("on");
         }
     });
}

//商品详情-产品图轮播
$(function(){
        new Swipe(document.getElementById('detail-banner'), {
            speed: 500,
            auto: 3000,
            callback: function(){
                var lis = $(this.element).next("ol").children();
                lis.removeClass("on").eq(this.index).addClass("on");
            }
        });
    });

//商品详情-商品介绍菜单切换
jQuery(function($){
        $('.detail-goodsbox ul li').click(function(){
            var index = $('.detail-goodsbox ul li').index(this);
            $(this).addClass('current').siblings('li').removeClass('current');
            $('.detail-goodsbox .goods-text:eq('+index+')').show().siblings('.goods-text').hide();
        })
    })

//日期选择弹出框
function topopupTime(){
		$("#time-pop").addClass("am-modal-active");	
		if($(".popupbg").length>0){
			$(".popupbg").addClass("popupbg-active");
		}else{
			$("body").append('<div class="popupbg"></div>');
			$(".popupbg").addClass("popupbg-active");
		}
		$(".popupbg-active,.am-popup-close").click(function(){
			$("#time-pop").removeClass("am-modal-active");	
			setTimeout(function(){
				$(".popupbg-active").removeClass("popupbg-active");	
				$(".popupbg").remove();	
			},300);
		})
	}	
//图书馆选择弹出框	
function topopupLib(){
	$("#lib-pop").addClass("am-modal-active");	
	if($(".popupbg").length>0){
		$(".popupbg").addClass("popupbg-active");
	}else{
		$("body").append('<div class="popupbg"></div>');
		$(".popupbg").addClass("popupbg-active");
	}
	$(".popupbg-active,.am-popup-close").click(function(){
		$("#lib-pop").removeClass("am-modal-active");	
		setTimeout(function(){
			$(".popupbg-active").removeClass("popupbg-active");	
			$(".popupbg").remove();	
		},300);
	})
}

//商品详情-底部立即购买弹出框-规格切换	
$(function(){
        $(".am-spec-select ul li").click(function(){
            $(this).addClass("click").siblings().removeClass("click");
        })
    })
	
//商品详情-底部立即购买弹出框-数量加减
$(function(){
        //$("#a").Spinner({value:1, min:0, len:3, max:10000});
    });	
	
//商品详情-税费弹窗
jQuery(document).ready(function($){
	//open popup
	$('.contact').on('click', function(event){
		event.preventDefault();
		$('.cd-popup').addClass('is-visible');
	});
	
	//close popup
	$('.cd-popup').on('click', function(event){
		if( $(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
	//close popup when clicking the esc keyboard button
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.cd-popup').removeClass('is-visible');
	    }
    });
});
	
//订单-选择收货地址-单选
$(".address_checkbox").click(function(){
	$(this).parent().find(".address_checkbox").removeClass("address_checkboxa");
	$(this).addClass("address_checkboxa");
});

//订单列表-分类切换
jQuery(function($){
        $('.order-listbox ul li').click(function(){
            var index = $('.order-listbox ul li').index(this);
            $(this).addClass('current').siblings('li').removeClass('current');
            $('.order-listbox .order-text:eq('+index+')').show().siblings('.order-text').hide();
        })
    })
	
//购物车-单选
$(".shopcart_checkbox").click(function(){
	$(this).parent().find(".shopcart_checkbox").removeClass("shopcart_checkboxa");
	$(this).addClass("shopcart_checkboxa");
});

//新用户注册-勾选
$(".login_checkbox").click(function(){
	$(this).parent().find(".login_checkbox").removeClass("login_checkboxa");
	$(this).addClass("login_checkboxa");
});
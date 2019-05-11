(function() {
    var jq=jQuery.noConflict();
	jq.extend({
		myAlert: function(options) {//参数格式{title:'Title',message:'message',callback:function(){alert('callback')}}or"需要提示的话"
			var option={title:"提示",message:"程序员太傻，忘记输入提示内容啦……",callback:function(){}}
			if(typeof(options)=="string"){
				option.message=options
			}else{
				option=jq.extend(option,options);
			}
			var top=jq(window).height()*0.3;
			jq('body').append('<div class="myModa"><div class="myAlertBox"  style="margin-top:'+top+'px"><h6>'+option.title+'</h6><p>'+option.message+'</p><div class="btn sure">确定</div></div></div>');
			jq('.btn.sure').click(function(){
				jq('.myModa').remove();
				option.callback();
			})
		},
		myConfirm: function(options) {//参数格式{title:'Title',message:'message',callback:function(){alert('callback')}}or"需要提示的话"jq.myConfrim()
			var option={title:"提示",message:"程序员太傻，忘记输入提示内容啦……",callback:function(){}}
			if(typeof(options)=="string"){
				option.message=options
			}else{
				option=jq.extend(option,options);
			}
			var top=jq(window).height()*0.3;
			jq('body').append('<div class="myModa"><div class="myAlertBox" style="margin-top:'+top+'px"><h6>'+option.title+'</h6><p>'+option.message+'</p><div class="col2"><div class="col" style="margin-right: 20px;"></div><div class="col"><div class="btn sure">确定</div></div></div></div></div>');
			jq('.btn.exit').click(function(){
				jq('.myModa').remove();
			})
			jq('.btn.sure').click(function(){
				jq('.myModa').remove();
				option.callback();
			})
		},
        myConfirm1: function(options) {//参数格式{title:'Title',message:'message',callback:function(){alert('callback')}}or"需要提示的话"jq.myConfrim()
            var option={title:"提示",message:"程序员太傻，忘记输入提示内容啦……",callback:function(){}}
            if(typeof(options)=="string"){
                option.message=options
            }else{
                option=jq.extend(option,options);
            }
            var top=jq(window).height()*0.3;
            jq('body').append('<div class="myModa"><div class="myAlertBox" style="margin-top:'+top+'px"><h6>'+option.title+'</h6><p>'+option.message+'</p><div class="col2"><div class="col" style="margin-right: 20px;"><div class="btn exit">取消</div></div><div class="col"><div class="btn sure">确定</div></div></div></div></div>');
            jq('.btn.exit').click(function(){
                jq('.myModa').remove();
            })
            jq('.btn.sure').click(function(){
                jq('.myModa').remove();
                option.callback();
            })
        },
		myToast:function(message){
			var top=jq(window).height()*0.3;
			jq('body').append('<div class="myToast">'+message+'</div>');
			console.log(jq('.myToast').outerWidth())
			var top=(jq(window).height()-jq('.myToast').height())/2;
			var left=(jq('body').width()-jq('.myToast').width())/2;
			jq('.myToast').css({'top':top+'px','left':left+'px'});
			setTimeout(function(){
				jq('.myToast').fadeOut(300);
				setTimeout(function(){
					jq('.myToast').remove();
				},300)
			},1000)
		}
	});
})(jQuery)


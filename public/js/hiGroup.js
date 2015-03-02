// JavaScript Document



$(function() {
	
	//LeanCloud初始化
	AV.$ = jQuery;
	AV.initialize(appId, appKey);
    
	
var LogInView = AV.View.extend({
    events: {
      "submit form.login-form": "logIn"
      //"submit form.signup-form": "signUp"
    },
        
    el: "#content",
    
    initialize: function() {
      _.bindAll(this, "logIn");
      this.render();
    },

    logIn: function(e) {
      var self = this;
      var username = this.$("#login-username").val();
      var password = this.$("#login-password").val();

      // 登录
      AV.User.logIn(username, password, {
        success: function(user) {
          mv.control.runPage(mv.page.submitActivity);
          self.undelegateEvents();
          delete self;
        },

        error: function(user, error) {
          self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
          self.$(".login-form button").removeAttr("disabled");
        }
      });

      this.$(".login-form button").attr("disabled", "disabled");

      return false;
    },

    render: function() {
      this.$el.html(_.template($("#template-LogIn").html()));
      this.delegateEvents();
    }
  });
	
var SignUpView = AV.View.extend({
    events: {
      "submit form.signup-form": "signUp"
    },

    el: "#content",
    
    initialize: function() {
      _.bindAll(this,  "signUp");
      this.render();
    },

    signUp: function(e) {
      var self = this;
      var username = this.$("#signup-username").val();
      var password = this.$("#signup-password").val();

      // 注册
      AV.User.signUp(username, password, { ACL: new AV.ACL() }, {
        success: function(user) {
          mv.control.runPage(mv.page.submitActivity);
          self.undelegateEvents();
          delete self;
        },

        error: function(user, error) {
          self.$(".signup-form .error").html(error.message).show();
          self.$(".signup-form button").removeAttr("disabled");
        }
      });

      this.$(".signup-form button").attr("disabled", "disabled");

      return false;
    },

    render: function() {
      this.$el.html(_.template($("#template-SignIn").html()));
      this.delegateEvents();
    }
  });
    
    
    
	/***********************我的namespace*************************/
	
	var mv={};//命名空间

mv.tools={//工具
};

mv.content={
};

mv.method={
	
};

mv.control={
};

mv.object={//对象
};

mv.object.user={//用户信息
default:{
	username:"zhouyu",
	password:"123456"
},

PayWay:{
	aa:true,
	whoPay:""
}
}


mv.page={
	login: {
		template:_.template($("#template-LogIn").html()),
		init:function(){},
		update:update_logPage,
	
	},
	
	
		signIn: {
		template:_.template($("#template-SignIn").html()),
		init:function(){},
		update:update_signPage,
	
	},
	
	submitActivity:{
		template:_.template($("#template-page_submit_activity").html()),
		init:init_SubmitActivity,
		update:update_SubmitActivity,
	},
	
	previewActivity:{
		template:_.template($("#template-page_preview_activity").html()),
		init:function(){},
		update:update_previewActivity,
	},
	
};


//活动属性
mv.content.activity={
activityName:"聚会",
activityPlace:"北京",
activityTime:"2015-3-1",
activityDescription:"同学聚会",
PayWay:{
	 aa:false,
	 whoPay:"zhouyu"
	}
}

mv.control.runPage=function(oPage){
	//加载页面
	$("#content").html(oPage.template);
	oPage.init();
	//更新页面
	oPage.update();
	
	}

function update_logPage(){//更新登陆页面
  //获取对象
  var oBtn=$("#btn_log");//点击登陆按钮
  var oASign=$(".goSignIn");//进入注册界面按钮
  var oUserName = $("#login .input_user");
  var oUserPassword = $("#login .input_password");
  oASign.click(function(){//点击进入注册界面按钮
  
    mv.control.runPage(mv.page.signIn);
  
  });
  oBtn.click(function(){//点击登陆按钮后
  
	  if(oUserName.val()&&oUserPassword.val())
		 {
			 mv.object.user.name=oUserName.val();
			mv.control.runPage(mv.page.submitActivity);
		}
		 else{
			 alert("用户名或密码空！");
		}
	 
	 
  
  });
}

function update_signPage(){//更新注册页面
  
   //获取对象
  var oBtn=$("#btn_signIn");
  var oALog=$(".goLogIn");
   var oUserName = $("#signIn .input_user");
  var oUserPassword = $("#signIn .input_password");
  oALog.click(function(){//点击登陆按钮
  

    	mv.control.runPage(mv.page.login);
  
  });
  oBtn.click(function(){//点击注册按钮后
  
	  if(oUserName.val()&&oUserPassword.val())
		 {
			 mv.object.user.name=oUserName.val();
			mv.control.runPage(mv.page.submitActivity);
		}
		 else{
			 alert("用户名或密码空！");
		}
 
  
  });
  

}

function update_SubmitActivity(){//更新发布活动页面


	//获取对象
	var oActivityName = $("#activityName");
	var oActivityPlace = $("#activityPlace");
	var oActivityTime = $("#activityTime");
	var oActivityDescription = $("#activityDescription");
	var oAAPay=$("#payAA");
	var oWhoPay=$("#whoPay");
    var oUserName = $("#ul_user");	
	
	var self = $(document);
	

	
	if(mv.object.user.name)
	oUserName.html(mv.object.user.name);
	
	
	//点击日历
	var oCalendar = $("#i_calendar");
	oCalendar.mousedown(function(){
	 oCalendar.addClass("pressDown");
	});
	oCalendar.mouseup(function(){
		oCalendar.removeClass("pressDown");
		});
	
	oCalendar.click(function(){
	 alert("你点击了时间选择！");
	});
	
	$("#ul_user").click(function(){
		alert("你点击了用户");
	});
	
	//属性改变后更新
	$(document).change(function(){
	mv.object.user.activityName=oActivityName.val();
	mv.object.user.activityPlace=oActivityPlace.val();
	mv.object.user.activityTime=oActivityTime.val();
	mv.object.user.activityDescription=oActivityDescription.val();
	
	
	
	var iPayWay = $("input[name='PayWay']:checked").val();
	if(iPayWay==1){
		mv.object.user.PayWay={aa:true,whoPay:""};
	}
	else{
		
		mv.object.user.PayWay={aa:false,whoPay:oWhoPay.val()};
	
	}
	//alert("abc");
	
	//alert("1:"+JSON.stringify(mv.object.user.PayWay));
	
	});
	
	
	
	//点击返回菜单界面
	$(".onbackToMenu").click(function(){
	
	  mv.control.runPage(mv.page.login);
	
	});
	
	//点击 确认 按钮，提交数据
	$("#btn_previewActivity").click(function(){

       
		//alert(JSON.stringify(mv.content.activity));
		//alert("提交成功！");
		//alert(JSON.stringify(mv.object.user.PayWay));
		mv.control.runPage(mv.page.previewActivity);
		
	});
	
}
	
	
	function init_SubmitActivity(){//初始化发布活动页面


	//获取对象
	var oActivityName = $("#activityName");
	var oActivityPlace = $("#activityPlace");
	var oActivityTime = $("#activityTime");
	var oActivityDescription = $("#activityDescription");
	var oPayWay = $("input[name='PayWay']");
	var oWhoPay=$("#whoPay");
    var oUserName = $("#ul_user");	
	
	var self = $(document);
	
	if(mv.object.user.name)
	oUserName.html(mv.object.user.name);
	
	//初始化值

	oActivityName.val(mv.object.user.activityName);
	oActivityPlace.val(mv.object.user.activityPlace);
	oActivityTime.val(mv.object.user.activityTime);
	oActivityDescription.val(mv.object.user.activityDescription);
	
	
	//alert("2:"+JSON.stringify(mv.object.user.PayWay));
	
	if(mv.object.user.PayWay.aa==true){
		
      oPayWay.eq(0).attr("checked","checked");
	  oPayWay.eq(1).removeAttr("checked");
	  oWhoPay.val("");
	}
	else{
		
      oPayWay.eq(1).attr("checked","checked");
	  oPayWay.eq(0).removeAttr("checked");
		 oWhoPay.val(mv.object.user.PayWay.whoPay);
	}
	
	oUserName.val("zhouyu");
	//alert("he");
	
}
	
	
	
	/*更新活动发布预览页面*/
	
	function update_previewActivity(){
	
	  var aSpans = $("#div_preview_activity .div_activity_content span");
	  var oActivityName=aSpans[0];
	  var oActivityUserName=aSpans[1];
	  var oActivityTime=aSpans[2];
	  var oActivityPlace=aSpans[3];
	  var oActivityWhoPay=aSpans[4];
	  var oActivityDescription = $("#div_preview_activity .div_activity_content div")[0];
	  
	  $(oActivityName).html(mv.object.user.activityName);
	  $(oActivityTime).html(mv.object.user.activityTime);
	  $(oActivityUserName).html(mv.object.user.name);
	  $(oActivityPlace).html(mv.object.user.activityPlace);
	  
	  //alert(JSON.stringify(mv.object.user.PayWay));
	  
	  var sPay="";
	  if(mv.object.user.PayWay.aa){
		  sPay="[AA制]";
	  }
	  else{
		  sPay="["+mv.object.user.PayWay.whoPay+"]"+"请客";
	  }
	
	
	  $(oActivityWhoPay).html(sPay);
	  
	  $(oActivityDescription).html(mv.object.user.activityDescription);
	  
	  
	
	 $("#btn_cancelActivity").click(function(){//点击取消发布
	 
	     mv.control.runPage(mv.page.submitActivity);
	 
	 });
	
	
	 $("#btn_okActivity").click(function(){//点击确认发布
	  
	    alert("发布成功！");
	  
	 });
	
	}
	
	
	
	/**************************************************************/
	
	
	//加载首页页面
	
	//加载执行登陆页面
	mv.control.runPage(mv.page.login);
	new LogInView();
    new SignUpView();
	//AV.history.start();
	//mv.control.runPage(mv.page.login);
	
	//mv.control.runPage(mv.page.previewActivity);
	
	//mv.control.runPage(mv.page.submitActivity);
	
	//$("#content").html(_.template($("#login").html()));
	
	/*
	 logIn: function(e) {
      var self = this;
      var username = this.$("#login-username").val();
      var password = this.$("#login-password").val();
       

      // 登录
      AV.User.logIn(username, password, {
        success: function(user) {
          new ManageTodosView();
          self.undelegateEvents();
          delete self;
        },

        error: function(user, error) {
          self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
          self.$(".login-form button").removeAttr("disabled");
        }
      });

      this.$(".login-form button").attr("disabled", "disabled");

      return false;
    },

    signUp: function(e) {
      var self = this;
      var username = this.$("#signup-username").val();
      var password = this.$("#signup-password").val();

      // 注册
      AV.User.signUp(username, password, { ACL: new AV.ACL() }, {
        success: function(user) {
          new ManageTodosView();
          self.undelegateEvents();
          delete self;
        },

        error: function(user, error) {
          self.$(".signup-form .error").html(error.message).show();
          self.$(".signup-form button").removeAttr("disabled");
        }
      });

      this.$(".signup-form button").attr("disabled", "disabled");

      return false;
	
	*/
	
});


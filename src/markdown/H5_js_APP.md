## 人教点读与app端的js交互文档

#### 以下为web端调用APP端的一些消息类型和内容
> baseURL= 'https://dianducs.mypep.cn/h5'
---
* 1、	登录   /loginpage
> 方法名： Loginstatus(obj);
```
{
	command: "loginstatus",
    access_token: "Bp9xRvSzZbwehTvfb7f1PvloXC7LWqX2trBzkOiIwlxI+5iLrt13mw73qRxHnrEnguBTHt1TVVrk4tNHL17r0w==",
	active_time: 1534615200000,
	age: "6",
	eng_ver: "精通",
	grade: "六年级",
	head_image: "",
	mobile: "13261789102",
	name: "",
	nickname: "高维宝666",
	points: "100",
	reg_name: "RJTMP6222439",
	sex: "1",
	status: "login",
	user_id: "100007"
}
```

* 2、退出登录   /user
> 方法名： Loginstatus(obj);
```
{
	command: "loginstatus",
	status: "logout"
}
```


* 3、登录成功之后   /loginpage
> 方法名：closeview()
```
{
	command: "closeview"
}
```

* 4、	保存用户信息    /userinfo
> 方法名：userconfig()
```
{
    command: "user_config"
    access_token: "Bp9xRvSzZbwehTvfb7f1PvloXC7LWqX2trBzkOiIwlxI+5iLrt13mw73qRxHnrEnguBTHt1TVVrk4tNHL17r0w=="
    active_time: 111111111
    age: 16
    eng_ver: "PEP"
    grade: "五年级"
    head_image: ""
    mobile: "13261789102"
    name: ""
    nickname: "高维宝66666"
    points: "100"
    reg_name: "RJTMP6222439"
    sex: 2
    status: "login"
    user_id: "100007"
}
```

* 5、系统设置    /user

系统设置里面的一些相关页面地址： 
/responsible  免责声明 
/protocol    用户协议 
/about   关于 
> 方法名：systemSetting()
```
{
	command: "context",
    operation:"setting"
}
```

* 6、	Ios内购     /oconfirm_combo 和
 /my_order_all/unpaid
> 方法名：iapPay()
```
{
	command: "iappay"
    paydata:{
    	out_trade_no：1111111, //orderid
        product_id："IAP_tape1a_002001"  //bookid
    }
}
```

* 7、移除设备    /dev_manage
> 方法名：removeDevice()
```
{
    "command":"remove_device",
    "dev_id":"1111"
}
```
* 8、第三方支付    /payit/15311863402851001
> 方法名：thirdPay()
```
{
	command: "alipay",    //alipay 支付宝  wxpayReq 微信
    order_info: Object
}
```

* 9、第三方支付成功    /payit/15311863402851001
> 方法名：PaySuccess()
```
{
	command: " paysuccess " 
}
```
* 10、央视播音音频     /read
> 方法名：PlayCCTVAudio()
```
{
    "command":"CCTV_audio",
    "title":"秋天",
    "MP3":https://rjddres.mypep.cn/res_promotion/01.mp3
}
```
* 11、中小学语文诗词吟诵     /poetry
> 方法名：PlayPoetryAudio()
```
{
    "command":" Poetry_audio",
    "title":"咏鹅",
    "MP3": "http://rjdduploadw.mypep.cn/poetry/1.mp3" 
}
```
* 12、邀请好友赢福利--点击发福利   / invite
> 方法名：Welfare()
```
{
	'command': "welfare"
}
```
* 13、H5练习页中点击“教材”跳转到app的底部“点读”
> 方法名：jiaocai ()
```
{
	'command': "jiaocai"
}
```
* 14、H5练习页中点击“教辅”跳转到app中相应页面
> 方法名：jiaofu ()
```
{
	'command': "jiaofu"
}
```
* 15、学豆充值
- - /oconfirm_combo/1211001302031-180-0/1/1211001302031-180-0/101
- - /user 为入口
> 方法名：RechargeXD()
```
{
    "command":"recharge" 
}
```

* 16、提交新反馈  /Feedback
> 方法名：newFeedback()
```
{
    'command': "newFeedback",
}
```
* 17、用户反馈—上传图片  / FeedbackComment
> 方法名：uploadFeedback()
```
{
	"command"	: 	"uploadFeedback"
}
```
* 18、购买书金额为0，需要更新教材购买状态  
- - /oconfirm_combo/1211001102161-180-0/1/1211001102161-180-0/102
- - /payit/15331175755671035
- - /my_order_all/unpaid
> 方法名：UpdateTextbook()
```
{
	"command"	: 	" update_textbook ",
	“orderId”:orderid
}
```
* 19、微信登录   / bindphone
> 方法名：weChatLogin()
```
{
	"command"	: 	" weChat_login "
}
```
* 20、微信登录成功之后关闭h5页面   / bindphone
> 方法名：CloseWechat()
```
{
	"command"	: 	" close_wechat_view "
}
```
* 21、我的积分交互  /my_points
> 方法名： Integral()
```
{
    'command' : "integral",
}
```
* 22、知识讲解  /math_course/{jf1221001502141020000}
> 方法名：knowledges(id)
```
{
    "command":"knowledges",
    "id": id
}
```

* 23、方法技巧  /method_skill/{1221001502141020000_2}
> 方法名：techniques()
```
{
    "command":"knowledges",
    "url":"/method_skill/1221001102121010000_2"
}
```

* 24、完成关闭  /method_skill/{1221001502141020000_2}
> 方法名： finishOff()
```
{
    'command' : "finishOff",
}
```


---

#### 以下为APP端调用web端的一些消息类型和内容

* 1、上传头像    /userinfo
```
{
	command: "imgUploadFinshed",
    ossurl: "https://rjddresw.mypep.cn/tina/static/uc_boy.png"
}
```
* 2、获取设备信息    / loginpage
```
{
	command: "device"
    dev_name:“iphone”
    dev_id:“123456” 
}
```
* 3、支付完成回传h5页面数据
- - /oconfirm_combo
- - /my_order_all/unpaid
- - /odetail/15272387821111125
```
{
		command: "iappay_result"
        payType = PRPayTypeIAP 苹果
        return_code    //0成功  1 失败  -1取消
        errstr
}
```
* 4、充值结束回调
- - /oconfirm_combo/1211001302031-180-0/1/1211001302031-180-0/101
- - /user 为入口文件
```
{
	command: "recharge_amount"
}
```
> 注意：商品详情（购买教材的时候）
 bookid以及设备类型，需要app端传过来需要app端拼链接：
 /detail/{orderId}/{device_type}
参数说明：device_type: android 101   ios 102
orderId:订单id

* 5、用户提交新反馈带ua相关信息到下一个页面和用户回复    
/ Feedback和 /FeedbackDetail
```
{
    "command":"feedback_message",
    "positiopn":"北京",
    "positiopn_data":"北京",
    "dev_name":"iphone6",
    "ua_data":"北京"
}
```
* 6、用户反馈—上传图片  / FeedbackComment
```
{
	"command":" feedbackUploadFinshed"
}
```

* 7、激活码兑换成功后通知app端  /acticode_exchange
```
{
    "command":" exchangeSucceed"
}
```

* 8、微信登录  /bindphone
```
{
    "command":" thirdPartyLogin",
    "type":"WinXin",
    "open_id": "open_id",
    "unionid": "unionid",
    "headimgurl":"image",
    "nickname":"zock"
}
```

* 9、个人中心改造页面 '推荐给好友' 的交互定义   /user 
```
{
	"command":" recommendedToFriends"
}
```

* 10、通知app端下拉刷新(页面加载完成自动调用)
```
{
    "command" : "menucontrol",
    "menu_action" : [
        {
        "name" : "刷新",
        "id" : 10010,
        "action" : "show"
        }
    ]
}
```
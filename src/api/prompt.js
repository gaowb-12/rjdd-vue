
 /**
  * h5传值给移动端
  */
// 上传头像
function UploadHeader(data){
    const param = {
        "command"	: 	"uploadHeader",
        "width":"90",
        "height":"90"
    }
    return prompt(JSON.stringify(param))
}

// 登录状态
function Loginstatus(data){
    const param = {
        "command"	: 	"loginstatus"
    }
    Object.assign(param,data)
    return prompt(JSON.stringify(param))
}

// 登录成功之后关闭h5页面
function Closeview(data){
    const param = {
        "command"	: 	"closeview"
    }
    return prompt(JSON.stringify(param))
}
// 微信登录成功之后关闭h5页面
function CloseWechat(data){
    const param = {
        "command"	: 	"close_wechat_view"
    }
    return prompt(JSON.stringify(param))
}

// 保存用户信息
function userConfig(data){
    const param = {
        "command"	: 	"user_config"
    }
    Object.assign(param,data)
    return prompt(JSON.stringify(param))
}

// 系统设置
function systemSetting(data){
    const param = {
        "command" : "context",
        "operation" : "setting"
    }
    return prompt(JSON.stringify(param))
}

// ios内购
function iapPay(data){
    const param = {
        'command' : 'iappay',
        'paydata' : data
    }
    return prompt(JSON.stringify(param))
}

// 第三方支付
function thirdPay(type,data){
    const param = {
        'command' : type, //阿里 alipay  微信 wxpayReq
    }
    Object.assign(param,data)
    return prompt(JSON.stringify(param))
}

// 第三方支付成功
function PaySuccess(data){
    const param = {
        'command' : 'paysuccess'
    }
    Object.assign(param,data)
    return prompt(JSON.stringify(param))
}

// 支付金额为0时，需与移动端同步教材更新
function UpdateTextbook(data){
    const param = {
        'command' : 'payBookSucc'
    }
    Object.assign(param,data)
    return prompt(JSON.stringify(param))
}

// 移除设备同步
function removeDevice(data){
    const param = {
        'command' : "remove_device", 
    }
    Object.assign(param,data)
    return prompt(JSON.stringify(param))
}

// 央视播音音频
function PlayCCTVAudio(data){
    const param = {
        'command' : "CCTV_audio",
    }
    Object.assign(param,data)
    return prompt(JSON.stringify(param))
}

// 中小学语文诗词吟诵
function PlayPoetryAudio(data){
    const param = {
        'command' : "Poetry_audio",
    }
    Object.assign(param,data)
    return prompt(JSON.stringify(param))
}

// 学豆充值
function RechargeXD(){
    const param = {
        'command' : "recharge",
    }
    return prompt(JSON.stringify(param))
}

// 我的积分
function Integral(){
    const param = {
        'command' : "integral",
    }
    return prompt(JSON.stringify(param))
}

// 邀请好友赢福利--点击发福利
function Welfare() {
    const param = {
        'command': "welfare",
    }
    return prompt(JSON.stringify(param))
}


// 提交新反馈
function newFeedback() {
    const param = {
        'command': "newFeedback",
    }
    return prompt(JSON.stringify(param))
}

// 提交新反馈把位置，手机设备，ua和position_data带到下一个页面
function feedbackMessage(data){
    const param = {
        'command' : "feedback_message",
    }
    Object.assign(param,data)
    return prompt(JSON.stringify(param))
}

// 用户反馈--上传图片
function uploadFeedback(data){
    const param = {
        "command"	: 	"uploadFeedback",
    }
    return prompt(JSON.stringify(param))
}

// 激活码兑换成功后通知app端
function exchangeSucceed(data){
    const param = {
        "command"	: 	"exchangeSucceed",
    }
    return prompt(JSON.stringify(param))
}

// 判断用户登录后有已购买的音频书籍通知app
function backViewController(data){
    const param = {
        "command"	: 	"backViewController",
    }
    return prompt(JSON.stringify(param))
}

// 微信登录
function weChatLogin(){
    const param = {
        "command"	: 	"weChat_login",
    }
    return prompt(JSON.stringify(param))
}

// 推荐给好友
function recommendedToFriends(){
    const param = {
        'command' : "recommendedToFriends",
    }
    return prompt(JSON.stringify(param))
}

// 知识讲解
function math_class(type,id){
    const param = {
        'command' : "math_class",
        'type': type,
        'id': id
    }
    return prompt(JSON.stringify(param))
}

// 方法技巧
function techniques(url, id){
    const param = {
        'command' : "techniques",
        'url': url,
        'id': id
    }
    return prompt(JSON.stringify(param))
}

// 完成（关闭当前页）
function finishOff(url, id){
    const param = {
        'command' : "closeview",
    }
    return prompt(JSON.stringify(param))
}

export{
    UploadHeader,
    Loginstatus,
    Closeview,
    CloseWechat,
    userConfig,
    systemSetting,
    iapPay,
    thirdPay,
    PaySuccess,
    removeDevice,
    RechargeXD,
    PlayCCTVAudio,
    PlayPoetryAudio,
    Welfare,
    newFeedback,
    uploadFeedback,
    UpdateTextbook,
    feedbackMessage,
    exchangeSucceed,
    backViewController,
    weChatLogin,
    recommendedToFriends,
    Integral,
    knowledges,
    techniques,
    finishOff,
    math_class
}
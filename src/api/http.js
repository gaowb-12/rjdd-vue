import qs from "qs"
import axios from "axios"

// 用户登录的平台秘钥（获取用户信息携带）
// window.platform_key="c1860a61705f36538055c0955c3270aa";
window.platform_key="pep_click";
const url="/static/res.json"
const version = "3.5";  // 静态文件版本号控制

// 注册
async function Reg(data) {
    const res = await axios.post("user/reg.anys", qs.stringify(data));
    return res.data;
}

// 登录
async function Login(data) {
    const res = await axios.post("user/ak/"+window.platform_key+"/login.anys", qs.stringify(data));
    return res.data;
}
// 获取安全码
async function GetValidateCode() {
    const res = await axios.post('user/user_key.anys');
    return res.data;
}

// 发送短信验证码
async function SendCaptcha(data,transaction) {
    const res = await axios.post('user/'+transaction+'/sendcaptcha.anys',qs.stringify(data));
    return res.data;
}

// 双11狂欢购物节活动优惠券--手机号获取验证码
async function GetYzMa(data) {
    const res = await axios.post('promotion/sendcaptcha.anys',qs.stringify(data));
    return res.data;
}

// 双11狂欢购物节手机号领券
async function GetCoupons(data) {
    const res = await axios.post('promotion/applypromotion.anys',qs.stringify(data));
    return res.data;
}

// 修改密码
async function FindPwd(data) {
    const res = await axios.post('user/modifypwd.anys',qs.stringify(data));
    return res.data;
}

// 获取用户信息
async function GetUserinfo(data,cancelToken) {
    const res = await axios.post("user/ak/"+window.platform_key+"/user/"+localStorage.getItem("user_id")+"/userinfo.json",qs.stringify(data),cancelToken);
    return res.data;
}

// 更新用户信息
async function UpdateUserinfo(data) {
    const res = await axios.post("user/ak/"+window.platform_key+"/user/"+localStorage.getItem("user_id")+"/saveuser.json",qs.stringify(data));
    return res.data;
}

// 获取用户设备列表
async function GetDevicesList(data) {
    const res = await axios.post("user/ak/"+window.platform_key+"/user/"+localStorage.getItem("user_id")+"/device_list.json",qs.stringify(data));
    return res.data;
}

// 移除设备
async function DeviceRemove(data) {
    const res = await axios.post("user/ak/"+window.platform_key+"/user/"+localStorage.getItem("user_id")+"/device_remove.json",qs.stringify(data));
    return res.data;
}

// 激活码兑换
async function CodeActivation(data) {
    const res = await axios.post("activationCode/ak/"+window.platform_key+"/user/"+localStorage.getItem("user_id")+"/code.json",qs.stringify(data));
    return res.data;
}

// 更换手机号--检查旧手机号
async function Checkuser(data) {
    const res = await axios.post("user/ak/"+window.platform_key+"/user/"+localStorage.getItem("user_id")+"/checkuser.json",qs.stringify(data));
    return res.data;
}
// 更换手机号--新手机
async function Chmobile(data) {
    const res = await axios.post('user/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/chmobile.json',qs.stringify(data));
    return res.data;
}
// 用户绑定手机号
async function Bindmobile(data) { 
    const res = await axios.post('user/ak/'+window.platform_key+'/bind_mobile.anys',qs.stringify(data));
    return res.data;
}

// 商品详情
async function Detail(data) {
    const res = await axios.post('product/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/detail.json',qs.stringify(data));
    return res.data;
}

// 订单列表
async function GetOrderList(data) {
    const res = await axios.post('order/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/list.json',qs.stringify(data));
    return res.data;
}

// 删除订单
async function RemoveOrder(data) {
    const res = await axios.post('order/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/remove.json',qs.stringify(data));
    return res.data;
}

// 取消订单
async function CancelOrder(data) {
    const res = await axios.post('order/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/cancel.json',qs.stringify(data));
    return res.data;
}

// 确认订单
async function ConfirmOrder(data,cancelToken) {
    const res = await axios.post('order/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/confirm.json',qs.stringify(data),cancelToken);
    return res.data;
}

// 支付订单
async function PayOrder(data) {
    const res = await axios.post('order/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/pay.json',qs.stringify(data));
    return res.data;
}

// 创建订单
async function CreateOrder(data) {
    const res = await axios.post('order/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/create.json',qs.stringify(data));
    return res.data;
}

// 订单详情
async function OrderDetail(data) {
    const res = await axios.post('order/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/detail.json',qs.stringify(data));
    return res.data;
}

// 查询支付结果
async function QueryResult(data) {
    const res = await axios.post('pay/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/result.json',qs.stringify(data));
    return res.data;
}

// 我的反馈--创建
async function FeedbackCreate(data) {
    const res = await axios.post('feedback/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/create.json?access_token=' + encodeURIComponent(localStorage.getItem("access_token")),data);
    return res.data;
}

// 我的反馈--列表
async function Feedback(data) {
    const res = await axios.post('feedback/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/list.json',qs.stringify(data));
    return res.data;
}

// 我的反馈--详情
async function FeedbackDetail(feedbackID,data) {
    const res = await axios.post('feedback/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/'+feedbackID+'/details.json',qs.stringify(data));
    return res.data;
}

// 我的反馈--回复
async function FeedbackReply(feedbackID,data) {
    const res = await axios.post('feedback/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/'+feedbackID+'/reply.json?access_token=' + encodeURIComponent(localStorage.getItem("access_token")),data);
    return res.data;
}

// 我的反馈--删除
async function FeedbackDelete(feedbackID,data) {
    const res = await axios.post('feedback/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/'+feedbackID+'/delete.json',qs.stringify(data));
    return res.data;
}

// 我的反馈--提醒
async function FeedbackRemind(data) {
    const res = await axios.post('feedback/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/show.json',qs.stringify(data));
    return res.data;
}

// 获取语文示范诵读
async function GetReadLibrary(data) {
    const res = await axios.get(version+'/h5/json/audio_res.json');
    // const res = await axios.get('http://192.168.180.96:8080/static/js/audio_res.json');
    return res.data;
}

// 中小学语文诗词吟诵
async function PoetryRecitation() {
    const res = await axios.get(version+'/h5/json/poetry_res.json');
    // const res = await axios.get('http://192.168.180.96:8080/static/js/poetry_res.json');
    return res.data;
}

// 可用优惠券
async function GetUsableCoupons(data,cancelToken) {
    const res = await axios.post('/coupon/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/my_usable_coupon.json',qs.stringify(data),cancelToken);
    return res.data;
}

// 不可用优惠券
async function GetUnusableCoupons(data,cancelToken) {
    const res = await axios.post('/coupon/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/my_unusable_coupon.json',qs.stringify(data),cancelToken);
    return res.data;
}

// 语音测评分享
async function Evaluation(user_id,groupId) {
    const res = await axios.post('learn/'+user_id+'/'+groupId+'/evaluation.anys');
    return res.data;
}

// 我邀请的用户拉新的列表
async function InviteUsers(data) {
    const res = await axios.post('promotion/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/my_recommend_users.json',qs.stringify(data));
    return res.data;
}

// 活动列表
async function Promotions() {
    const res = await axios.get('promotion/promotions.anys',{app_version: '3.4.0'});
    return res.data;
}

// 教辅详情--内容解析
async function Teaching(id) {
    // const res = await axios.get('http://192.168.180.96:8080/static/js/ISBN0123456789001.json');
    const res = await axios.get('static/textbook/learn/'+id+'.json');
    return res.data;
}

// 获取用户已购买的书籍
async function MyOrderbooks(data) {
    const res = await axios.post('user/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/my_orderbooks.json',qs.stringify(data));
    return res.data;
}

// 积分规则
async function PointsRule() {
    // const res = await axios.get('https://www.easy-mock.com/mock/5b73ee04a364536777acd9e4/zock/points_rule#!method=get');
    // const res = await axios.get('http://192.168.180.96:8080/static/js/points_rule.json');
    const res = await axios.get(version + '/h5/json/points_rule.json');
    return res.data;
}

// 获取积分用户信息
async function GetUserPoint(data) {
    const app_id = '44';   //点读的app_id为44
    const res = await axios.post('points/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/'+app_id+'/getUser.json',qs.stringify(data));
    return res.data;
}

// 获取用户积分详情
async function GetUserPointDetail(data) {
    const app_id = '44';   //点读的app_id为44
    const res = await axios.post('points/ak/'+window.platform_key+'/user/'+localStorage.getItem("user_id")+'/'+app_id+'/getUserPoint.json',qs.stringify(data));
    return res.data;
}

// 音频及诗歌搜索
async function ReadSearch(data, type) {
    const res = await axios.post('search/'+type+'/search.anys',qs.stringify(data));
    return res.data;
}

// 测试报告
async function GetTestReportList(catalogid,data) {
    const res = await axios.post('/learn/ak/'+window.platform_key+'/englishCatalog/'+catalogid+'.anys',qs.stringify(data));
    return res.data;
}

// 数学寒假预习--获取数学教程详情
async function GetMathCourse(data, chapter_id) {
    const res = await axios.get(version + '/h5/json/textbook/chapter/'+chapter_id+'.json');
    // const res = await axios.get('http://192.168.180.122:8080/static/js/textbook/chapter/'+chapter_id+'.json');
    return res.data;
}

// 数学寒假预习--方法技巧
async function GetMethodSkill(data, category_id) {
    const res = await axios.get(version + '/h5/json/textbook/techniques/'+category_id+'.json');
    // const res = await axios.get('http://192.168.180.96:8080/static/js/textbook/techniques/'+category_id+'.json');
    // const res = await axios.get('https://www.easy-mock.com/mock/5b73ee04a364536777acd9e4/zock/'+category_id);
    return res.data;
}

// 数学寒假预习--综合练习
async function GetUnitExercise(data, category_id) {
    const res = await axios.get(version + '/h5/json/textbook/practice/'+category_id+'.json');
    // const res = await axios.get('http://192.168.180.96:8080/static/js/textbook/practice/'+category_id+'.json');
    // const res = await axios.get('https://www.easy-mock.com/mock/5b73ee04a364536777acd9e4/zock/unit_exercise');
    return res.data;
}

// 数学练习
async function GetMathmatics(id) {
    const res = await axios.get(version + '/h5/json/textbook/practice/'+id+'.json');
    // const res = await axios.get('https://www.easy-mock.com/mock/5b73ee04a364536777acd9e4/zock/1221001102121');
    return res.data;
}

// 单词练排名
async function EnglishRanking(data) {
    const res = await axios.post('/learn/ak/'+window.platform_key+'/english_ranking.anys',qs.stringify(data));
    return res.data;
}

// 单词练分享
async function EnWordShare(data, catalogid) {
    const res = await axios.post('/learn/ak/'+window.platform_key+'/englishCatalog/'+catalogid+'.anys',qs.stringify(data));
    return res.data;
}




export{
    Login,
    GetValidateCode,
    SendCaptcha,
    FindPwd,
    GetUserinfo,
    UpdateUserinfo,
    Reg,
    GetDevicesList,
    DeviceRemove,
    CodeActivation,
    Checkuser,
    Chmobile,
    Detail,
    GetOrderList,
    RemoveOrder,
    CancelOrder,
    ConfirmOrder,
    PayOrder,
    CreateOrder,
    OrderDetail,
    QueryResult,
    Feedback,
    FeedbackCreate,
    FeedbackDetail,
    FeedbackReply,
    FeedbackDelete,
    FeedbackRemind,
    GetReadLibrary,
    GetUsableCoupons,
    GetUnusableCoupons,
    Evaluation,
    InviteUsers,
    Promotions,
    Teaching,
    PoetryRecitation,
    MyOrderbooks,
    Author,
    GetYzMa,
    Bindmobile,
    GetCoupons,
    PointsRule,
    GetUserPoint,
    GetUserPointDetail,
    GetMathCourse,
    ReadSearch,
    GetUnitExercise,
    GetMethodSkill,
    GetMathmatics,
    GetTestReportList,
    EnglishRanking,
    EnWordShare
}
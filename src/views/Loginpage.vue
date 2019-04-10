<template>
  <div>
    <div id="body_inner" >
        <div id="content" style="padding: 0 0.32rem;">
            <div class="v3board v3section v3section_inline v3ui_forms" action="/auth/login" _binding="" method="POST" id="userForm" style="margin-bottom:20px;">
                <div class="login-toggle" @click="toggleLogin"><span></span> {{login_tip}}</div>
                <div align="center"  style="padding:0.4rem 0 0.3rem 0">
                    <img class="image bg-default" src="../assets/images/boy0.jpg" style="padding:6px;">
                </div>

                <!-- 账号密码登录 -->
                <div class="v3items cl-default bc-default" v-show="!isPhoneCode_login">
                    <!-- 输入用户名 -->
                    <div class="v3item bc-default v3ui v3css_inline v3ui_inline_edit" id="username" style="padding-left:0;border-top:none;padding:15px 0 10px 0;">
                        <!-- <div class="v3inline_prefix v3css_icon_cellphone"></div> -->
                        <div class="v3inline_middle cl-tip">
                            <input class="v3css_input" style="background:#f4f4f4;" type="text" maxlength="20" autocomplete="off" placeholder="用户名/手机号" v-model.trim="username">
                        </div>
                    </div>
                    <!-- 输入密码 -->
                    <div class="v3item bc-default v3ui v3css_inline v3ui_inline_edit" id="pwd" style="padding-left:0;position:relative;overflow:hidden;padding:15px 0 10px 0;">
                        <!-- <div class="v3inline_prefix v3css_icon_key"></div> -->
                        <div class="v3inline_middle cl-tip" style="float:left;">
                            <input class="v3css_input" style="background:#f4f4f4;" type="password" maxlength="20" autocomplete="off" placeholder="密码" v-model.trim="password">
                        </div>
                        <!-- 忘记密码 -->
                        <div style="margin-top: 6px;overflow:hidden;">
                            <router-link class="a_no_line" :to="{name:'Mpwdpage'}" id="forget_pwd" target="_blank" >
                                <div class="cl-master" style="position: absolute;right:0px;border-left:1px solid #d3d3d3;padding-left: 10px;color:#666;">忘记密码？</div>
                            </router-link>
                        </div>
                        
                    </div>

                </div>
                <!-- 手机短信验证码登录 -->
                <div class=" cl-default bc-default" v-show="isPhoneCode_login">
                    <!-- 输入用户名 -->
                    <div class="v3item bc-default v3ui v3css_inline v3ui_inline_edit" style="padding-left:0;border-top:none;padding:15px 0 10px 0;">
                        <div class="v3inline_middle cl-tip">
                            <input class="v3css_input" style="background:#f4f4f4;" type="number" maxlength="11" autocomplete="off" placeholder="手机号" v-model="phone_number">
                        </div>
                    </div>
                    <!-- 输入密码 -->
                    <div class="v3item bc-default v3ui v3css_inline v3ui_inline_edit" id="pwd" style="padding-left:0;position:relative;overflow:hidden;padding:0;">
                        <div class="v3inline_middle cl-tip v3items bc-default" style="float:left;padding:15px 0 10px 0;width:70%;">
                            <input class="v3css_input" style="background:#f4f4f4;" type="number" maxlength="8" autocomplete="off" placeholder="验证码" v-model.trim="phone_code">
                        </div>
                        <!-- 获取验证码 -->
                        <div style="margin-top: 6px;overflow:hidden;height:100%;padding-left:5px;">
                            <button ref="btn" @click="sendPhoneCode" class="cl-master" style="position:absolute;bottom:0;right:0;color:#fff;padding:4px;width:1.76rem;height:0.8rem;text-align:center;background:#65C49F;border-radius:2px;">{{phoneCodeText}}</button>
                        </div>
                        
                    </div>
                </div>
                <!-- 登录注册按钮 -->
                <div style="margin-top: 0.6rem;">
                    <div id="login" align="center" style="background:#65C49F;" class="v3css_button v3css_button_max cl-invert" @click="login">登 录</div>
                    <router-link class="a_no_line" :to="{name:'Regpage',query:{dev_id,dev_name}}" target="_blank">
                        <!-- <div style="margin-top: 20px;" id="reg" align="center" class="v3css_button v3css_button_max bg-slave cl-invert">注 册</div> -->
                        <div style="margin-top: 0.5rem;color:#666;" align="center">新用户注册</div>
                    </router-link>
                </div>
                <div class="login_" style="margin-top:1rem;">
                    <!--第三方登录文本-->
                    <div class="login_third">
                        <div class="login_text">
                            其他登录方式
                        </div>
                    </div>
                    <!--第三方登录图标-->
                    <div class="login_icon">
                        <!-- <div id="btn_qq" class="login_qq"></div> -->
                        <div @click="weChatLogin">
                            <div class="login_weixin login_other"></div>
                            <div>微信</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 登录状态提示 -->
    <div class="v3css_toast bg-dark" style="white-space: nowrap;" :class="{active:active}">{{activeText}}</div>
    <!-- 登录加载 -->
    <Loading 
    v-bind:loading="loading"
    v-bind:loadingError="loadingError"
    v-bind:loadingText="loadingText"
    v-bind:loadingImg="loadingImg"
    @hideLoading="hideLoadError" />
  </div>
</template>

<script>
import Loading from "../components/Loding";
import { Login, GetValidateCode, SendCaptcha } from "@/api/http";
import { Loginstatus,Closeview,weChatLogin } from "@/api/prompt";

export default {
    name: "Loginpage",
    data() {
        return {
            username: "",
            password: "",
            phone_number:"",//手机验证码登录  手机号
            phone_code:"",//手机验证码登录   验证码
            user_key:"",// 安全key（有获取手机验证码的页面加载时调用“获取安全码接口(user_key.json)”来获取）
            dev_id:"11",
            dev_name:"111",
            login_tip:"切换至账号密码登录",//手机验证码切换
            phoneCodeText:"获取验证码",//获取验证码文字
            active: false,//用户输入提示显示还是隐藏
            loading:false,//提交数据时加载状态
            activeText: "账号或密码错误!",
            loadingError:false,//加载失败时候的状态
            loadingText:"提交用户数据",
            loadingImg:require("../assets/images/running.gif"),
            isPhoneCode_login:true,//是否是手机验证码登录，true是，false不是
        };
    },
    methods: {
        // 获取安全码（有手机验证码的页面，在加载时需要调用）
        sendPhoneCode(e) {
            // 验证手机号
            if(!this.phone_number||this.phone_number.length !== 11){
                this.active = true;
                this.activeText="请输入正确的手机号！"
                this.setinter();
                return
            }else{
                GetValidateCode()
                .then(res=>{
                    console.log(res)
                    this.user_key = res.user_key
                    this.sendCaptcha()    // 执行-发送短信验证码方法
                })
                .catch(err=>{
                    this.loadingError = true;
                    this.loading = false;
                    this.loadingText="系统错误：未知错误！";
                    this.loadingImg=require("../assets/images/fault.gif")
                })
            }
        },
        // 发送短信验证码
        sendCaptcha() {
            SendCaptcha({
                user_key: this.user_key,
                username: this.phone_number
            },"login")
            .then(res=>{
                console.log(res)
                if(res.errcode != 110){
                    this.active = true;
                    this.activeText=res.errmsg
                    this.setinter();
                }else{
                    this.active = true;
                    this.activeText="发送成功！"
                    this.setinter();
                    this.countDown()      // 执行-60秒倒计时方法
                }
                this.loading=false;
            })
            .catch(err=>{
                this.loadingError = true;
                this.loading = false;
                this.loadingText="系统错误：未知错误！";
                this.loadingImg=require("../assets/images/fault.gif")
            })
        },
        // 60秒倒计时
        countDown(){
            let timer = null;
            let minute = 60;
            this.$refs.btn.setAttribute("disabled", true);
            timer = setInterval( () => {
                minute--;
                this.phoneCodeText= minute + "秒"
                if(minute <= 0){
                    clearInterval(timer);
                    this.$refs.btn.removeAttribute("disabled");
                    this.phoneCodeText = "获取验证码"
                }
            },1000)
        },
        toggleLogin(){
            // 判断目前的登录
            if(this.isPhoneCode_login){//目前是手机验证码登录,切换，清除手机验证的输入记录
                this.phone_number=""
                this.phone_code=""
                this.login_tip="切换至短信验证码登录"
            }else{
                this.username=""
                this.password=""
                this.login_tip="切换至账号密码登录"
            }
            //切换登录方式
            this.isPhoneCode_login=!this.isPhoneCode_login
        },
        login() {
            let param=null
            if (this.isPhoneCode_login) {//手机验证码登录
                if (!this.phone_number||this.phone_number.length!=11) {
                    this.active = true;
                    this.activeText="请输入正确的手机号！"
                    this.setinter();
                    return;
                }
                if (!this.phone_code) {
                    this.active = true;
                    this.activeText="验证码不能为空！"
                    this.setinter();
                    return;
                }
                param={
                    username: this.phone_number,
                    captcha: this.phone_code,
                    dev_id: this.dev_id,
                    dev_name: this.dev_name
                }
            }else{//账号密码登录
                if (!this.username || !this.password) {
                    this.active = true;
                    this.activeText="账号或密码错误!"
                    this.setinter();
                    return;
                }
                param={
                    username: this.username,
                    pwd: this.password,
                    dev_id: this.dev_id,
                    dev_name: this.dev_name
                }
            }
            Login(param)
            .then((res) => {
                console.log(res)
                if (res.errcode == 110) {
                    localStorage.setItem("access_token", res.access_token);
                    localStorage.setItem("user_id", res.user_info.user_id);
                    localStorage.setItem("name", res.user_info.name);
                    window.access_token=res.access_token;
                    window.user_id=res.user_info.user_id;
                    window.name=res.user_info.name;

                    this.active_time=res.active_time


                    // 登录成功交互
                    // res.user_info.grade=res.user_info.grade_txt;
                    this.Loginstatus(Object.assign(res.user_info,{access_token:res.access_token, status:'login', active_time: this.active_time}));


                    // 登录成功后跳转
                    // this.$router.push({ name: "User" });
                    let redirect = this.$route.query.redirect
                    if(!redirect){
                        redirect = "user"
                        this.Closeview()
                    }
                    
                    this.$router.push({ 
                        path: '/' + redirect                        
                    });

                    console.log(this.$router.query.redirect)
                    // this.Closeview()

                }else if(res.errcode == 500482){//账号密码错误
                    this.loading=false;
                    this.active = true;
                    this.activeText="账号或密码错误!"
                    this.setinter();
                }else if(res.errcode == 500481){//用户不存在
                    this.loading=false;
                    this.active = true;
                    this.activeText="用户不存在!"
                    this.setinter();
                }else if(res.errcode == 500487){//设备数量超限
                    this.loading=false;
                    this.active = true;
                    this.activeText="设备数量超限!"
                    this.setinter();
                }
                else{
                    this.loading=false;
                    this.active = true;
                    this.activeText=res.errmsg
                    this.setinter();
                }
            })
            .catch(error => {
                this.loadingError = true;
                this.loading = false;
                this.loadingText="系统错误：未知错误！";
                this.loadingImg=require("../assets/images/fault.gif")
            });
        },
        setinter(text) {
            var timer = setTimeout(() => {
                this.active = false;
                clearTimeout(timer);
            }, 2000);
        },
        hideLoadError(hide){
            this.loadingError=hide;
        },
        //登录成功之后与移动端的交互
        Loginstatus,
        Closeview,
        weChatLogin
    },
    created(){
        // localStorage.removeItem("weixin_params")

        //添加一个请求拦截器
        this.$axios.interceptors.request.use((config)=>{
                //在请求发出之前进行一些操作
                this.loading=true;
                this.loadingText="提交用户数据";
                this.loadingImg=require("../assets/images/running.gif");
                return config;
            },function(err){
                return Promise.reject(error);
        });

        // 获取用户设备信息
        app_js_hanler = (message)=>{
            if(JSON.parse(message).command == "device"){//返回头像url
                this.dev_name=JSON.parse(message).dev_name
                this.dev_id=JSON.parse(message).dev_id
            }
            // 获取微信登录的各类id
            if(JSON.parse(message).command == "thirdPartyLogin"){//微信登录
                if(JSON.parse(message).type == "WinXin"){//微信
                    Login({
                        portal_id: "2" ,//1：QQ，2：weixin，3：tianjin，4：新浪
                        open_id: JSON.parse(message).open_id,//第三方账号id
                        unionid: JSON.parse(message).unionid,//微信账号的unionid
                        dev_id: this.dev_id,
                        dev_name: this.dev_name
                    })
                    .then(res=>{
                        console.log(res)
                        if(res.errcode == 110){
                            localStorage.setItem("access_token", res.access_token);
                            localStorage.setItem("user_id", res.user_info.user_id);
                            window.access_token=res.access_token;
                            window.user_id=res.user_info.user_id;

                            this.active_time=res.active_time

                            // 登录成功交互
                            this.Loginstatus(Object.assign(res.user_info,{access_token:res.access_token, status:'login', active_time: this.active_time}));

                            // 登录成功后跳转
                            let redirect = this.$route.query.redirect
                            if(!redirect){
                                redirect = "user"
                                this.Closeview()
                            }
                            
                            this.$router.push({ 
                                path: '/' + redirect                        
                            });
                        }else if(res.errcode == 500432){//未绑定手机号
                            const params={
                                        portal_id: "2" ,//1：QQ，2：weixin，3：tianjin，4：新浪
                                        open_id: JSON.parse(message).open_id,//第三方账号id
                                        unionid: JSON.parse(message).unionid,//微信账号的unionid
                                        dev_id: this.dev_id,
                                        dev_name: this.dev_name
                                    }

                            localStorage.setItem("weixin_params", JSON.stringify(params));
                            // 跳转绑定手机号页面
                            let routeData = this.$router.resolve({ name: 'BindPhone'});
                            window.open(routeData.href,'_blank');
                        }else{
                            this.active = true;
                            this.activeText=res.errmsg
                            this.setinter();
                        }
                        this.loading=false;
                    })
                    .catch(err=>{
                        this.loadingError = true;
                        this.loading = false;
                        this.loadingText="系统错误：未知错误！";
                        this.loadingImg=require("../assets/images/fault.gif")
                    })
                }
            }
        }
    },
    components:{
        Loading
    }
};
</script>

<style scoped>
    html {
    font-size: 100px;
    }

    @media screen and (min-width: 640px) and (max-width: 750px) {
    html {
        font-size: 72px;
    }
    }

    @media screen and (min-width: 480px) and (max-width: 640px) {
    html {
        font-size: 56px;
    }
    }

    @media screen and (min-width: 320px) and (max-width: 480px) {
    html {
        font-size: 42px;
    }
    }
    .login-toggle{
        margin-top: 0.6rem;
        font-size:0.28rem;
    }
    .login-toggle span{
        display: inline-block;
        vertical-align: middle;
        position: relative;
        top: -2px;
        width: 0.28rem;
        height: 0.28rem;
        background: url(../assets/images/change.png) center no-repeat;
        background-size: contain;
        margin-right: 0.12rem;
    }
    .image {
    width: 1.98rem;
    height: 1.98rem;
    border: 0;
    vertical-align: middle;
    -moz-border-radius: 15px;
    /* Firefox */
    -webkit-border-radius: 15px;
    /* Safari 和 Chrome */
    border-radius: 50px;
    box-sizing: border-box;
    /* Opera 10.5+, 以及使用了IE-CSS3的IE浏览器 */
    }
    .v3items {
    text-align: left;
    }
    .boderline {
    background-image: url("../assets/images/line.png");
    background-repeat: repeat-x;
    background-position: center;
    }

    .login_ {
        margin: 10px;
    }

    .login_third {
    border-top: 1px solid #cfcfcf;
    margin-top: 40px;
    position: relative;
    }

    .login_third .login_text {
    position: absolute;
    padding: 0 10px;
    font-size: 0.28rem;
    background-color: #f4f4f4;
    color: #999;
    left: 50%;
    transform: translate(-50%, -50%);
    }

    .login_icon {
    text-align: center;
    margin-top: 0.5rem;
    }

    .login_icon > div {
        display: inline-block;
    }
    .login_icon > div .login_other{
        width: 1.05rem;
        height: 1.05rem;
        margin-bottom: 0.18rem;
    }
    .login_icon .login_qq {
    background: url("../assets/images/login_qq.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin-right: 1.26rem;
    }

    .login_icon .login_weixin {
    background: url("../assets/images/login_weixin.png") no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    }
    .v3inline_middle.cl-tip {
    width: calc(100% - 50px);
    }
    .v3css_input {
    width: 100%;
    height: 30px;
    color: #333;
    font-size: 14px;
    }    
    .v3css_toast {
        top: 90%;
        height: 20px;
        line-height: 20px;
    }
    .v3css_toast.active {
    /* transition: all 0.8s; */
    top: 76%;
    left: 50%;
    bottom: 20%;
    transform: translate(-50%);
    opacity: 1;
    }
    button{
        outline-style:none;
        border:none; 
    }
</style>

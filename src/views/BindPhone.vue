<template>
        <div id="content" style="padding: 0 0.32rem;margin-top:0.6rem;">
            <div class="v3board v3section v3section_inline v3ui_forms" style="margin-bottom:20px;">
                <!-- 绑定手机号 -->
                <div class=" cl-default bc-default">
                    <!-- 输入用户名 -->
                    <div class="v3item bc-default v3ui v3css_inline v3ui_inline_edit" style="padding-left:0;border-top:none;padding:15px 0 10px 0;">
                        <div class="v3inline_middle cl-tip">
                            <input class="v3css_input" style="background:#f4f4f4;" type="number" maxlength="11" autocomplete="off" placeholder="手机号" v-model="phone_number">
                        </div>
                    </div>
                    <!-- 获取验证码 -->
                    <div class="v3item bc-default v3ui v3css_inline v3ui_inline_edit" style="padding-left:0;position:relative;overflow:hidden;padding:0;">
                        <div class="v3inline_middle cl-tip v3items bc-default" style="float:left;padding:15px 0 10px 0;width:70%;">
                            <input class="v3css_input" style="background:#f4f4f4;" type="number" maxlength="8" autocomplete="off" placeholder="验证码" v-model.trim="phone_code">
                        </div>
                        <!-- 获取验证码 -->
                        <div style="margin-top: 6px;overflow:hidden;height:100%;padding-left:5px;">
                            <button ref="btn" @click="sendPhoneCode" class="cl-master" style="position:absolute;bottom:0;right:0;color:#fff;padding:4px;width:1.76rem;height:0.9rem;text-align:center;background:#65C49F;border-radius:2px;">{{phoneCodeText}}</button>
                        </div>
                        
                    </div>
                </div>
                <div style="color:#666;font-size:0.28rem;margin:0.58rem 0;">
                    基于国家实名认证的要求，首次微信登录必须绑定手机号，感谢您的理解！
                </div>
                <!-- 确认按钮 -->
                <div style="margin-bottom: 1.08rem;">
                    <div align="center" style="background:#65C49F;" class="v3css_button v3css_button_max cl-invert" @click="bindmobile">确认</div>
                </div>
                <div style="color:#666;font-size:0.28rem;margin:0.58rem 0;">
                    <div style="font-weight:bold;font-size:0.24rem;margin-bottom:0.3rem;">提示：</div>
                    <div style="font-size:0.24rem;margin-bottom:0.3rem;">1.如果该手机号已经注册过人教点读，系统将为您绑定当前微信号。</div>
                    <div style="font-size:0.24rem;margin-bottom:0.3rem;">2.如果您输入的手机号未注册过人教点读，我们将为您自动注册。</div>
                </div>
            </div>
            <!-- 状态提示 -->
            <div class="v3css_toast bg-dark" style="white-space: nowrap;" :class="{active:active}">{{activeText}}</div>
        </div>

</template>

<script>
import { Bindmobile, GetValidateCode, SendCaptcha } from "@/api/http";
import { Loginstatus,CloseWechat } from "@/api/prompt";
export default {
    data() {
        return {
            phone_number:"",
            phone_code:"",
            login_tip:"切换至短信验证码登录",
            loadingImg:require("../assets/images/running.gif"),
            active:false,//用户输入提示显示还是隐藏
            activeText: "账号或密码错误!",//用户输入提示
            phoneCodeText:"获取验证码",//获取验证码文字
            weixin_params:null
        };
    },
    methods:{
        // 获取安全码（有手机验证码的页面，在加载时需要调用）
        sendPhoneCode() {
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
            },"bind")
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
                this.active = true;
                this.activeText="未知错误"
                this.setinter();
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
        setinter(text) {
            var timer = setTimeout(() => {
                this.active = false;
                clearTimeout(timer);
            }, 2000);
        },
        bindmobile(){
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
            this.weixin_params=JSON.parse(localStorage.getItem("weixin_params"));
            Bindmobile({
                mobile:this.phone_number,//手机
                captcha:this.phone_code,//手机短信验证码
                portal_id: "2" ,//1：QQ，2：weixin，3：tianjin，4：新浪
                open_id: this.weixin_params.open_id,//第三方账号id
                unionid: this.weixin_params.unionid,//微信账号的unionid
                dev_id: this.weixin_params.dev_id,
                dev_name: this.weixin_params.dev_name
            })
            .then(res=>{
                // portal_id: "2" ,//1：QQ，2：weixin，3：tianjin，4：新浪
                // open_id: "ocNHWw6MfzPCho8ESLkNynzrEGBY",//第三方账号id
                // unionid: "oaTPRvims8GMm_XaMy-gu3SJMRok",//微信账号的unionid
                // dev_id: "this.weixin_params.dev_id",
                // dev_name: "this.weixin_params.dev_name"
                console.log(res)
                if(res.errcode == 110){
                    localStorage.setItem("access_token", res.access_token);
                    localStorage.setItem("user_id", res.user_info.user_id);
                    window.access_token=res.access_token;
                    window.user_id=res.user_info.user_id;

                    this.active_time=res.active_time

                    // 登录成功交互
                    Loginstatus(Object.assign(res.user_info,{access_token:res.access_token, status:'login', active_time: this.active_time}));
                    localStorage.removeItem("weixin_params")
                    // 登录成功后跳转
                    CloseWechat()
                }else{
                    this.active = true;
                    this.activeText=res.errmsg
                    this.setinter();
                }
            })
            .catch(err=>{
                this.active = true;
                this.activeText="未知错误"
                this.setinter();
            })
        }
    },
    // created(){
    //     this.weixin_params=JSON.parse(localStorage.getItem("weixin_params"));
    // },
    beforeRouteLeave(to, from, next){
        localStorage.removeItem("weixin_params")
        next()
    }
};
</script>

<style scoped>
    .v3items {
    text-align: left;
    }
    .boderline {
    background-image: url("../assets/images/line.png");
    background-repeat: repeat-x;
    background-position: center;
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
    top: 76%;
    left: 50%;
    bottom: 20%;
    transform: translate(-50%);
    opacity: 1;
    }
</style>

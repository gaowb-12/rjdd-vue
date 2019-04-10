<template>
    <div>
        <div id="body_inner">
            <div id="content">
                <div class="v3board v3section v3section_inline v3ui_forms" action="/auth/sendcaptcha/modify" method="POST" id="userForm"
                    style="margin-bottom:20px;">

                    <div class="v3items cl-default bg-default bc-default">
                        <!-- 手机号 -->
                        <div class="v3item bc-default v3ui v3css_inline">
                            <div class="v3inline_left">手机号：</div>
                            <div class="v3inline_middle cl-tip">
                                <input class="v3css_input" type="number" maxlength="11" autocomplete="off" placeholder="请输入手机号" v-model="tel">
                            </div>
                        </div>
                        <!-- 新密码 -->
                        <div class="v3item bc-default v3ui v3css_inline v3ui_inline_edit" id="pwd">
                            <div class="v3inline_left">新密码：</div>
                            <div class="v3inline_middle cl-tip">
                                <input class="v3css_input" type="password" minlength="8" maxlength="20" autocomplete="off" placeholder="8-20位密码" v-model.trim="pwd">
                            </div>
                        </div>
                        <!-- 验证码 -->
                        <div class="v3item bc-default v3ui v3css_inline">
                            <div class="v3inline_left">验证码：</div>
                            <div class="v3inline_middle cl-tip">
                                <input class="v3css_input" type="text" maxlength="11" autocomplete="off" placeholder="手机验证码" v-model.trim="captcha">
                            </div>
                            <div class="v3inline_right_block" style="top:8px;z-index: 2"  @click="getValidateCode">
                                <button class="v3inline_right v3css_button v3css_button_min bg-slave cl-invert" id="send" style="width: 7.2em; padding: 7px 0; outline:none;" ref="btn">{{phoneCodeText}}</button>
                            </div>
                        </div>
                    </div>
                    <!-- 确定按钮 -->
                    <div style="padding: 0 10px;margin-top: 20px;">
                        <div style="margin-top: 20px;" id="modify" align="center" class="v3css_button v3css_button_max bg-master cl-invert" @click="findPwd()">确 定</div>
                    </div>
                </div>

                <div class="v3board v3section v3section_inline bg-default" style="margin-top:5px;">
                    <div class="v3title v3title_inner cl-minor" style="padding-top:10px;padding-bottom:10px;">
                        <span class="v3css_icon_title_triangle cl-master"></span>
                        <span>收不到验证码？</span>
                    </div>
                    <div class="v3items cl-default bg-default bc-default">
                        <div class="v3item bc-default v3ui v3css_inline cl-minor" style="line-height:180%;font-size:0.9em;">
                            <div>1. 请核实您输入的手机号是否正确、是否欠费或者信号是否良好。</div>
                            <div>2. 请检查您的手机拦截软件是否将该短信自动拦截（安全卫士、手机管家等）。</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 蒙版层 -->
        <div id="fullscreen_overlay_800" class="bg-minor" v-show="flag" @click="flag=false"></div>
        <!-- 弹出层 -->
        <div class="v3css_confirm bg-default" v-show="flag">
            <div class="confirm_title cl-master">提醒</div>
            <div class="confirm_text textline">{{confirmText}}</div>
            <table class="confirm_command">
                <tbody>
                    <tr>
                        <td style="width: 100%;">
                            <div class="v3css_button v3css_button_max bg-master cl-invert" @click="flag=false">确认</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 加载状态 -->
        <Loading 
        v-bind:loading="loading"
        v-bind:loadingError="loadingError"
        v-bind:loadingText="loadingText"
        v-bind:loadingImg="loadingImg"
        @hideLoading="hideLoadError" />
    </div>
</template>
<script>
    import qs from "qs";
    import Loading from "../components/Loding";
    import { GetValidateCode,SendCaptcha,FindPwd } from "@/api/http";
    import { Closeview } from "@/api/prompt";
    
    export default {
        name: 'Mpwdpage',
        data () {
            return {
                tel:"",
                pwd:"",
                captcha:"",
                flag:false,
                phoneCodeText: "获取验证码",
                confirmText:"请输入正确的手机号！",
                loading:false,
                loadingError:false,
                loadingText:"提交用户数据",
                loadingImg:require("../assets/images/running.gif")
            }
        },
        methods:{
            // 获取安全码
            async getValidateCode(){
                // 表单验证
                if(!this.validate()) return;
                try {
                    const res= await GetValidateCode();
                    console.log(res)
                    if(res.errcode==110){
                        const user_key = res.user_key
                        this.sendCaptcha(user_key)    // 执行-发送短信验证码方法
                    }else{
                        this.loading=false;
                        this.flag = true;
                        this.confirmText = res.errmsg;
                    }
                } catch (error) {
                    this.loadingError = true;
                    this.loading = false;
                    this.loadingText="系统错误：未知错误！";
                    this.loadingImg=require("../assets/images/fault.gif")
                }
            },
            // 发送短信验证码
            async sendCaptcha(user_key) {
                try {
                    const res=await SendCaptcha({
                        'user_key': user_key,
                        'username': this.tel
                    },"mod");
                    if(res.errcode!=110){
                        this.loading=false;
                        this.flag = true;
                        this.confirmText = res.errmsg;
                    }else{
                        this.loading=false;
                        this.countDown();      // 执行-60秒倒计时方法
                    }
                } catch (error) {
                    this.loadingError = true;
                    this.loading = false;
                    this.loadingText="系统错误：未知错误！";
                    this.loadingImg=require("../assets/images/fault.gif")
                }
            },
            // 60秒倒计时
            countDown(){
                let timer = null;
                let minute = 60;
                this.$refs.btn.setAttribute("disabled", true);        
                timer = setInterval( () => {
                    minute--;
                    //console.log(minute);            
                    this.phoneCodeText= minute + "秒"
                    if(minute <= 0){
                        clearInterval(timer);
                        this.$refs.btn.removeAttribute("disabled");
                        this.phoneCodeText = "获取验证码"
                    }
                },1000)
            },
            async findPwd(){
                if(!this.validate()) return;
                if(!this.captcha){
                    this.flag=true;
                    this.confirmText = "请输入验证码！";
                    return 
                }
                try {
                    const res=await FindPwd({
                        'captcha':this.captcha,
                        'pwd': this.pwd,
                        'username': this.tel
                    });
                    console.log(res)
                    if(res.errcode=="110"){
                        Closeview()
                        this.$router.push({name:"Loginpage"});
                    }else{
                        this.loading=false;
                        this.flag = true;
                        this.confirmText = res.errmsg;
                    }
                } catch (error) {
                    this.loadingError = true;
                    this.loading = false;
                    this.loadingText="系统错误：未知错误！";
                    this.loadingImg=require("../assets/images/fault.gif")
                }
            },
            validate(){
                // 验证手机号
                if(!this.tel){
                    this.flag = true
                    this.confirmText = "请输入正确的手机号！"
                    return false
                }else if(this.tel.length !== 11){
                    this.flag = true
                    this.confirmText = "请输入正确的手机号！"
                    return false
                }else if(this.pwd.length < 8||this.pwd.length > 20){
                    this.flag = true
                    this.confirmText = "密码长度应为8-20位！"
                    return false
                }else{
                    return true
                }
            },
            hideLoadError(hide){
                this.loadingError=hide;
            }
        },
        created(){
            //添加一个请求拦截器
            this.$axios.interceptors.request.use((config)=>{
                    //在请求发出之前进行一些操作
                    this.loading=true;
                    this.loadingText="提交用户数据";
                    this.loadingImg=require("../assets/images/running.gif")
                    return config;
                },function(err){
                    return Promise.reject(error);
            });
        },
        components:{
            Loading
        }
    }
</script>

<style scoped>
    .v3inline_middle.cl-tip {
        width: calc(100% - 80px);
    }
</style>


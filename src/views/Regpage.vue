<template>
    <div>
      <div id="body_inner">
        <div id="content">
            <div class="login-toggle" @click="toggleRegister"><span></span> {{register_tip}}</div>
            <div class="v3board v3section v3section_inline v3ui_forms" id="userForm" style="margin-bottom:20px;">
                <div align="center">
                    <img class="image bg-default" src="../assets/images/pep.png" style="margin: 10px 0;padding:6px;">
                </div>
                <!-- 账号密码注册 -->
                <div class="v3items cl-default bg-default bc-default" v-show="!isPhoneCode_reg">
                    <div class="v3item bc-default v3ui v3css_inline v3ui_inline_edit">
                        <div class="v3inline_prefix v3css_icon_cellphone"></div>
                        <div class="v3inline_middle cl-tip"><input class="v3css_input" type="number" maxlength="11" autocomplete="off" placeholder="手机号" v-model="cellphone"></div>
                    </div>
                    <div class="v3item bc-default v3ui v3css_inline v3ui_inline_edit">
                        <div class="v3inline_prefix v3css_icon_key"></div>
                        <div class="v3inline_middle cl-tip"><input class="v3css_input" type="password" maxlength="20" autocomplete="off" placeholder="8~20个字符，可包含字母、数字、特殊字符" v-model="password"></div>
                    </div>
                    <div class="v3item bc-default v3ui v3css_inline v3ui_inline_edit">
                        <div class="v3inline_prefix v3css_icon_code_identify "></div>
                        <div class="v3inline_middle cl-tip"><input class="v3css_input" style="width:60%;" type="number" maxlength="20" autocomplete="off" placeholder="手机验证码" v-model="phoneCode"></div>
                        <div class="v3inline_right_block" style="top:12px;z-index: 2">
                            <button class="v3inline_right v3css_button v3css_button_min bg-slave cl-invert" id="send" style="width: 7.2em; padding: 7px 0; outline:none;" ref="btn_pwd" @click="sendPhoneCode(cellphone)">{{phoneCodeText}}</button>
                        </div>
                    </div>
                </div>
                <!-- 手机验证码注册 -->
                <div class="v3items cl-default bg-default bc-default" v-show="isPhoneCode_reg">
                    <div class="v3item bc-default v3ui v3css_inline v3ui_inline_edit">
                        <div class="v3inline_prefix v3css_icon_cellphone"></div>
                        <div class="v3inline_middle cl-tip"><input class="v3css_input" type="number" maxlength="11" autocomplete="off" placeholder="手机号" v-model="phone_number"></div>
                    </div>
                    <div class="v3item bc-default v3ui v3css_inline v3ui_inline_edit">
                        <div class="v3inline_prefix v3css_icon_code_identify "></div>
                        <div class="v3inline_middle cl-tip"><input class="v3css_input" style="width:60%;" type="number" maxlength="20" autocomplete="off" placeholder="手机验证码" v-model="phone_code"></div>
                        <div class="v3inline_right_block" style="top:12px;z-index: 2">
                            <button class="v3inline_right v3css_button v3css_button_min bg-slave cl-invert" id="send" style="width: 7.2em; padding: 7px 0; outline:none;" ref="btn_pcd" @click="sendPhoneCode(phone_number)">{{phoneCodeText}}</button>
                        </div>
                    </div>
                </div>

                <div style="padding: 0 10px;margin-top: 20px;">
                    <div align="center" style="margin-top: 10px;font-size: 14px">
                        <input type="checkbox" style="width:auto;" id="xieyi" checked="" v-model="protocol"> 我已经看过并同意
                        <router-link :to="{name: 'Protocol'}" class="a_no_line" target="_blank" style="color: #7CC677">《用户协议》</router-link>
                    </div>
                    <div style="margin-top: 20px;" id="reg" align="center" class="v3css_button v3css_button_max bg-master cl-invert" @click="handleSubmit">注 册</div>
                </div>
                <form>
                    <input type="hidden" name="user_key" value="1de77df57cd5e1afddb33f7a767537ed">
                </form>
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
      <div class="fullscreen_overlay bg-minor" v-if="flag"></div>
      <!-- 提示框 -->
      <div class="v3css_confirm bg-default v3css_overlay_autodestroy fullscreen_overlay_modal_item" v-if="flag">
          <div class="confirm_title cl-master">提醒</div>
          <div class="confirm_text textline">{{confirmText}}</div>
          <table class="confirm_command">
              <tbody>
                  <tr>
                      <td style="width: 100%;">
                          <div class="v3css_button v3css_button_max bg-master cl-invert" @click="closeConfirm">确认</div>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>
</template>

<script>
import { GetValidateCode, SendCaptcha, Reg } from "@/api/http";
import { CloseWechat,Loginstatus } from "@/api/prompt";

export default {
  name: "Regpage",
  data() {
    return {
        flag: false,
        cellphone: "",    // 手机号
        password: "",     // 密码
        phoneCode: "",    // 手机验证码
        phoneCodeText: "获取验证码",      //获取验证码文字
        confirmText: "",  // 弹出框提示内容
        user_key: "",     // 安全key（有获取手机验证码的页面加载时调用“获取安全码接口(user_key.json)”来获取）
        protocol: true,   // 是否勾选用户协议
        phone_number:"",//手机验证码注册 手机号
        phone_code:"",//手机验证码注册   验证码
        register_tip:"使用账号密码注册",//手机验证码切换
        isPhoneCode_reg:true,//是否是手机验证码注册，true是，false不是
    };
  },  
  methods: {
    // 切换注册方式
    toggleRegister(){
        if(this.isPhoneCode_reg){
            // 切换到账号密码注册
            this.isPhoneCode_reg=false
            this.register_tip="使用手机验证码快速注册"
        }else{
            // 切换到手机验证码注册
            this.isPhoneCode_reg=true
            this.register_tip="使用账号密码注册"
        }
    },
    handleSubmit() {
        // 测试
        // if(/^123456$/.test(this.cellphone)&&/^654321$/.test(this.password)&&/^1234$/.test(this.phoneCode)){
        //     CloseWechat()
        //     return 
        // }
        let data=null
        if(this.isPhoneCode_reg){//手机验证码注册
            // 验证手机号
            if(!this.phone_number||this.phone_number.length !== 11){
                this.flag = true
                this.confirmText = "请输入正确的手机号！"
                return
            }
            // 手机验证码
            if(!this.phone_code){
                this.flag = true
                this.confirmText = "请输入手机验证码！"
                return
            }
            data={
                username: this.phone_number,
                captcha: this.phone_code,
                dev_id:this.$route.query.dev_id,
                dev_name:this.$route.query.dev_name
            }
        }else{//账号密码注册
            // 验证手机号
            if(!this.cellphone||this.cellphone.length !== 11){
                this.flag = true
                this.confirmText = "请输入正确的手机号！"
                return
            }
            // 验证密码
            if(!this.password){
                this.flag = true
                this.confirmText = "请输入密码！"
                return
            }else if(this.password.length < 8 || this.password.length > 20){
                this.flag = true
                this.confirmText = "请输入正确的密码！"
                return
            }
            // 手机验证码
            if(!this.phoneCode){
                this.flag = true
                this.confirmText = "请输入手机验证码！"
                return
            }
            data={
                username: this.cellphone,
                pwd: this.password,
                captcha: this.phoneCode,
                dev_id:this.$route.query.dev_id,
                dev_name:this.$route.query.dev_name
            }
        }
        
        // 是否勾选用户协议
        if(!this.protocol){
            this.flag = true
            this.confirmText = "请阅读并同意用户使用协议"
            return
        }else{
            Reg(data)
            .then(res => {
                console.log(res)
                if(res.errcode != 110){
                    this.flag = true
                    this.confirmText = res.errmsg
                    return
                }else{
                    
                    localStorage.setItem("access_token", res.access_token);
                    localStorage.setItem("user_id", res.user_info.user_id);
                    localStorage.setItem("name", res.user_info.name);
                    window.access_token=res.access_token;
                    window.user_id=res.user_info.user_id;

                    this.active_time=res.active_time

                    // 登录成功交互
                    Loginstatus(Object.assign(res.user_info,{access_token:res.access_token, status:'login', active_time: this.active_time}));

                    // 注册成功返回根目录
                    CloseWechat()
                }
            })
            .catch(err => {
                alert("系统异常，请刷新重试！")
            })
        }
    },
    // 关闭弹窗
    closeConfirm() {
      this.flag = false
    },
    // 获取安全码（有手机验证码的页面，在加载时需要调用）
    sendPhoneCode(phone,event) {
        console.log()
        // 验证手机号
        if(!phone||phone.length !== 11){
            this.flag = true
            this.confirmText = "请输入正确的手机号！"
            return
        }else{
            GetValidateCode()
            .then(res=>{
                console.log(res)
                this.user_key = res.user_key
                this.sendCaptcha(phone)    // 执行-发送短信验证码方法
            })
            .catch(err=>{
                console.log(err)
                alert("系统异常，请刷新重试！")
            })
        }
    },
    // 发送短信验证码
    sendCaptcha(phone) {
        SendCaptcha({
            user_key: this.user_key,
            username: phone
        },"reg")
        .then(res=>{
            console.log(res)
            if(res.errcode != 110){
                this.flag = true
                this.confirmText = res.errmsg
                return
            }else{
                if(this.isPhoneCode_reg){//手机验证码注册
                    this.countDown(this.$refs.btn_pcd)      // 执行-60秒倒计时方法
                }else{//账号密码注册
                    this.countDown(this.$refs.btn_pwd)      // 执行-60秒倒计时方法
                }
                
            }
        })
        .catch(err=>{
            console.log(err)
            alert("系统异常，请刷新重试！")
        })
    },
    // 60秒倒计时
    countDown(btn){
        let timer = null;
        let minute = 60;
        btn.setAttribute("disabled", true);
        timer = setInterval( () => {
            minute--;
            btn.innerHTML= minute + "秒"
            if(minute <= 0){
                clearInterval(timer);
                btn.removeAttribute("disabled");
                btn.innerHTML = "获取验证码"
            }
        },1000)
    },
    
  }
};
</script>
<style scoped>
    .login-toggle{
        margin-top: 0.6rem;
        font-size:0.28rem;
        padding-left: 15px;
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
    input{
        width: 100%;
    }
</style>

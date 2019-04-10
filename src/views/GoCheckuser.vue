<template>
  <div class="bg-body bc-default cl-default">
      <div id="body_inner">
        <div id="content">
            <div class="v3board" style="margin: 30px 10px;margin-bottom: 40px">
                <table>
                    <tbody>
                        <tr>
                            <td width="12%" align="center" style="position: relative">
                                <div style=" width:30px; height:30px; border-radius:15px;" class="bg-master cl-invert">
                                    <span style="height:30px; line-height:30px; display:block; text-align:center;font-weight: bolder">1</span>
                                </div>
                                <div class="cl-master" style="text-align:center;position: absolute;font-size: 12px;width:100%;padding: 2px 0;">
                                    验证身份
                                </div>

                            </td>
                            <td width="17%">
                                <div style="width:100%;height:1px;margin:0 auto;padding:0;overflow:hidden;" class="bg-tip"></div>
                            </td>
                            <td width="12%" align="center" style="position: relative">
                                <div style=" width:30px; height:30px; border-radius:15px;" class="bg-tip cl-invert">
                                    <span style="height:30px; line-height:30px; display:block; text-align:center">2</span>
                                </div>
                                <div class="cl-tip" style="position: absolute;text-align:center;font-size: 12px;width:100%;padding: 2px 0">
                                    修改手机
                                </div>
                            </td>
                            <td width="17%">
                                <div style="width:100%;height:1px;margin:0 auto;padding:0;overflow:hidden;" class="bg-tip"></div>
                            </td>
                            <td width="12%" align="center" style="position: relative">
                                <div style=" width:30px; height:30px; border-radius:15px;" class="bg-tip cl-invert">
                                    <span style="height:30px; line-height:30px; display:block; text-align:center" class="v3css_icon_ok"></span>
                                </div>
                                <div class="cl-tip" style="position: absolute;text-align:center;font-size: 12px;width:100%;padding: 2px 0">
                                    修改成功
                                </div>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="v3board v3section v3section_inline v3ui_forms" id="userForm" style="margin-bottom:20px;">

                <div class="v3items cl-default bg-default bc-default">

                    <div class="v3item bc-default v3ui v3css_inline ">
                        <div class="v3inline_left">当前手机号：</div>
                        <div class="v3inline_middle">{{cellphone | oldCellphone}}</div>
                        <div class="v3inline_right_block">
                            <div class="v3inline_right"></div>
                        </div>
                    </div>

                    <div class="v3item bc-default v3ui v3css_inline v3ui_inline_edit" name="captcha" value="" id="captcha">
                        <div class="v3inline_left">校验码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</div>
                        <div class="v3inline_middle cl-tip" style="visibility: visible; width: calc(100% - 100px);">
                            <input type="number" placeholder="手机验证码" v-model="phoneCode" />
                        </div>
                        <div class="v3inline_right_block" style="top:8px;z-index: 2">
                            <button class="v3inline_right v3css_button v3css_button_min bg-slave cl-invert" id="send" style="width: 7.2em; padding: 7px 0; outline:none;" ref="btn" @click="sendPhoneCode">{{phoneCodeText}}</button>
                        </div>
                        <input class="v3css_input" maxlength="10" autocomplete="off" type="number" style="left: 106px; width: calc(100% - 106px); display: none;">
                    </div>
                </div>


                <div style="padding: 0 10px;margin-top: 20px;">
                    <div style="margin-top: 20px;" id="checkuser" align="center" class="v3css_button v3css_button_max  bg-master cl-invert" @click="nextStep">下一步</div>
                </div>
                <form>
                    <input type="hidden" name="user_key" value="1d3a432d4686ef3ae0b4f4b49c9de58c">
                </form>

            </div>

            <div class="v3board v3section v3section_inline bg-default" style="margin-top:5px;">
                <div class="v3title v3title_inner cl-minor" style="padding-top:10px;padding-bottom:10px;">
                    <span class="v3css_icon_title_triangle cl-master"></span>
                    <span>功能介绍</span>
                </div>
                <div class="v3items cl-default bg-default bc-default">
                    <div class="v3item bc-default v3ui v3css_inline cl-minor" style="line-height:180%;font-size:0.9em;">
                        如您的人教点读账号需要更换手机号，为保证您购买的商品个人信息不丢失，请在此更换手机号
                    </div>
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
import { GetValidateCode, SendCaptcha, GetUserinfo, Checkuser } from "@/api/http";

export default {
  name: 'GoCheckuser',
  data () {
    return {
        flag: false,
        cellphone: '',        // 旧手机号
        phoneCode: "",                   // 手机验证码
        phoneCodeText: "获取验证码",      //获取验证码文字
        confirmText: "",                 // 弹出框提示内容
        user_key: "",                    // 安全key（有获取手机验证码的页面加载时调用“获取安全码接口(user_key.json)”来获取）
        access_token: ""                 // 用户token
    }
  },
  mounted() {
      this.getUserinfo();      
  },
  methods: {
        // 获取用户信息接口
        getUserinfo () {

            GetUserinfo({
                access_token: window.access_token
            })
            .then(res=>{
                if(res.errcode != 110){
                    this.flag = true                    
                    this.confirmText = res.errmsg
                    return
                }else{
                    this.cellphone = res.user.mobile
                    // this.cellphone = "18618260673"   //晓东哥的手机号为测试
                }
            })
            .catch(err=>{
                console.log(err)
                alert("系统异常，请刷新重试！")
            })
        },

        // 关闭弹窗
        closeConfirm() {
            this.flag = false
        },
        // 获取安全码（有手机验证码的页面，在加载时需要调用）
        sendPhoneCode() {
            GetValidateCode()
            .then(res=>{
                this.user_key = res.user_key
                this.sendCaptcha()    // 执行-发送短信验证码方法
            })
            .catch(err=>{
                console.log(err)
                alert("系统异常，请刷新重试！")
            })
        },
        // 获取短信验证码
        sendCaptcha() {
            SendCaptcha({
                user_key: this.user_key,
                username: this.cellphone
            },"chg")
            .then(res=>{
                //console.log(res)
                if(res.errcode != 110){
                    this.flag = true
                    this.confirmText = res.errmsg
                    return
                }else{
                    this.countDown()      // 执行-60秒倒计时方法
                }
            })
            .catch(err=>{
                console.log(err)
                alert("系统异常，请刷新重试！")
            })
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
        // 下一步
        nextStep() {
            if(!this.phoneCode){
                this.flag = true
                this.confirmText = "请输入手机验证码！"
                return
            }else{
                Checkuser({
                    access_token: localStorage.getItem("access_token"),
                    captcha: this.phoneCode,
                    username: this.cellphone
                })
                .then(res=>{
                    console.log(access_token)
                    console.log(this.phoneCode)
                    console.log(this.cellphone)
                    console.log(res)
                    if(res.errcode != 110){
                        this.flag = true
                        this.confirmText = res.errmsg
                        return
                    }else{
                        this.$router.push({ name: 'GoChmobile', params: {pep_userid: res.pep_userid}})
                    }
                })
                .catch(err=>{
                    console.log(err)
                    alert("系统异常，请刷新重试！")
                })
            }
        }
  }
}
</script>
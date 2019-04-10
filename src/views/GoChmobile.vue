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
                                <div style="width:100%;height:1px;margin:0 auto;padding:0;overflow:hidden;" class="bg-master"></div>
                            </td>
                            <td width="12%" align="center" style="position: relative">
                                <div style=" width:30px; height:30px; border-radius:15px;" class="bg-master cl-invert">
                                    <span style="height:30px; line-height:30px; display:block; text-align:center;font-weight: bolder">2</span>
                                </div>
                                <div class="cl-master" style="position: absolute;text-align:center;font-size: 12px;width:100%;padding: 2px 0;">
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

            <div class="v3board v3section v3section_inline v3ui_forms" action="/auth/modifypwd" method="POST" id="userForm" style="margin-bottom:20px;">

                <div class="v3items cl-default bg-default bc-default">

                    <div class="v3item bc-default v3ui v3css_inline v3ui_inline_edit" name="username" value="">
                        <div class="v3inline_left">新手机号：</div>
                        <div class="v3inline_middle cl-tip"><input class="v3css_input" type="number" maxlength="11" autocomplete="off" placeholder="更换的手机号" v-model="cellphone"></div>
                    </div>

                    <div class="v3item bc-default v3ui v3css_inline v3ui_inline_edit" name="captcha" value="" id="captcha">
                        <div class="v3inline_left">校验码&nbsp;&nbsp;&nbsp;&nbsp;：</div>
                        <div class="v3inline_middle cl-tip"><input class="v3css_input" type="number" maxlength="20" autocomplete="off" placeholder="手机验证码" v-model="phoneCode"></div>
                        <div class="v3inline_right_block" style="top:10px;z-index: 2">
                            <button class="v3inline_right v3css_button v3css_button_min bg-slave cl-invert" id="send" style="width: 7.2em; padding: 7px 0; outline:none;" ref="btn" @click="sendPhoneCode">{{phoneCodeText}}</button>
                        </div>
                    </div>
                </div>


                <div style="padding: 0 10px;margin-top: 20px;">
                    <div style="margin-top: 20px;" id="checkmobile" align="center" class="v3css_button v3css_button_max bg-master cl-invert" @click="ensure">确定</div>
                </div>

                <form>
                    <input type="hidden" name="user_key" value="b696b84cf7a7a04d938d46bb8822d3cf">
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

    <!-- <div class="v3css_toast bg-dark cl-invert">手机号码已经注册</div> -->

  </div>
</template>

<script>
import { GetValidateCode, SendCaptcha, Chmobile } from "@/api/http";

export default {
  name: 'GoChmobile',
  data () {
    return {
      flag: false,
      cellphone: "",    // 新手机号
      phoneCode: "",    // 手机验证码
      phoneCodeText: "获取验证码",      //获取验证码文字
      confirmText: "",  // 弹出框提示内容
      user_key: "",     // 安全key（有获取手机验证码的页面加载时调用“获取安全码接口(user_key.json)”来获取）
    }
  },
  methods: {
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

        // 验证手机号
        if(!this.cellphone){
          this.flag = true
          this.confirmText = "请输入正确的手机号！"
          return
        }else if(this.cellphone.length !== 11){
          this.flag = true
          this.confirmText = "请输入正确的手机号！"
          return
        }else{
          SendCaptcha({
            pep_userid: this.$route.params.pep_userid,
            user_key: this.user_key,
            username: this.cellphone
          },"reg")
          .then(res=>{
              // console.log(this.user_key)
              // console.log(this.cellphone)
              console.log(res)
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
    // 确定按钮
    ensure() {

        // 验证手机号
        if(!this.cellphone){
          this.flag = true
          this.confirmText = "请输入正确的手机号！"
          return
        }else if(this.cellphone.length !== 11){
          this.flag = true
          this.confirmText = "请输入正确的手机号！"
          return
        }else if(!this.phoneCode){
            this.flag = true
            this.confirmText = "请输入手机验证码！"
            return
        }else{
            Chmobile({
                access_token: window.access_token,
                captcha: this.phoneCode,
                username: this.cellphone
            })
            .then(res=>{
                console.log(this.phoneCode)
                console.log(this.cellphone)
                console.log(res.data)
                if(res.errcode != 110){
                    this.flag = true
                    this.confirmText = res.errmsg
                    return
                }else{
                    this.$router.push({ name: 'Chmobile'})
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

<style scoped>
.v3inline_middle.cl-tip {
    width: calc(100% - 80px);
}
</style>
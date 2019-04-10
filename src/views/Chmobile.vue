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
                                <div style="width:100%;height:1px;margin:0 auto;padding:0;overflow:hidden;" class="bg-tip bg-master"></div>
                            </td>
                            <td width="12%" align="center" style="position: relative">
                                <div style=" width:30px; height:30px; border-radius:15px;" class="bg-tip cl-invert bg-master">
                                    <span style="height:30px; line-height:30px; display:block; text-align:center" class="v3css_icon_ok"></span>
                                </div>
                                <div class="cl-tip cl-master" style="position: absolute;text-align:center;font-size: 12px;width:100%;padding: 2px 0">
                                    	修改成功
                                </div>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="v3board v3section v3section_inline bg-default" style="margin-top:5px; text-align:center;">
                <div class="v3title v3title_inner cl-minor" style="padding-top:10px;padding-bottom:10px;">
                    <span class="cl-master"></span>
                    <span>密码修改成功</span>
                </div>
                <div class="v3items cl-default bg-default bc-default" style=" padding-bottom:10px;">
                    <router-link :to="{name:'Loginpage'}" class="cl-master">点击重新登录</router-link>
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
const qs = require('qs')
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
        this.$axios.post('user/user_key.json')
        .then(res=>{
            this.user_key = res.data.user_key
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
          var data = qs.stringify({
              user_key: this.user_key,
              username: this.cellphone
          })
          this.$axios.post('user/reg/sendcaptcha.json',data)
          .then(res=>{
              // console.log(this.user_key)
              // console.log(this.cellphone)
              console.log(res.data)
              if(res.data.errcode != 110){
                  this.flag = true
                  this.confirmText = res.data.errmsg
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
            var data = qs.stringify({
                captcha: this.phoneCode,
                username: this.cellphone
            })
            this.$axios.post('user/'+this.platform_key+'/'+window.user_id+'/chmobile.json',data)
            .then(res=>{
                console.log(this.phoneCode)
                console.log(this.cellphone)
                console.log(res.data)
                if(res.data.errcode != 110){
                    this.flag = true
                    this.confirmText = res.data.errmsg
                    return
                }else{
                    this.$router.push({ name: 'chmobile'})
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
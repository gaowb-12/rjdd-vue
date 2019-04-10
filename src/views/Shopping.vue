<template>
    <div class="invite">
        <!-- invite_head -->
        <div class="invite_head"><img src="../assets/images/shopping_head.png" alt="狂欢购物节"></div>
        <div class="invite_panel shop_panel">
            <div class="rjdd_icon"><img src="../assets/images/icon_shadow.png" alt=""></div>
            <div class="shop_word">
                <img src="../assets/images/shopping_word.png" alt="">
            </div>
            <!-- 优惠券 -->
            <div class="coupon">
                <img v-if="shareSucces" class="received_ico" src="../assets/images/received_ico.png" alt="">
                <img src="../assets/images/shopping_25.png" alt="" >
            </div>
            <!-- 注册 -->
            <ul class="inviteReg" v-if="regSucces">
                <li><input type="tel" placeholder="请输入手机号" maxlength="11" v-model="cellphone" /></li>
                <li>
                    <input type="number" placeholder="请输入验证码" v-model="phoneCode" />
                    <span v-if="spanYellow" ref="btn" @click="removeEvent && sendPhoneCode()">{{phoneCodeText}}</span>
                    <span v-if="spanGray" class="gray_span">点击获取验证码</span>
                </li>
                <!-- <li><input v-model="password" type="password" maxlength="20" placeholder="设定6~20位注册密码" /></li> -->
            </ul>

            <!-- 领取成功 -->
            <ul class="receive" v-if="shareSucces" style="position:absolute; left:50%; top:50%; transform: translate(-50%, -50%); z-index: 9; background: #fff; border-radius: 20px; padding: 20px; width: 70%;">
                <li style="font-size: .3rem; color: #444;">全品类优惠券<br>已经放入您的账户</li>
                <div class="share">
                    <span style="background: #db1c7e;" @click="handleShare">
                        <!-- <a href="http://app.mypep.cn/diandu"></a> -->
                        立刻花掉！                        
                    </span>
                </div>
            </ul>

            <div class="share shop_receive" @click="handleSubmit" v-if="regSucces"><span>免费领取</span></div>            

        </div>
        <!-- 错误提示 -->
        <span class="tip" @click="closeConfirm" v-if="flag">{{confirmText}}</span>

        <!-- 已注册 -->
        <div class="mask" v-if="mask" @click="closeConfirm"></div>
        <dl class="reged" v-if="geted">
            <dt>您已经领过券了<br>不能重复领取</dt>
            <dd style="background: #db1c7e;" @click="handleShare">立刻去花掉！</dd>
        </dl>

        <!-- 浏览器打开弹出层 -->
        <div class="share_layer" v-if="browserOpen" @click="closeLayer">
            <img src="../assets/images/share_layer.png" alt="人教点读">
        </div>
    </div>
</template>

<script>
import { GetValidateCode, GetYzMa, GetCoupons } from "@/api/http";
export default {
    name: "Shopping",
    data(){
        return {
            mask: false,
            flag: false,
            removeEvent: true,
            spanGray: true,
            spanYellow: false,
            shareSucces: false,
            regSucces: true,
            geted: false,
            coupons: {},
            cellphone: "",    // 手机号
            phoneCode: "",    // 手机验证码
            password: "",
            phoneCodeText: "点击获取验证码",      //获取验证码文字
            confirmText: "",  // 弹出框提示内容
            user_key: "",     // 安全key（有获取手机验证码的页面加载时调用“获取安全码接口(user_key.json)”来获取）            
            key: "",
            browserOpen: false,
        }
    },
    watch: {
        cellphone(val) {
            this.cellphone = val;
            if(val.length == 11) {
                this.spanGray = false;
                this.spanYellow = true;
            }else{
                this.spanGray = true;
                this.spanYellow = false;
            }
        }
    },
    mounted() {
        //友盟统计
        var cnzz_s_tag = document.createElement('script');
        cnzz_s_tag.type = 'text/javascript';
        cnzz_s_tag.async = true;
        cnzz_s_tag.charset = 'utf-8';
        cnzz_s_tag.src = 'https://s23.cnzz.com/z_stat.php?id=1275290672&async=1';
        var root_s = document.getElementsByTagName('script')[0];
        root_s.parentNode.insertBefore(cnzz_s_tag, root_s);
    },
    methods: {
        handleSubmit() {
            // 验证手机号
            if(!this.cellphone){
                this.flag = true
                setTimeout(()=> this.flag = false,2000)
                this.confirmText = "请输入正确的手机号！"
                return
            }else if(this.cellphone.length !== 11){
                this.flag = true
                setTimeout(()=> this.flag = false,2000)
                this.confirmText = "请输入正确的手机号！"
                return
            }
            // 手机验证码
            if(!this.phoneCode){
                this.flag = true
                setTimeout(()=> this.flag = false,2000)
                this.confirmText = "请输入手机验证码！"
                return
            }else{
                GetCoupons({
                    captcha: this.phoneCode,
                    channel: this.$route.params.channel,
                    mobile: this.cellphone,
                    promotion_id: "20181111_" + this.$route.params.channel,
                })
                .then(res => {
                    console.log(res)
                    if(res.errcode == 110){
                        // this.regSucces = false
                        this.mask = true
                        this.shareSucces = true
                        this.geted = false;

                        // this.$router.push({ path: '/loginpage'})
                    }else if(res.errcode == 500421){
                        // this.mask = true
                    }else if(res.errcode == 500441){
                        this.mask = true;
                        this.geted = true;
                        this.shareSucces = false;
                    }
                    else{
                        this.flag = true
                        this.confirmText = res.errmsg
                        setTimeout(()=> this.flag = false,2000)
                        return
                    }
                })
                .catch(err => {
                    //console.log(err)
                    alert("系统异常，请刷新重试！")
                })
            }
        },
        // 关闭弹窗
        closeConfirm() {
            this.flag = this.mask = false;
            this.shareSucces = false;
            this.geted = false;
        },
        // 获取安全码（有手机验证码的页面，在加载时需要调用）
        sendPhoneCode() {
            // 验证手机号
            if(!this.cellphone){
                this.flag = true
                setTimeout(()=> this.flag = false,2000)
                this.confirmText = "请输入正确的手机号！"
                return
            }else if(this.cellphone.length !== 11){
                this.flag = true
                setTimeout(()=> this.flag = false,2000)
                this.confirmText = "请输入正确的手机号！"
                return
            }else{
                GetValidateCode()
                .then(res=>{
                    console.log(res)
                    this.user_key = res.user_key
                    this.GetYzMa()    // 执行-发送短信验证码方法
                    //this.countDown()      // 执行-60秒倒计时方法
                })
                .catch(err=>{
                    console.log(err)
                    alert("系统异常，请刷新重试！")
                })
            }
        },
        // 发送短信验证码
        GetYzMa() {
            GetYzMa({
                mobile: this.cellphone,
                user_key: this.user_key
            })
            .then(res=>{
                // console.log(this.user_key)
                // console.log(this.cellphone)
                console.log(res)
                if(res.errcode == 110) {
                    this.removeEvent = false // 控制60秒内不可点击
                    this.countDown()      // 执行-60秒倒计时方法
                }else if(res.errcode == 500421){
                    this.mask = true
                }else{
                    this.flag = true
                    setTimeout(()=> this.flag = false,2000)
                    this.confirmText = res.errmsg
                    return
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
                this.phoneCodeText= "验证码已发送(" + minute + "秒)"
                if(minute <= 0){
                    clearInterval(timer);
                    this.removeEvent = true     // 控制60秒后再可点击
                    this.$refs.btn.removeAttribute("disabled");
                    this.phoneCodeText = "点击获取验证码"
                }
            },1000)
        },
        handleShare(){
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(isiOS){
                window.location.href = "http://app.mypep.cn/diandu";
            }
            if(isAndroid){
                var ua = window.navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){  // 判断不是微信浏览器
                    this.browserOpen = true;
                }else{
                    this.browserOpen = false;
                    window.location.href="https://rjddresw.mypep.cn/rjdianduclient/pep/renjiaoapp-pep-release.apk";
                }
            }
        },
        closeLayer(){
            this.browserOpen = false;
        }
    }
    
}
</script>
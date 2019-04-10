<template>
    <div class="invite">
        <!-- invite_head -->
        <div class="invite_head"><img src="../assets/images/invite_h5_head.jpg" alt="邀请好友赢福利"></div>
        <div class="invite_panel" style="top: -1.4rem; padding: .6rem;">
            <h3 v-if="regSucces">
                <img v-if="head_image" :src="head_image" :alt="user_name">
                <img v-else src="../assets/images/boy0.jpg" :alt="user_name">
                <span>{{user_name}}</span><br> 邀请您注册人教点读<br>活动期间受到邀请成功注册即可获得
            </h3>
            <!-- 优惠券 -->
            <div class="coupon">
                <img v-if="shareSucces" class="received_ico" src="../assets/images/received_ico.png" alt="">
                <img src="../assets/images/coupon_25.png" alt="" >
            </div>
            <!-- 注册 -->
            <ul class="inviteReg" v-if="regSucces">
                <li><input type="tel" placeholder="请输入手机号" maxlength="11" v-model="cellphone" /></li>
                <li>
                    <input type="number" placeholder="请输入验证码" v-model="phoneCode" />
                    <span v-if="spanYellow" ref="btn" @click="removeEvent && sendPhoneCode()">{{phoneCodeText}}</span>
                    <span v-if="spanGray" class="gray_span">点击获取验证码</span>
                </li>
                <li><input v-model="password" type="password" maxlength="20" placeholder="设定6~20位注册密码" /></li>
            </ul>

            <!-- 领取成功 -->
            <ul class="receive" v-if="shareSucces">
                <li>领取成功！</li>
                <li>一张价值 <span>&yen;{{coupons.value}}</span> 的优惠券已经自动存入<br>您的人教点读{{cellphone | oldCellphone}}账户中</li>
                <li>使用期限：{{coupons.validity}}</li>
            </ul>

            <div class="share" @click="handleSubmit" v-if="regSucces"><span>领取福利</span></div>
            <div class="share" v-if="shareSucces">
                <span @click="handleShare">
                    立即下载客户端使用
                </span>
            </div>

        </div>
        <!-- 错误提示 -->
        <span class="tip" @click="closeConfirm" v-if="flag">{{confirmText}}</span>

        <!-- 已注册 -->
        <div class="mask" v-if="mask" @click="closeConfirm"></div>
        <dl class="reged" v-if="mask">
            <dt>亲，您已经注册过人教点读啦~<br>可直接参加分享赢福利活动哦！</dt>
            <!-- <dd><a href="rjdd://share">去分享</a></dd> -->
            <!-- 
            <dd>
                <router-link :to="{name:'InviteShare'}" target="_blank">
                    去分享
                </router-link>
            </dd>
            -->
            <dd @click="handleShare">去分享</dd>
        </dl>

        <!-- 浏览器打开弹出层 -->
        <div class="share_layer" v-if="browserOpen" @click="closeLayer">
            <img src="../assets/images/share_layer.png" alt="人教点读">
        </div>
    </div>
</template>

<script>
import { GetValidateCode, SendCaptcha, Reg, GetLAXINUserinfo, GetToken } from "@/api/http";
export default {
    name: "InviteReg",
    data(){
        return {
            mask: false,
            flag: false,
            removeEvent: true,
            spanGray: true,
            spanYellow: false,
            shareSucces: false,
            regSucces: true,
            coupons: {},
            user_name: null,
            head_image: null,
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
        this.user_name = this.$route.query.user_name
        this.head_image = this.$route.query.head_image
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
            }
            // 验证密码
            if(!this.password){
                this.flag = true
                setTimeout(()=> this.flag = false,2000)
                this.confirmText = "请输入密码！"
                return
            }else if(this.password.length < 6 || this.password.length > 20){
                this.flag = true
                setTimeout(()=> this.flag = false,2000)
                this.confirmText = "请输入6~20位注册密码！"
                return
            }else{
                Reg({
                    captcha: this.phoneCode,
                    channel_id: "pep",
                    promotion_id: "LAXIN",
                    pwd: this.password,
                    recommend_userid: this.$route.query.user_id,
                    username: this.cellphone,
                })
                .then(res => {
                    console.log(res)
                    if(res.errcode == 110){
                        this.regSucces = false
                        this.shareSucces = true
                        this.coupons = res.coupons

                        // this.$router.push({ path: '/loginpage'})
                    }else if(res.errcode == 500421){
                        this.mask = true
                    }else{
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
            this.flag = this.mask = false
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
                    this.sendCaptcha()    // 执行-发送短信验证码方法
                    //this.countDown()      // 执行-60秒倒计时方法
                })
                .catch(err=>{
                    console.log(err)
                    alert("系统异常，请刷新重试！")
                })
            }
        },
        // 发送短信验证码
        sendCaptcha() {
            SendCaptcha({
                user_key: this.user_key,
                username: this.cellphone
            },"reg")
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
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端\
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
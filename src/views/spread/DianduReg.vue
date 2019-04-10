<template>
    <div class="spread_content invite">
		<div class="ba_1">
			<img src="../../assets/imgs/xuanchuan.png" alt="人教点读">	
		</div>
		<div class="ba_2" v-if="regSucces">
			<p>
				<input type="tel" class="inp" placeholder="手机号" maxlength="11" v-model="cellphone">
			</p>
			<p>
				<a href="javascript:;" class="inp">
					<input type="number" class="inp_yzm" placeholder="验证码" v-model="phoneCode">
					<span v-show="spanYellow" ref="btn" @click="removeEvent && sendPhoneCode()">{{phoneCodeText}}</span>
					<span v-if="spanGray" class="gray_span">获取验证码</span>
				</a>
			</p>
			<p>
				<input type="password" class="inp" v-model="password" maxlength="20" placeholder="设定6~20位注册密码">
			</p>
			<p>
				<a class="receive" @click="handleSubmit">免费领取</a>
			</p>
			<p>
				<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.pep.diandu" class="lianjie">下载人教点读APP开始学习</a>
			</p>
		</div>

		<div class="invite_panel" v-if="shareSucces">
			<!-- 领取成功 -->
            <ul class="receive" style="height:auto;">
                <li>领取成功！</li>
                <li>一张价值 <span>&yen;{{coupons.value}}</span> 的优惠券已经自动存入<br>您的人教点读{{cellphone | oldCellphone}}账户中</li>
                <li>使用期限：{{coupons.validity}}</li>
            </ul>

            <div class="share"><span><a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.pep.diandu">立即下载客户端使用</a></span></div>
		</div>

		<div class="ba_3">
			<img src="../../assets/imgs/process.png" alt="人教点读" />
		</div>
		<div class="ba_4">
			<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.pep.diandu" class="ba_xiazai"></a>
		</div>
		<!-- 错误提示 -->
        <span class="tip" @click="closeConfirm" v-if="flag">{{confirmText}}</span>
		<!-- 已注册 -->
        <div class="mask" v-if="mask" @click="closeConfirm"></div>
        <dl class="reged" v-if="mask">
            <dt>亲，您已经注册过人教点读啦~<br>可直接参加分享赢福利活动哦！</dt>
            <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.pep.diandu">
                <dd>去分享</dd>
            </a>
        </dl>
	</div>
</template>
<script>
import { GetValidateCode, SendCaptcha, Reg, GetLAXINUserinfo, GetToken } from "@/api/http";
export default {
    data(){
		return{
			mask: false,
			flag: false,
			removeEvent: true,
			spanGray: true,
			spanYellow: false,
			shareSucces: false,
			regSucces: true,
			coupons: {},
			cellphone: "",    // 手机号
			phoneCode: "",    // 手机验证码
			password: "",
			removeEvent: true,
			confirmText: "",  // 弹出框提示内容
			phoneCodeText: "点击获取验证码",      //获取验证码文字
			user_key: "",     // 安全key（有获取手机验证码的页面加载时调用“获取安全码接口(user_key.json)”来获取） 
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
	methods:{
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
                    // this.countDown()      // 执行-60秒倒计时方法
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
	}
}
</script>
<style scoped>
.spread_content {
	background: url(../../assets/imgs/square.png);
}
img{
	width: 100%;
	vertical-align:top;
}
.ba_2{
	text-align: center;
	margin-top: .15rem;
}
.ba_3 {
    padding-bottom: 1rem;
}
.ba_4{
	position: fixed;
	bottom: 0;
	left: 0;
	background: #fff;
	width: 100%;
}
.ba_4 .ba_xiazai{
	display: block;
	background: url(../../assets/imgs/link.png) no-repeat center center;
	background-size: 100% 100%;
	width: 100%;
	height: 1.2rem;
}
.clickcoll{
	width: 4.7rem;
	height: .8rem;
	display: block;
	margin-left: 50%;
	transform: translate(-50%);
}
.inp{
	width: 4.66rem;
	height: .72rem;
	outline: none;
	border-radius: 10px;
	-webkit-appearance: none;
	border: 1px solid #bbbbbb;
	display: block;
	margin-top: .25rem;
	margin-left: 50%;
	transform: translate(-50%);
	text-align: center;
	color: #bbbbbb;
}
a.inp{
	border:none;
	/* text-align: left; */
}
.inp_yzm {
	width: 48%;
	height: 100%;
	outline: none;
	border-radius: 10px;
	-webkit-appearance: none;
	border: 1px solid #bbbbbb;
	float: left;
	/* display: block;
	margin-top: .25rem;
	margin-left: 50%;
	transform: translate(-50%); */
	text-align: center;
	color: #bbbbbb;
}
a.inp span{
	float: right;
	width: 48%;
	height: 100%;
	text-align: center;
	line-height: 0.72rem;
	border-radius: 10px;
	color:#fff;
	background: #ef7030;
}
a.inp span.gray_span {
	background: #b8b3b0;
}
::-webkit-input-placeholder{
	text-align: center;
	color: #bbbbbb;
	font-weight: bold;
}
.lianjie{
	display: block;
	color: #444444;
	margin-top: .25rem;
	font-size: .28rem;
	font-weight: bold;
}
.receive{
	display: block;
	text-decoration: none;
	color: #444444;
	background: #ffe100;
	width: 4.66rem;
	height: .72rem;
	border-radius: 10px;
	font-size: .28rem;
	text-align: center;
	line-height: .75rem;
	font-weight: bold;
	margin-top: .25rem;
	margin-left: 50%;
	transform: translate(-50%);
}
@media screen and (min-width: 1023px) {
	::-webkit-input-placeholder{
		font-size: 24px;
	}
	.ba_4{
		position: fixed;
		bottom: 0;
		left: 50%;
		background: #fff;
		width: 750px;
		height: 120px;
		transform: translateX(-50%);
	}
	.ba_4 .ba_xiazai{
		width: 750px;
		height: 120px;
		bottom: 0;
	}
}
</style>



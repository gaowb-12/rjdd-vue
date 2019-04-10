<template>
    <div class="spread_content">
		<div class="ba_1">
			<!-- <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.pep.diandu">
				<img src="../assets/images/aid_01.png" alt="人教点读">
			</a> -->
			<img @click="handleShare" src="../assets/images/aid_01.png" alt="人教点读">
			<img src="../assets/images/aid_02.png" alt="人教点读">
		</div>
		<div class="ba_4" @click="handleShare">
			<!-- <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.pep.diandu" class="ba_xiazai"></a> -->
		</div>

		<!-- 浏览器打开弹出层 -->
        <div class="share_layer" v-if="browserOpen" @click="closeLayer">
            <img src="../assets/images/share_layer.png" alt="人教点读">
        </div>
    </div>
</template>
<script>
export default {
	data(){
		return {
			browserOpen: false,
		}
	},
    methods: {
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
<style scoped>
.spread_content {
	background: url(../assets/imgs/square.png);
}
img{
	width: 100%;
	vertical-align:top;
}
.ba_1 {
	margin-bottom: 1.2rem;
}
.ba_4{
	position: fixed;
	bottom: 0;
	left: 0;
	height: 1.2rem;
	background: #fff;
	width: 100%;
	background: url(../assets/images/aid_03.png) no-repeat center center;
	background-size: 100% 100%;
}
.ba_4 .ba_xiazai{
	display: block;
	background: url(../assets/images/aid_03.png) no-repeat center center;
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
	border: 1px solid #bbbbbb;
	display: block;
	margin-top: .25rem;
	margin-left: 50%;
	transform: translate(-50%);
	text-align: center;
	color: #bbbbbb;
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



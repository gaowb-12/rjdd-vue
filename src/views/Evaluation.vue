<template>
    <div>
        <div class=""></div>
        <div class="diand_top">
            <!-- <a href="http://app.mypep.cn/diandu" target="_blank">
                <img src="../assets/images/top.png" alt="" class="diand_topimg">
            </a> -->
            <img @click="handleShare" src="../assets/images/top.png" alt="" class="diand_topimg">
        </div>
        <div class="diand_foot">
            
            <img v-if="userInfo.photo" :src="userInfo.photo" alt="" class="diand_toux" :onerror="defaultImg">
            <img v-else src="../assets/images/boy0.jpg" alt="" class="diand_toux">
            
            <div class="diand_center">
                <div class="diand_centop">
                    <p class="henson">{{userInfo.userName}}</p>
                    <p class="fenshu">{{base.score == -1 ? 0 : Math.round(base.score)}}<span>分</span></p>
                </div>
                <div class="dd_footcenx">
                    <h1>{{base.chapterName}}</h1>
                    <p>{{base.bookName}}·第{{base.str_page}}页</p>
                    <ul>
                        <li v-for="(item,index) in list" :key="index" :id="'li'+index">
                            <span class="dd_lispans">{{index + 1}}.{{item.text}}</span>
                            
                            <span v-if="item.score == -1" class="dd_lispanz">未评测</span>
                            <span v-else class="dd_lispanz">本句得分{{Math.round(item.score)}}</span>

                            <span v-if="item.score == -1"></span>
                            <span v-else class="dd_lispone" 
                                :class="{active: index == current}"
                                :test="'https://rjddres.mypep.cn/res_promotion/0'+(index+1)+'.mp3'" 
                                :mp3="'https://rjdduploadw.mypep.cn/'+item.e_path"
                                @click="playAudio($event,index)">
                            </span>
                        </li>
                    </ul>
                </div>
            </div>        
        </div>
        <!-- 浏览器打开弹出层 -->
        <div class="share_layer" v-if="browserOpen" @click="closeLayer">
            <img src="../assets/images/share_layer.png" alt="人教点读">
        </div>
        <div class="diand_divbtn">
            <p class="diand_btn">
                <!-- <a href="http://app.mypep.cn/diandu" target="_blank">我也要朗读</a> -->
                <span @click="handleShare">我也要朗读</span>
            </p>
        </div>
    </div>
</template>

<script>
import * as http from "@/api/http"
export default {
    name: "Invite",
    data(){
        return {
            current: null,
            flag: false,
            user_id: this.$route.params.user_id,
            group_id: this.$route.params.group_id,
            base: {},
            list: [],
            userInfo: {},
            audio:null,
            paused:"",
            browserOpen: false,
            defaultImg: 'this.showPage=true;this.src="' + require('../assets/images/gray.png') + '"',
        }
    },
    beforeCreate() {
        document.querySelector('body').setAttribute('style', 'background: #0295b4');
    },
    created() {
        const user_id = this.user_id
        const groupId = this.group_id
        http.Evaluation(user_id,groupId)
        .then( res => {
            this.base = res.base;
            this.list = res.list;
            this.userInfo = res.userInfo;
        })
        .catch( err => {
            console.log(err);
			alert("系统异常，请刷新重试！");
        })
    },
    methods: {
        playAudio($event,index){
            console.log(event)
            // this.isActive = !this.isActive;
            this.current = index;

            if(!this.audio){
                this.audio=document.createElement("audio");
                this.audio.src=event.target.getAttribute("mp3");
                this.paused=event.target.getAttribute("mp3");
                document.body.appendChild(this.audio)
                this.audio.play();                
                this.audio.onended=()=>{
                    this.paused=""
                    this.current = null;
                }
            }else{
                if(this.audio.src==event.target.getAttribute("mp3")){
                    if(this.audio.paused){
                        this.paused=event.target.getAttribute("mp3");
                        setTimeout(()=>{
                            this.audio.play()
                            this.current = index;
                        },10)
                    }else{
                        this.paused=""
                        this.audio.pause()
                        this.current = null;
                    }
                }else{
                    this.audio.src=event.target.getAttribute("mp3");
                    this.paused=event.target.getAttribute("mp3");
                    this.audio.play();
                    this.current = index;
                }
            }
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

<style scoped>
.diand_top{
    width: 100%;
    top: 0;
    left: 0;
    z-index: 9;
    position: fixed; 
    cursor: pointer;
}
.diand_topimg{
    width: 100%;    
    display: block;
}
.diand_toux{
    width: 1.8rem;
    height: 1.8rem;
    border: .04rem solid #ffffff;
    border-radius: 50%;
    position: absolute;
    top: 1.3rem;
    left: 50%;
    transform: translate(-50%);
    z-index: 8;
}
.diand_center{
    width: 90%;
    margin-left: 5%;
    margin-top: 1.9rem;
    margin-bottom: 1.3rem;
    border-radius: .4rem;
    overflow: hidden;
}
.diand_centop{
    height: 3.2rem;
    background:url(../assets/images/bj.png) no-repeat;
}
.henson{
    width: 100%;
    text-align: center;
    padding-top: 1.4rem;
    color: #ffffff;
    font-size: .28rem;
    font-weight: bold;
    text-transform: capitalize;
}
.fenshu {
    padding-top: .2rem;
    text-align: center;
    color: #ffffff;
    font-size: .7rem;
    width: 100%;
}
.fenshu span {
    font-size: .32rem;
}
.dd_footcenx{     
    overflow: hidden;
    background: #ecf7f8;
}
.dd_footcenx h1{
    font-size: .36rem;    
    text-align: center;
    margin-top: .27rem;
}
.dd_footcenx p{
    font-size: .26rem;
    text-align: center;
    margin-top: .2rem;
    color: #999999;
}
.dd_footcenx ul{
    margin-top: .2rem;
}
.dd_footcenx ul li{
    width: 90%;
    list-style: none;
    margin-left: .2rem;
    position: relative;
    border-top: 1px solid #ccc;
}
.dd_lispans{
    font-size: .3rem;
    font-weight: inherit;
    display: block;
    width: 90%;
    line-height: 180%;
    margin-top: .2rem;
    word-wrap: break-word;
}
.dd_lispanz{
    font-size: .26rem;
    font-weight: inherit;
    color: #fc9d52;
    margin-left: .25rem;
    display: block;
    padding: .2rem 0;
}
.dd_lispone {
    top: 50%;    
    right: 0;    
    display: block;
    position: absolute;
    transform: translateY(-50%);
    width: .6rem;
    height: .6rem;
    background: url(../assets/images/sound_1.png) no-repeat;
    background-size: 100% 100%;
}
.dd_lispone.active {
    width: .6rem;
    height: .6rem;
    background: url(../assets/images/sound_2.png) no-repeat;
    background-size: 100% 100%;
}
.dd_lispone img {
    width: .6rem;
}
.diand_divbtn{
    left: 5%;
    position: fixed;
    bottom: .2rem;
    width: 90%;
    height: .88rem;
    background: #27d6a7;        
    border-radius: .2rem;
}
.diand_btn a, .diand_btn span {
    display: block;
    font-size: .28rem;
    color: #ffffff;
    text-align: center;
    line-height: .88rem;
    cursor: pointer;
    text-decoration : none;
}
@media screen and (min-width:1024px) {
    .diand_topimg{
        width: 750px;
        display: block;
        margin: 0 auto;
    }
    .diand_divbtn {
        left: auto;
        width: 750px;
    }
}
</style>
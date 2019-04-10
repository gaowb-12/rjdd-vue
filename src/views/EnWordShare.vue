<template>
    <div class="en_word_share">
        <flexbox class="word_share_user">
            <flexbox-item :span="3">
                <img :src="head_image" :alt="nickname" :onerror="defaultImg">
            </flexbox-item>
            <flexbox-item>
                <p>我是{{nickname}}，</p>
                <p>我在人教点读学单词：</p>
                <p>单词听写、单词拼写多维掌握</p>
                <p>先学习再测试，掌握知识更牢固</p>
            </flexbox-item>
        </flexbox>
        
        <!-- 单词滚动条区域 -->
        <div class="word_move" ref="word_move" :style="{ height: wordMoveH + 'px' }">
            <flexbox class="unit">
                <flexbox-item><span>{{catalog_name}}</span><br>单词量：{{count_total}}</flexbox-item>
            </flexbox>

            <flexbox class="word" v-for="(item,index) in words" :key="item.word">
                <flexbox-item><span>{{item.word}}</span><br>{{item.interpretation}}</flexbox-item>
                <flexbox-item 
                    :span="2" 
                    :class="{en_playing: index == current}"
                    align="right" 
                    :mp3="item.mp3" 
                    @click.native="playAudio($event,index)"
                >
                </flexbox-item>
            </flexbox>
        </div>

        <!-- mp3 -->
        <audio :src="mp3Url" ref="player"></audio>

        <!-- 浏览器打开弹出层 -->
        <div class="share_layer" v-if="browserOpen" @click="closeLayer">
            <img src="../assets/images/share_layer.png" alt="人教点读">
        </div>

        <!-- 下载条 -->
        <div class="down_bar" ref="down_bar">
            <!-- 听写单词 -->
            <span @click="playContinuity">单词听写</span>

            <img @click="handleShare" src="../assets/images/down_bar.png" alt="人教点读">
        </div>
    </div>    
</template>
<script>
import { Flexbox, FlexboxItem } from "vux";
import { EnWordShare, GetUserinfo } from "@/api/http";

export default {
    components: {
        Flexbox,
        FlexboxItem
    },
    data(){
        return {
            current: null,
            audio:null,
            audio2: null,
            paused:"",
            
            mp3Continuity: [],  // 连续播放mp3存放数组

            wordMoveH: 500,
            words: [],
            catalog_name: null,
            count_total: 0,
            nickname: null,
            head_image: null,
            mp3Url: "",
            browserOpen: false,
            defaultImg: 'this.showPage=true;this.src="' + require('../assets/images/boy0.jpg') + '"',
        }
    },
    created(){
        const data = {
            access_token: window.access_token
        }
        EnWordShare(data, this.$route.params.catalogid)
        .then(res => {
            this.words = res.words;
            this.catalog_name = res.catalog_name;
            this.count_total = res.count_total;

            for(let i=0; i<res.words.length; i++){
                this.mp3Continuity.push(res.words[i].mp3);
            }
            // console.log(this.mp3Continuity)

        })
        .catch(err => {
            console.log(err);
        })

        // 获取用户信息
        /*
        GetUserinfo({
            access_token:localStorage.getItem("access_token")
        })
        .then((res)=>{
            if(res.user.nickname){
                this.nickname = res.user.nickname;
            }else if(res.user.mobile){
                this.nickname = res.user.mobile;
            }else{
                this.nickname = res.user.user_id;
            }
            
            this.head_image = res.user.head_image;
        })
        .catch((err)=>{
            console.log(err);
        });
        */

        this.nickname = this.$route.params.nick_name;
        if(this.$route.params.head_image){
            this.head_image = this.$route.params.head_image;
        }else{
            this.head_image = "../assets/images/boy0.jpg";
        }

    },
    mounted() {
        var windowH = window.screen.height;
        // console.log(windowH);
        // this.wordMoveH = windowH - 230 - this.$refs.down_bar.offsetHeight
        this.wordMoveH = this.$refs.down_bar.offsetTop - 147;
        // console.log(this.$refs.down_bar.offsetTop)
        // console.log(this.wordMoveH)
    },
    methods: {
        // 单独听
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
                    this.audio.pause();
                    // document.body.removeChild(this.audio)
                }
            }else{
                if(this.audio.src==event.target.getAttribute("mp3")){
                    if(this.audio.paused){
                        this.paused=event.target.getAttribute("mp3");
                        setTimeout(()=>{
                            this.audio.play();
                            this.audio2.pause();
                            this.current = index;
                        },10)
                    }else{
                        this.paused="";
                        this.audio.pause();
                        this.current = null;
                    }
                }else{
                    this.audio.src=event.target.getAttribute("mp3");
                    this.paused=event.target.getAttribute("mp3");
                    this.audio.play();
                    this.audio2.pause();
                    this.current = index;
                }
            }
        },
        // 单词听写（连续播放）
        playContinuity(){
            let num = 0;            
            if(!this.audio2){
                this.audio2=document.createElement("audio");
                this.audio2.src=this.mp3Continuity[num];
                this.current = num;
                // this.paused=event.target.getAttribute("mp3");
                document.body.appendChild(this.audio2)
                this.audio2.play();
                this.audio.pause();
                this.audio2.onended=()=>{
                    num++;
                    console.log(this.mp3Continuity.length)
                    console.log(num+'结束') 
                    this.audio2.src=this.mp3Continuity[num];
                    this.audio2.play();
                    this.audio.pause();
                    if(num >= this.mp3Continuity.length - 1) {
                        num = this.mp3Continuity.length - 1;
                    }
                    this.paused=""
                    this.current = num;
                }
            }else{
                this.audio2.src=this.mp3Continuity[num];
                this.current = num;
                this.paused=event.target.getAttribute("mp3");
                this.audio2.play();
                this.audio.pause();
                this.audio2.onended=()=>{
                    num++;
                    console.log(this.mp3Continuity.length)
                    console.log(num+'结束') 
                    this.audio2.src=this.mp3Continuity[num];
                    this.audio2.play();
                    this.audio.pause();
                    if(num >= this.mp3Continuity.length - 1) {
                        num = this.mp3Continuity.length - 1;
                    }
                    // this.paused=""
                    this.current = num;
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



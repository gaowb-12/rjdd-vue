<template>
    <div class="bg-read">
        <div class="adver-img">
            <!-- <img src="../assets/images/read_banner.png" alt=""> -->
            <img :src="banner_url" :onerror="defaultImg" alt="央视主持人课文朗读">
        </div>
        <div class="content">
            <div class="tab">
                <button class="button" :class="{active:!active}" @click="tab(false)">简介</button>
                <button class="button" :class="{active:active}"  @click="tab(true)">音频</button>
            </div>
            <div class="tab-con">
                <div class="tab-con-item">
                    <!-- 简介 -->
                    <div class="abstract" v-if="!active">
                    　　<p>“中小学语文示范诵读库”是中央广播电视总台和教育部合作的一项公益项目，该项目已被列入《国家语言文字事业“十三五”发展规划》。</p>
                        <p>该项目发挥了中央广播电视总台播音员主持人的专业优势，再加上顶尖的音频制作团队，
                        在创作上精益求精、在声音品质和呈现方式上努力创新，使每件作品达到最佳传播效果。
                        该项目使中央广电总台的播音主持实力和教育部教材的权威性相结合，试图更好地诠释中华传统文化，
                        让社会主义核心价值观融入祖国少年儿童的基因里、血脉中。</p>
                    </div>
                    <!-- 音频 -->
                    <div class="audio" v-else>

                        <router-link class="to_search" :to="{name: 'ReadSearch', params: {type: 'audio'}}" target="_blank">
                            点此搜索您想听的音频课程
                            <i class="iconfont icon-youjiantou"></i>
                        </router-link>   

                        <div class="item" v-for="(item , index) in audioData" :key="index"  @click="playAudio(item.title,item.path)">
                            <h2>{{item.title}}</h2>
                            <p style="margin-bottom: 5px;">册次：{{item.register}}</p>
                            <p>朗读：{{item.recite}}</p>
                            <i :class="{paused:paused==item.path}" :mp3="item.path"></i>
                            <!-- <i :class="{paused:paused==item.path}" :mp3="item.path" @click="playAudio(item.title,item.path)"></i> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { GetReadLibrary } from "@/api/http";
    import { PlayCCTVAudio } from "@/api/prompt";
    export default {
        data(){
            return {
                active:true,
                audioData:"",
                audio:null,
                paused:"",
                banner_url: null,
                defaultImg: 'this.src="' + require('../assets/images/gray_2.png') + '"'
            }
        },
        methods:{
            tab(flag){
                this.active=flag
            },
            playAudio(title,mp3){
                PlayCCTVAudio({
                    title:title,
                    MP3:mp3
                })
            }
        },
        created(){
            GetReadLibrary({
                appkey:window.platform_key,
                userID:localStorage.getItem("user_id")
            })
            .then((res)=>{
                // console.log(res)
                this.audioData=res.content
                this.banner_url = res.banner_url
            })
            .catch((err)=>{
                console.log(err)
            })
        },
    }
</script>
<style scoped>
    button{
        border: none;
        outline-style: none;
    }
    .bg-read{
        /*
        position: fixed;
        left: 0;
        top: 0;
        */
        background: #fff;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch
    }
    .adver-img{
        width: 100%;
    }
    .adver-img img{
        width: 100%;
        display: block;
    }
    .tab{
        border-top: 1px solid #dae2e0;
        border-bottom: 1px solid #dae2e0;
    }
    .tab .button{
        position: relative;
        float: left;
        width: 50%;
        text-align: center;
        -webkit-appearance: none;
        top: 1px;
        padding: 15px 0;
        background-color: transparent;
        outline-style: none;
        color:#b2b2b2;
        box-sizing: border-box;
        border-bottom: 3px solid transparent;
        font-size: 16px;
    }
    .tab .button.active{
        border-bottom: 3px solid #5fdbba;
        color:#5fdbba;
    }
    .tab::after{
        content:"";
        display: block;
        clear: both;
        overflow: hidden;
    }
    .tab-con .tab-con-item{
        height: 100%;
        overflow-y: auto;        
    }
    .abstract{
        padding: 2em 2em;
    }
    .abstract p{
        font-size:14px;
        text-indent: 2em;
        line-height: 1.8;
        color:#444;
    }
    .audio .item{
        position: relative;
        padding: 1em 0;
        margin-left: 2em;
        border-bottom: 1px solid #dae2e0;
    }
    .audio .item h2{
        font-size:16px;
        color:#333;
        margin-bottom: 6px;
    }
    .audio .item p{
        font-size:14px;
        color:#666;
    }
    .audio .item i{
        position: absolute;
        top: 50%;
        right: 30px;
        transform: translateY(-50%);
        width: 45px;
        height: 46px;
        background: url(../assets/images/word_play.png) no-repeat center;
        background-size: contain;
    }
    .audio .item i.paused{
        background: url(../assets/images/word_pause.png) no-repeat center;
        background-size: contain;
    }
    .audio .to_search {
        color: #888;
        font-size: 14px;
        padding: 15px 0;
        width: 100%;
        display: block;
        padding-left: 2em;
        box-sizing: border-box;
        background: #fafafa;
        border-bottom: 1px solid #ecf0ef;
    }
    .audio .icon-youjiantou {
        float: right;
        margin-right: 2em;
    }
</style>


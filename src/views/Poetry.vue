<template>
    <div class="bg-read">
        <div class="adver-img">
            <!-- <img src="../assets/images/read_banner.png" alt=""> -->
            <img :src="banner_url" :onerror="defaultImg" alt="中小学语文诗词吟诵">
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
                    　　<p>统编版语文教材大幅增加了古诗文数量，从《诗经》《楚辞》到唐诗宋词，使同学们在积累语言的同时，受到中华优秀传统文化熏陶。</p>
                        <p>本栏目将1-9年级统编版、人教版语文教材中的古诗词汇集起来，以古诗词配画的形式呈现出来，并辅以朗读音频，便于同学们欣赏、聆听、学习。</p>
                    </div>
                    <!-- 音频 -->
                    <div class="audio" v-else>

                        <router-link class="to_search" :to="{name: 'ReadSearch', params: {type: 'poetry'}}" target="_blank">
                            点此搜索您想听的音频课程
                            <i class="iconfont icon-youjiantou"></i>
                        </router-link>

                        <div class="item" v-for="(item , index) in audioData" :key="index" @click="playAudio(item.title,item.path)">
                            <h2>{{item.title}}</h2>
                            <p style="margin-bottom: 5px;">册次：{{item.register}}</p>
                            <p>作者：{{item.recite}}</p>
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
    import { PoetryRecitation } from "@/api/http";
    import { PlayPoetryAudio } from "@/api/prompt";
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
                PlayPoetryAudio({
                    title:title,
                    MP3:mp3
                })
            }
        },
        created(){
            PoetryRecitation({
                appkey:window.platform_key,
                userID:localStorage.getItem("user_id")
            })
            .then((res)=>{
                console.log(res)
                this.audioData=res.content
                this.banner_url = res.banner_url
            })
            .catch((err)=>{

            })
        }
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


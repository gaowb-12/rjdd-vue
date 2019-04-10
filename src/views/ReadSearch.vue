<template>
    <div class="read_search">
        
        <flexbox class="search_area">
            <!-- <flexbox-item :span="1">
                <i class="iconfont icon-iconfontjiantou1" @click="back"></i>
            </flexbox-item> -->
            <flexbox-item class="soso">
                <form action="javascript:void(0);">
                    <input 
                        type="search"
                        @focus="onFocus"
                        @blur="onBlur"
                        @keyup.enter="onSubmit"
                        v-model="value"
                        placeholder="请输入关键字"
                    />
                    <i class="iconfont icon-guanbi" @click="cancle" v-if="guanbi"></i>
                </form>
            </flexbox-item>
        </flexbox>

        <!-- 搜索结果列表 -->
        <div class="search_list" v-if="readShow">
            <div v-for="(item, index) in resultList" :key="index" @click="playAudio(item.title,item.path)">
                <flexbox>
                    <flexbox-item>
                        <h2>{{item.title}}</h2>
                        <p>册次：{{item.register}}</p>
                        <p>作者：{{item.recite}}</p>
                    </flexbox-item>
                    <flexbox-item :span="1">
                        <i class="iconfont icon-youjiantou"></i>
                    </flexbox-item>
                </flexbox>
            </div>
        </div>
        <div class="search_list" v-if="poetryShow">
            <div v-for="(item, index) in resultList" :key="index" @click="playPoetry(item.title,item.path)">
            <flexbox>
                <flexbox-item>
                    <h2>{{item.title}}</h2>
                    <p>册次：{{item.register}}</p>
                    <p>作者：{{item.recite}}</p>
                </flexbox-item>
                <flexbox-item :span="1">
                    <i class="iconfont icon-youjiantou"></i>
                </flexbox-item>
            </flexbox>
        </div>
        </div>

        <!-- 没有搜索结果 -->
        <p class="no" v-if="noResult">没有找到相关内容，换个关键词试一试吧</p>

    </div>    
</template>
<script>
import { Flexbox, FlexboxItem } from "vux";
import { ReadSearch } from '@/api/http';
import { PlayCCTVAudio, PlayPoetryAudio } from "@/api/prompt";

export default {
    components: {
        Flexbox,
        FlexboxItem,
    },
    data(){
        return {
            guanbi: false,
            noResult: false,
            value: '',
            resultList: [],
            readShow: false,
            poetryShow: false
        }
    },
    created(){
        switch(this.$route.params.type){
            case 'audio':
                this.readShow = true;
                this.poetryShow = false;
            break;
            case 'poetry': 
                this.readShow = false;
                this.poetryShow = true;
        }        
    },
    methods: {
        onSubmit () {

            // 搜索接口
            ReadSearch({
                access_token: window.access_token,
                content: this.value
            },this.$route.params.type)
            .then(res => {
                this.resultList = res.content;
                if(this.resultList.length == 0){
                    this.noResult = true;
                }else{
                    this.noResult = false;
                }
            })
            .catch(err => {
                console.log(err);
            })

        },
        onFocus () {
            this.guanbi = true;
        },
        onBlur () {
            this.guanbi = false;
        },
        cancle(){
            this.value = null;
        },
        playAudio(title,mp3){
            PlayCCTVAudio({
                title:title,
                MP3:mp3
            })
        },
        playPoetry(title,mp3){
            PlayPoetryAudio({
                title:title,
                MP3:mp3
            })
        },
        // 返回上一页
        back(){
            this.$router.go(-1);
        }
  },
}
</script>
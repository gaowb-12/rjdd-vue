<template>
    <div>
        <header ref="header">
            <img ref="header_img" src="../assets/images/math_course_head.png" alt="">
            <div class="header-content">
                <p style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">{{question}}</p>
            </div>
        </header>
        <section ref="section">
            <div class="list">

                <div class="list-item" v-for="(item,index) in categorys.slice(0,categorys.length-1)" :key="item.category_id">
                    <!--  知识讲解 -->
                    <div class="knowledge" v-if="/(_1)\b/.test(item.category_id)" @click="math_class('zsjj',item.category_id)">
                        <img src="../assets/images/button-0@2x.png" alt="">
                    </div>
                    
                    <!-- 方法技巧 -->
                    <div class="knowledge" v-else @click="math_class('ffjq', item.category_id)">
                        <img src="../assets/images/button-1@2x.png" alt="">
                        <p>方法技巧{{isKnowledge?index:index+1}}</p>
                    </div>
                </div>

                <!-- 综合练习 -->
                <div class="list-item">
                    <div class="knowledge" @click="math_class('dylx', categorys[categorys.length-1]?categorys[categorys.length-1].category_id:'')">
                        <router-link target="_blank" :to="{name: 'UnitExercise', params: { categoryId: categorys[categorys.length-1]?categorys[categorys.length-1].category_id:'' }}">
                            <img src="../assets/images/button-2@2x.png" alt="">
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { GetMathCourse, GetMethodSkill } from "@/api/http";
import { math_class, techniques } from '@/api/prompt';

export default {
    name: "InviteShare",
    data(){
        return {
            question:"",//问题描述
            categorys:[],//知识列表
            isKnowledge:false,//知识讲解是否存在
            mp3Url: null,    //方法技巧的mp3地址
        }
    },
    
    methods: {
        clickDetail(id){
            console.log(id)
        },
        // 知识讲解--交互
        math_class,
    },
    created(){
        //获取数据
        GetMathCourse({},this.$route.params.chapter_id)
        .then(res=>{
            console.log(res)
            this.categorys=res.categorys

            this.isKnowledge=/(_1)\b/.test(this.categorys[0].category_id)//判断是否有知识讲解
            document.title=res.chapter_name//设置标题头
            this.question=res.des//获取描述问题
        })
    },
    mounted(){
        // 重新计算列表的高度
        this.$refs.header_img.onload=()=>{
            this.$refs.section.style.height=this.$refs.section.offsetHeight-this.$refs.header.offsetHeight+"px"
        }
    },
}
</script>
<style scoped>
    img{
        vertical-align: top;
    }
    header img{
        width:100%;
    }
    header{
        position: relative;
    }
    .header-content{
        display: -webkit-flex; /* Safari */
        display: flex;
        align-items:center ;
        position: absolute;
        width: 85%;
        left: 50%;
        bottom: 40%;
        transform: translateX(-50%);
        color:#fff;
        font-size:14px;
        line-height: 1.6;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        line-clamp: 3;
        box-orient: vertical;
    }
    .header-content p {
        color:#fff;
        font-size:14px;
        line-height: 1.6;
        overflow : hidden;
        font-family: "微软雅黑";
        text-overflow: ellipsis;
        white-space:pre-wrap;
        word-wrap:break-word;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        line-clamp: 3;
        box-orient: vertical;
    }
    section{
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .list{
        background: url(../assets/images/button-bg.png) repeat-y;
        background-size: contain;
        border-top: 1px solid transparent;
        padding-bottom: 20px;
    }
    .list .list-item{
        padding:0 0.8rem;
        margin-bottom: -0.38rem;
    }
    .list .knowledge{
        position: relative;
        display: inline-block;
    }
    .list .knowledge img{
        /* width: 2.3rem; */
        height: 2.78rem;
    }
    .list .knowledge p{
        position: absolute;
        left: 0.6rem;
        bottom: 0.52rem;
        text-align: center;
        color:#76471d;
        font-size:0.32rem;
        font-weight: bold;
    }

    .list .list-item:first-child{
        margin-top: -1.39rem;
    }
    .list .list-item:nth-child(odd){
        text-align: left;
    }
    .list .list-item:nth-child(even){
        text-align: right;
    }

</style>

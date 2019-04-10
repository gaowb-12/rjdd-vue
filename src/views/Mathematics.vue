<template>
    <div>
        <section class="ch_unit" id="ch_unit">
            <ul>
                <li v-for="chapter in mathmaticsLists" :key="chapter.chapter_id" :data-chapter="chapter.chapter_id">
                    <a href="javascript:;" class="ch_kaig ch_unitArrow" @click="toggle(chapter.chapter_id,$event)">
                        {{chapter.chapter_name}}
                        <span class=""></span>
                    </a>
                    <div class="ch_contoin">
                        <div class="ch_unitList ch_hide">
                            <div class="ch_gao" v-for="practice in chapter.info" :key="practice.page">
                                <router-link :to="'/'+practice.practice" target="_blank">
                                    <span class="ch_HanZ fl grasp0" id="1615">第{{practice.page}}页 练习<i class="ch_HanZ_i"></i></span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import { GetMathmatics } from "@/api/http"
export default {
    name: "Mathematics",
    data(){
        return {
            active:true,
            mathmaticsLists:[]//数学练习列表
        }
    },
    
    methods: {
        // 章节折叠
        toggle(chapter_id,e){
            let dom=document.querySelector("[data-chapter='"+chapter_id+"']")

            if(!dom.classList.contains("active")){
                dom.getElementsByClassName("ch_contoin")[0].style.height=dom.getElementsByClassName("ch_unitList")[0].offsetHeight+"px"
            }else{
                dom.getElementsByClassName("ch_contoin")[0].style.height=0
            }

            dom.classList.toggle("active")

        }
    },
    created(){
        let book_id=this.$route.params.book_id;
        GetMathmatics(book_id)
        .then(res=>{
            console.log(res)
            this.mathmaticsLists=res.practices
        })
        .catch(err=>{
            console.log(err)
        })
    },
    mounted(){
        
    },
}
</script>
<style scoped>
.ch_contoin{
	overflow: hidden;
    height:0;
    -webkit-transition: all 0.3s linear;
    -moz-transition: all 0.3s linear;
    -o-transition: all 0.3s linear;
    -ms-transition: all 0.3s linear;
    transition: all 0.3s linear;
}
.ch_unit {
    text-align: center;
    padding-bottom: 1.1rem;
}
.ch_unit li {
    background-color: #fff;
}
.ch_unit li.active a.ch_kaig:before{
    visibility: visible;
}
.ch_unit li.active > a span {
    -webkit-transform: translateY(-50%) rotate(0);
    -moz-transform: translateY(-50%) rotate(0);
    -o-transform: translateY(-50%) rotate(0);
    -ms-transform: translateY(-50%) rotate(0);
    transform: translateY(-50%) rotate(0);
}
.ch_unit li a {
    font-size: 0.3rem;
    color: #2a2a2a;
    display: block;
    line-height: 0.9rem;
    border-bottom: none;
    position: relative;
}
.ch_unit li.active > a{
	border-bottom: 0.01rem solid #dbdbdb;
}
.ch_unit li > a.ch_kaig:before{
	content: "";
    width: 0;
    height: 0;
    visibility:hidden;
    position: relative;
    top: -.16rem;
    right: .1rem;
    border-bottom: .1rem solid #35c79c;
    border-left: .1rem solid transparent;
}
.ch_unit li > a > span {
    position: absolute;
    right: 45px;
    top: 50%;
    transform: translateY(-50%);
    width: 0.23rem;
    height: 0.13rem;
    background: url(../assets/images/arrow.png) center no-repeat;
    background-size: 100% 100%;
    -webkit-transform: translateY(-50%) rotate(180deg);
    -moz-transform: translateY(-50%) rotate(180deg);
    -o-transform: translateY(-50%) rotate(180deg);
    -ms-transform: translateY(-50%) rotate(180deg);
    transform: translateY(-50%) rotate(180deg);
    -webkit-transition: all 0.3s ;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s ;
    -ms-transition: all 0.3s;
    transition: all 0.3s;
}
 
.ch_unit li:nth-child(2n) {
    background-color: #f7f7f7;
}
.ch_unit li a.ch_unitArrow {
	border-bottom: 0.01rem solid #dbdbdb;
}
.ch_unitList h2{
	width:100%;
	height: .8rem;
	line-height: .8rem;
	font-weight: 600;
	border-bottom: 0.01rem solid #dbdbdb;
  
}
.ch_unitList .ch_gao{
    padding: 0 .2rem;
    border-bottom: 0.01rem solid #dbdbdb;
}
.ch_unitList div:nth-last-of-type(1) p:nth-last-of-type(1) {
	border-bottom: none;
}
</style>

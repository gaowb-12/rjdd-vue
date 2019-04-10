<template>
    <div class="teaching">
        <!-- swiper -->
        <swiper :options="swiperOption" class="swiper-box">
            <swiper-slide class="swiper-item" v-for="(item,index) in analysis" :key="index">
                <div class="swiper-zoom-container">
                    <img :src="item.img_url" alt="" :onerror="defaultImg">
                </div>
            </swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
import * as http from "@/api/http"
import { Closeview } from "@/api/prompt";
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    name: "Teaching",
    data(){
        return {
            analysis: [],
            swiperOption: {
                // direction: 'vertical',
                slidesPerView: 1,
                spaceBetween: 0,
                mousewheel: true,
                zoom: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true,
                }
            },
            defaultImg: 'this.showPage=true;this.src="' + require('../assets/images/gray.png') + '"',
        }
    },
    created(){
        const id = this.$route.params.id;        
        http.Teaching(id)
        .then(res => {
            console.log(res)
            this.analysis = res.base.analysis
        })
        .catch(err => {
            console.log(err)
            alert("系统异常，请刷新重试！")
        })
    },
    methods: {

    },
    components: {
        swiper,
        swiperSlide
    }
}
</script>
<style scoped>
.teaching .swiper-item img {
    width: 100%;
}
</style>

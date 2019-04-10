<template>
    <div class="promotions">
        <!-- swiper -->
        <swiper :options="swiperOption" class="swiper-box">
            <!-- 优惠券图片 -->
            <swiper-slide class="swiper-item swiper-coupons" v-if="coupons > 0">
                <span>{{ coupons | keepTwoNum }}</span>
                <a href="/mycoupon" target="_blank">
                    <img src="../assets/images/promotion_coupons.png" alt="优惠券">
                </a>
            </swiper-slide>
            <!-- 活动图片 -->
            <swiper-slide class="swiper-item" v-for="(item,index) in promotions" :key="index" :id="item.CHANNEL">
                <a :href="item.url" target="_blank">
                    <img :src="item.image" :alt="item.name">
                </a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <!-- 竖线 -->
        <p class="line"></p>
        <div class="close">
            <p class="v3css_icon_sys_error" @click="CloseviewPromotions"></p>
        </div>
    </div>
</template>

<script>
import * as http from "@/api/http"
import { Closeview } from "@/api/prompt";
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    name: "Promotions",
    data(){
        return {
            coupons: parseFloat(window.coupons),
            promotions: [],
            swiperOption: {
                // direction: 'vertical',
                slidesPerView: 1,
                spaceBetween: 0,
                mousewheel: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            }
        }
    },
    beforeCreate () {
        console.log(document.body.clientWidth)
        // window.parent.document.querySelector("body").style.overflowY = "hidden"
        document.querySelector('body').setAttribute('style', 'background: rgba(0,0,0,.8); width:' + document.body.clientWidth + 'px; height:' + window.screen.height + 'px')
    },
    created(){
        http.Promotions()
        .then(res => {
            console.log(res)
            this.promotions = res.promotions;
        })
        .catch(err => {
            console.log(err)
            alert("系统异常，请刷新重试！")
        })
    },
    methods: {
        CloseviewPromotions(){
            window.parent.document.querySelector("body").style.overflowY = "auto"
            window.parent.document.getElementById("iframe").style.display = "none"
            
            // Closeview();  //与app端交互关闭
        }
    },
    components: {
        swiper,
        swiperSlide
    }
}
</script>
<style>
.swiper-coupons {
    position: relative;
}
.swiper-coupons span {
    color: #fff;
    left: 1.65rem;
    bottom: 1.3rem;
    z-index: 9999;
    font-size: .64rem;
    position: absolute;
}
</style>
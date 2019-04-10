<template>
    <div class="oral">
        
        <!-- 练习列表 -->
        <!-- <div v-for="(item,index) in QList" :key="index" v-if="QFlag">
            <img :src="item.img_url" alt="口算教辅" :onerror="defaultImg" width="100%">
        </div> -->

        <swiper :options="swiperOption" class="swiper-box" ref="QSwiper">
            <swiper-slide class="swiper-item" v-for="(item,index) in QList" :key="index" v-if="QFlag">
                <div class="swiper-zoom-container">
                    <img :src="item.img_url" alt="口算教辅" :onerror="defaultImg">
                </div>
            </swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

        <!-- 答案列表 -->
        <swiper :options="swiperOption" class="swiper-box" ref="ASwiper">
            <swiper-slide class="swiper-item" v-for="(item,index) in AList" :key="index" v-if="AFlag">
                <div class="swiper-zoom-container">
                    <img :src="item.img_url" alt="口算教辅" :onerror="defaultImg">
                </div>
            </swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

        <!-- 视频列表 -->
        <div class="video" v-if="VFlag">
            <div style="text-align:center;font-size:18px;line-height:30px;margin-bottom:10px;" v-show="title">{{title}}</div>
            <div style="margin-top:10px;" v-show="speaker">主讲人：{{speaker}}</div>
            <div style="margin-bottom:10px;" v-show="unit">单位：{{unit}}</div>
            <video width="100%" controls v-for="(item,index) in VList" :key="index" :poster="poster">
                <source :src="item.mp4_url" type="video/mp4">
                您的浏览器不支持视频播放。
            </video>
        </div>
        
    </div>
</template>

<script>
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    name: "Oral",
    data () {
        return {
            QFlag: false,
            AFlag: false,
            VFlag: false,
            QList: [],
            AList: [],
            VList: [],
            poster: '',   // 视频封面
            swiperOption: {
                // direction: 'vertical',
                slidesPerView: 1,
                spaceBetween: 20,
                mousewheel: true,   //支持鼠标滚动
                zoom: true,     // 支持放大
                /* 将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。 */
                observer: true,                
                observerParents: true,
                pagination: {
                    el: '.swiper-pagination',
                }
            },
            defaultImg: 'this.showPage=true;this.src="' + require('../assets/images/gray.png') + '"',
            title:"",
            speaker:"",
            unit:"",
        }
    },
    created(){
        const ISBN = this.$route.params.ISBN;
        const type = this.$route.params.type;
        const folder = this.$route.params.folder;
        
        // console.log("ISBN--" + ISBN);
        console.log("type--" + type);
        console.log("folder--" + folder);

        this.title=this.$route.query.title//标题
        this.speaker=this.$route.query.speaker//主讲人
        this.unit=this.$route.query.unit//单位

        const folderArr = folder.split("_");
        const folderFile = folderArr[0];
        const Num = folderArr[1];
        console.log(Num)

        if(type=="Q"){              // 习题列表        
            this.QFlag = true
            this.AFlag = false
            this.VFlag = false

            const QListArr = [];
            for(let i=0; i<Num; i++){
                QListArr.push({
                    // img_url: require('../assets/images/'+(i+1)+'.jpg')
                    img_url: window.rjdduploadw+"/learn/"+ISBN+"/Q/"+folderFile+"/"+(i+1)+".jpg"
                })
            }
            this.QList = QListArr

        }else if(type=="A"){        // 答案列表
            this.QFlag = false
            this.AFlag = true
            this.VFlag = false

            const AListArr = [];
            for(let i=0; i<Num; i++){
                AListArr.push({
                    img_url: window.rjdduploadw+"/learn/"+ISBN+"/A/"+folderFile+"/"+(i+1)+".jpg"
                })
            }
            this.AList = AListArr

        }else if(type=="V"){       // 视频列表
            this.QFlag = false
            this.AFlag = false
            this.VFlag = true
            
            // 封面
            this.poster = window.rjdduploadw+"/learn/"+ISBN+"/V/"+folderFile+"/1.jpg"

            const VListArr = [];
            for(let i=0; i<Num; i++){
                VListArr.push({
                    mp4_url: window.rjdduploadw+"/learn/"+ISBN+"/V/"+folderFile+"/"+(i+1)+".mp4"
                })
            }
            this.VList = VListArr
        }
    },
    components: {
        swiper,
        swiperSlide
    },
}
</script>

<style scoped>
.oral .swiper-item img {
    width: 100%;
}
.oral .video video {
    margin-bottom: 20px;
}
</style>
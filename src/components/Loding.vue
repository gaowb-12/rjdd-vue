<template>
    <div>
        <!--  加载状态 -->
        <div id="fullscreen_overlay_800" class="fullscreen_overlay bg-minor" v-show="loading||loadingError" @click="cancel(false)"></div>
        
        <div class="v3css_runstatus bg-master" v-show="loading||loadingError">
            <div class="v3css_rs_body">
                <img class="v3css_rs_runimg" :src="loadingImg">
                <div class="v3css_rs_info cl-invert">{{loadingText}}</div>
            </div>
            <!-- <div class="v3css_rs_probar">
                <div class="v3css_rs_proindicator bg-slave"></div>
            </div> -->
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    // loading/loadingError不可同时为true，loading表示正在加载，不可点击取消，loadingError表示加载失败，可以点击取消
    props:["loading","loadingError","loadingImg","loadingText"],
    methods:{
        cancel(hide){
            this.$emit("hideLoading",hide);
        }
    }
}
</script>

<style>
    #fullscreen_overlay_800,.v3css_runstatus{
        position: fixed;
        z-index: 801; 
        left: 0;
        bottom: 0;
    }
    #fullscreen_overlay_800{
        bottom: auto;
        top: 0; 
        width: 100%;
        height: 100%;
        z-index: 800; 
        opacity: 0.4; 
    }
</style>



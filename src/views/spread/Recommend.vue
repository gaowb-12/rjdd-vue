<template>
    <div class="share_layer" v-if="browserOpen">
        <img src="../../assets/images/share_layer.png" alt="人教点读">
    </div>
</template>
<script>
export default {
    data(){
        return {
            browserOpen: true,
        }
    },
    methods: {
        isWeiXin() {
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                return true;
            }else{
                this.browserOpen = false;
                window.location.href="https://rjddresw.mypep.cn/rjdianduclient/pep/renjiaoapp-pep-release.apk";
            }
        }
    },
    mounted(){
       this.isWeiXin();
    }
}
</script>
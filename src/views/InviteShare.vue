<template>
    <div class="invite_share">
        <img src="../assets/images/share_ico.png" alt="人教点读" width="100%">
    </div>
</template>

<script>
import * as http from "@/api/http"
import { Welfare } from "@/api/prompt";

export default {
    name: "InviteShare",
    data(){
        return {

        }
    },
    created(){
        this.shareLocation();
    },
    methods: {
        shareLocation(){

            // alert(navigator.userAgent)
            //window.location.href = "rjdd://share";

            if(navigator.userAgent.match(/MicroMessenger/i)){
                // alert("微信中打开")
            }else if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {

                location.href = 'rjdd://share';
                setTimeout(function() {
                    location.href = 'https://itunes.apple.com/cn/app/id1178878647';
                }, 255);

                /*
                var ifr = document.createElement('iframe');
                ifr.src = 'rjdd://share';
                ifr.style.display = 'none';
                document.body.appendChild(ifr);
                //记录唤醒时间
                var openTime = +new Date();
                window.setTimeout(function(){
                    document.body.removeChild(ifr);
                    //如果setTimeout 回调超过2500ms，则弹出下载
                    if( (+new Date()) - openTime > 5000 ){
                        window.location = 'https://itunes.apple.com/cn/app/id1178878647';
                    }
                },2000)
                */
                
                /*
                var loadDateTime = new Date();
                window.setTimeout(function() {
                    var timeOutDateTime = new Date();
                    if(timeOutDateTime - loadDateTime < 5000) {
                        alert(111);
                        window.location = "https://itunes.apple.com/cn/app/id1178878647";
                    } else {
                        alert(222);
                        window.close();
                    }
                },2000);
                // window.location = "rjdd://share";
                */

            } else {
                var state = null;
                try {
                    state = window.open("rjdd://share");
                } catch(e) {}
                if(state) {
                    window.close();
                } else {
                    window.location = "http://app.mypep.cn/diandu";
                }
            }
        }
    }
}
</script>

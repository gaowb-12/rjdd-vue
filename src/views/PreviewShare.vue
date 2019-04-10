<template>
    <div class="preview">
        <!-- 语文名师辅导课 -->
        <div v-if="ch">
            <p><img src="../assets/images/ch_1.png" alt="小学语文名师辅导课"></p>
            <p><img src="../assets/images/ch_2.png" alt="小学语文名师辅导课"></p>
            <p><img src="../assets/images/ch_3.png" alt="小学语文名师辅导课"></p>
        </div>

        <!-- 数学预习课 -->
        <div v-if="math">
            <p><img src="../assets/images/math_1.png" alt="小学数学知识精讲"></p>
            <p><img src="../assets/images/math_2.png" alt="小学数学知识精讲"></p>
            <p><img src="../assets/images/math_3.png" alt="小学数学知识精讲"></p>
        </div>

        <!-- 下载条 -->
        <div class="down_bar">
            <!-- <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.pep.diandu">
                <img src="../assets/images/down_bar.png" alt="人教点读">
            </a> -->
            <img @click="handleShare" src="../assets/images/down_bar.png" alt="人教点读">
        </div>

        <!-- 浏览器打开弹出层 -->
        <div class="share_layer" v-if="browserOpen" @click="closeLayer">
            <img src="../assets/images/share_layer.png" alt="人教点读">
        </div>
    </div>
</template>

<script>
export default {
  data() {
      return {
          ch: false,
          math: false,
          browserOpen: false,
      }
  },
  created(){
      let couseName= this.$route.params.course;
      switch(couseName){
          case 'ch':
            this.ch = true;
            document.title = "小学语文名师辅导课"
            break;
          case 'math':
            this.math = true;
            document.title = "小学数学知识精讲"
            break;
          default:
            document.title = "人教点读"
      }
  },
  methods: {
      handleShare(){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端\
        if(isiOS){
            window.location.href = "http://app.mypep.cn/diandu";
        }
        if(isAndroid){
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){  // 判断不是微信浏览器
                this.browserOpen = true;
            }else{
                this.browserOpen = false;
                window.location.href="https://rjddresw.mypep.cn/rjdianduclient/pep/renjiaoapp-pep-release.apk";
            }
        }
    },
    closeLayer(){
        this.browserOpen = false;
    }
  }
}

</script>
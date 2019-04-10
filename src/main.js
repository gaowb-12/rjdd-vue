// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "../store"
require('es6-promise').polyfill();
import axios from "axios"
import "@/api/axiosConfig"
import qs from 'qs'
import * as custom from '@/api/filter'
import '@/api/global'
import "../static/css/v3ui"
import "../static/css/style"
import "../static/font/iconfont"

Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

Vue.prototype.$axios=axios;

// 用户上传路径(静态资源)
window.rjdduploadw = "https://rjdduploadw.mypep.cn";

// 从localStorage里取出access_token,user_id和name
window.access_token = localStorage.getItem("access_token");
window.user_id = localStorage.getItem("user_id");
window.name = localStorage.getItem("name");
window.app_js_hanler = null;

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

// rem
function setRem(){
	if(document.documentElement.clientWidth > 1024){
		document.documentElement.style.width = 750 + "px";
		document.documentElement.style.margin = "0 auto";
		document.documentElement.style.fontSize = document.documentElement.clientWidth / 20 + "px";
	}else{
		document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
	}
};
setRem();
window.onresize = function(){
	setRem();
}
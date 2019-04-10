import axios from "axios";

// 接口前缀

axios.defaults.baseURL = 'https://rjdiandu.mypep.cn/';                   // 正式环境
axios.defaults.baseURL = 'https://dianducs.mypep.cn/';                   // 测试环境
// axios.defaults.baseURL="http://192.168.186.5:8085/mockjsdata/2/"         // RAP-mock
// axios.defaults.baseURL = 'http://192.168.180.172:8080/jx_click/';         // 冲哥

axios.defaults.timeout = 20000;

//添加一个请求拦截器
axios.interceptors.request.use((config)=>{
    //在请求发出之前进行一些操作
    return config
},function(error){
    return Promise.reject(error);
});

//添加一个响应拦截器
axios.interceptors.response.use((res)=>{
    //在这里对返回的数据进行处理
    if(res.data.errcode==95||res.data.errcode==96){
        localStorage.setItem("access_token", '')
        localStorage.setItem("user_id", '')
        localStorage.setItem("name", '')
        // alert("登录失效，请重新登录！")
        window.source.cancel();
        window.location.href="/3.5/h5/loginpage"
    }
    return res;
},(error)=>{
    return Promise.reject(error);
})


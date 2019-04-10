<template>
    <div id="body_inner" class="user_center">

        <!-- 个人中心 -->
        <div class="user_c_top">
            <router-link :to="{name:'Userinfo'}" target="_blank">
            <flexbox>
                <flexbox-item :span="3.5">
                    <img :src="head_image" :alt="nickname" :onerror="defaultImg">
                </flexbox-item>
                <flexbox-item :span="6.5">
                    <dl>
                        <dt>{{nickname}}</dt>
                        <dd>年级：{{grade_txt ? grade_txt : '未设置'}}</dd>
                        <dd>积分：{{points}}分</dd>
                        <dd>等级：{{level_name}}</dd>
                    </dl>
                </flexbox-item>
            </flexbox>
            <span class="editor">编辑</span>
            </router-link>
        </div>

        <!-- 我的订单 -->
        <div class="quick_entry">
            <flexbox>
                <flexbox-item>
                    <router-link :to="{name:'MyOrderAll',params:{order_state:'all'}}" target="_blank">
                        <div class="flex-demo">我的订单</div>
                    </router-link>
                </flexbox-item>
                <flexbox-item>
                    <router-link :to="{name:'feedback'}" target="_blank">
                        <div class="flex-demo">我的反馈</div>
                    </router-link>
                </flexbox-item>
                <flexbox-item>
                    <router-link :to="{name:'ActicodeExchange'}" target="_blank">
                        <div class="flex-demo">激活码</div>
                    </router-link>
                </flexbox-item>
                <flexbox-item>
                    <div class="flex-demo"  @click="systemSetting">系统设置</div>
                </flexbox-item>
            </flexbox>
        </div>

        <!-- 我的充值 -->
        <div class="quick_list">
            <div class="quick_row" @click="recharge">
                <flexbox>
                    <flexbox-item :span="5">我的充值</flexbox-item>
                    <flexbox-item :span="3">学豆 &yen;{{user.beans}}</flexbox-item>
                    <flexbox-item >立即充值</flexbox-item>
                </flexbox>
            </div>

            <div class="quick_row">
            <!-- <div class="quick_row" @click="Integral"> -->
                <router-link :to="{name:'MyPoints'}" target="_blank">
                    <flexbox>
                        <flexbox-item :span="5">我的积分</flexbox-item>
                        <flexbox-item :span="3">积分 {{points}}</flexbox-item>
                        <flexbox-item >积分记录</flexbox-item>
                    </flexbox>
                </router-link>
            </div>

            <div class="quick_row">
                <router-link :to="{name:'mycoupon'}" target="_blank">
                    <flexbox>
                        <flexbox-item :span="5">我的优惠券</flexbox-item>
                        <flexbox-item>{{my_usable_coupons}}张可用</flexbox-item>
                    </flexbox>
                </router-link>
            </div>
        </div>

        <!-- 推荐给好友 -->
        <div class="quick_list quick_recommend">

            <div class="quick_row" @click="recommendedToFriends">
                <flexbox>
                    <flexbox-item>推荐给好友</flexbox-item>
                </flexbox>
            </div>

            <div class="quick_row">
                <router-link :to="{name:'ContactUs'}" target="_blank">
                    <flexbox>
                        <flexbox-item>联系我们</flexbox-item>
                    </flexbox>
                </router-link>
            </div>

        </div>

        <!-- 退出登录 -->
        <div class="quick_list quick_quit" @click="layoutLogin">
            <flexbox>
                <flexbox-item>退出登录</flexbox-item>
            </flexbox>
        </div>
    </div>
</template>
<script>
import { GetUserinfo, FeedbackRemind, GetUsableCoupons, GetUserPoint } from "@/api/http";
import { Loginstatus, systemSetting, RechargeXD, recommendedToFriends, Integral } from "@/api/prompt";
import { Flexbox, FlexboxItem } from "vux";

export default {
  components: {
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      feedback_flag: false, // 我的反馈回复通知
      nickname: "",
      head_image: "",
      grade_txt: "",
      points: '',
      level_name: '',
      my_usable_coupons: '',
      user: {},
      defaultImg: 'this.src="' + require('../assets/images/boy0.jpg') + '"'
    };
  },
  methods: {
    layoutLogin() {
      localStorage.removeItem("user_id");
      localStorage.removeItem("access_token");
      localStorage.removeItem("name");
      window.access_token = "";
      window.user_id = "";
      window.name = "";
      Loginstatus({ status: "logout" }); //退出交互
      this.$router.push({ name: "Loginpage" });
    },
    // 学豆充值
    recharge() {
      RechargeXD();
    },
    // 我的积分
    Integral,
    // 系统设置
    systemSetting,
    // 推荐给好友
    recommendedToFriends,
    // 通知app端下拉刷新
    menucontrol(){
        // 3.3.0版本只有IOS可以下拉刷新
        var uA = navigator.userAgent;
        var isAndroid = uA.indexOf('Android') > -1 || uA.indexOf('Adr') > -1;
        if(!isAndroid){
            var param = {
                "command" : "menucontrol",
                "menu_action" : [
                    {
                    "name" : "刷新",
                    "id" : 10010,
                    "action" : "show"
                    }
                ]
            }
            prompt(JSON.stringify(param));
        }
    }
  },
  created() {
    // 获取用户积分级别
    GetUserPoint({
        access_token: localStorage.getItem("access_token")
    })
    .then(res => {
        console.log(res)
        this.points = res.user.points;
        this.level_name = res.user.level_name
    })
    .catch(err => {
        console.log(err);
    });

    // 我的反馈--提醒
    FeedbackRemind({
      access_token: localStorage.getItem("access_token")
    })
    .then(res => {
        // console.log(res)
        this.feedback_flag = res.show;
    })
    .catch(err => {
        console.log(err);
        // alert("系统异常，请刷新重试！");
    });
    
    // 获取可用优惠券
    GetUsableCoupons({
        access_token:localStorage.getItem("access_token"),
        book_type: ''     //使用书籍类型（选填，空：所有；01：点读；02：音频）
    })
    .then((res)=>{
        // console.log(res)
        if(res.errcode==110){
            this.my_usable_coupons = res.coupons.length;
        }
    })
    .catch((err)=>{
        console.log(err)
    });

    // 获取用户信息
    GetUserinfo({
      access_token: localStorage.getItem("access_token")
    })
      .then(res => {
        // console.log(res);
        if (res.errcode == "110") {
          this.user = res.user;
          this.nickname = res.user.nickname || res.user.mobile;
          this.grade_txt = res.user.grade_txt;          
          this.head_image =
            res.user.head_image || require("../assets/images/boy0.jpg");
        } else {
        }
      })
      .catch(err => {
          
      });

    // //获取充值的结果
    app_js_hanler = message => {
      if (JSON.parse(message).command == "recharge_amount") {
        //返回充值金额
        // 获取学豆
        GetUserinfo({
          access_token: localStorage.getItem("access_token")
        })
          .then(res => {
            if (res.errcode == "110") {
              this.user.beans = res.user.beans;
            }
          })
          .catch(err => {});
      }
    };
  },
  mounted(){
    // 页面一打开通知app端交互方法然后用户可以操作下拉刷新
    this.menucontrol();
  }
};
</script>
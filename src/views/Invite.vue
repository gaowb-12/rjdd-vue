<template>
    <div class="invite">
        <!-- invite_head -->
        <div class="invite_head"><img src="../assets/images/invite_head.jpg" alt="邀请好友赢福利"></div>
        <div class="invite_panel invite_body">
            <h2>活动期间成功邀请一名好友注册<br>可获得</h2>
            <!-- 优惠券 -->
            <div class="coupon"><div><img src="../assets/images/coupon_10.png" alt="" ></div></div>
            <div class="share_success" v-if="this.users.length != 0">您已经成功分享！好友成功注册，优惠券即可自动存入您的账户</div>
            <div class="share" @click="WelfareFn"><span>点击发福利</span></div>
            <!-- 拉新用户列表 -->
            <div class="laxin_list clearfix">
                <ul class="newUser">
                    <li v-for="(item,index) in users" :key="index">
                        <img v-if="item.head_image" :src="item.head_image" alt="人教点读">
                        <img v-else src="../assets/images/boy0.jpg" alt="人教点读">
                    </li>
                </ul>
                <ul class="newUser" v-if="users.length <= 5">
                    <li v-for="(item,index) in num" :key="index"></li>
                </ul>
            </div>
            
            <p v-if="users.length == 0">有一位小伙伴注册，您即可获得一张&yen;10.00优惠券</p>
            <p v-else>您已经邀请了{{users.length}}位小伙伴，获得了{{users.length}}张&yen;10.00优惠券</p>
        </div>
    </div>
</template>

<script>
import * as http from "@/api/http"
import { Welfare } from "@/api/prompt";

export default {
    name: "Invite",
    data(){
        return {
            num: "",
            users: [],
        }
    },
    created(){
        http.InviteUsers({
            access_token: window.access_token
        })
        .then(res => {
            // console.log(res)
            this.num = 5 - res.users.length
            this.users = res.users
        })
        .catch(err => {
            console.log(err)
            //alert("系统异常，请刷新重试！")
        })
    },
    methods: {
        WelfareFn(){
            Welfare();
        }
    }
}
</script>

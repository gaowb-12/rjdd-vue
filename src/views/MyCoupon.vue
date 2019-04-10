<template>
    <div class="coupon-v3">
        <div class="tab">
            <div class="button" :class="{active:active=='valid'}" @click="tab('valid')">可用优惠券</div>
            <div class="button" :class="{active:active=='invalid'}" @click="tab('invalid')">不可用优惠券</div>
        </div>
        
        <!-- 可用优惠券 -->
        <div class="coupon" v-if="active=='valid'">
            <Coupon v-bind:coupon="coupon" v-for="coupon in my_usable_coupons" :key="coupon.id"></Coupon>
        </div>

        <!-- 不可用优惠券 -->
        <div class="coupon" v-if="active=='invalid'">
            <Coupon v-bind:coupon="coupon" v-bind:unused="true"  v-for="coupon in my_unusable_coupons" :key="coupon.id">
                <!-- 未生效 -->
                <i class="coupon-ineffective" v-if="couponInvalidResult(coupon.start_time)"></i>
                <!-- 已使用 -->
                <i class="coupon-used" v-else-if="!couponInvalidResult(coupon.used_time)"></i>
                <!-- 已过期 -->
                <i class="coupon-expired" v-else-if="!couponInvalidResult(coupon.end_time)"></i>
            </Coupon>
        </div>
        
    </div>
</template>

<script>
import { GetUsableCoupons,GetUnusableCoupons } from "@/api/http";
import  Coupon  from "../components/Coupon";
    export default {
        data(){
            return {
                active:"valid",
                my_usable_coupons:{},//可用优惠券
                my_unusable_coupons:{},//不可用优惠券
            }
        },
        methods:{
            tab(active){
                this.active=active
            },
            // 判断优惠券不可用原因
            couponInvalidResult(time){
                if(!time) return true;//判断是否已使用过
                const mytime=new Date(time).valueOf();
                const nowtime=new Date().valueOf();
                return mytime>nowtime
            }
        },
        
        components:{
            Coupon
        },
        created(){
            // 获取可用优惠券
            GetUsableCoupons({
                access_token:localStorage.getItem("access_token"),
                book_type: ''     //使用书籍类型（选填，空：所有；01：点读；02：音频）
            })
            .then((res)=>{
                console.log(res)
                if(res.errcode==110){
                    this.my_usable_coupons=res.coupons
                }
            })
            .catch((err)=>{
                console.log(err)
            });

            // 获取不可用优惠券
            GetUnusableCoupons({
                access_token:localStorage.getItem("access_token")
            })
            .then((res)=>{
                console.log(res)
                if(res.errcode==110){
                    this.my_unusable_coupons=res.coupons
                }
            })
            .catch((err)=>{
                console.log(err)
            })

        }
    }
</script>
<style>
    .coupon-v3 .tab{
        width: 100%;
        overflow: hidden;
        background-color: #fff;
    }
    .coupon-v3 .button{
        float: left;
        width: 50%;
        line-height: 0.8rem;
        text-align: center;
        border-bottom: 2px solid #dbe2e0;
        
    }
    .coupon-v3 .button.active{
        color:#eb4e41;
        border-color:#eb4e41;
    }
    .coupon-v3 .coupon{
        padding: 0.25rem;
    }
    
</style>

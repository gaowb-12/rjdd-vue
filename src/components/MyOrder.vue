<template>
    <div>
        <div v-if="orderList.length == 0" style="text-align:center; margin-top: 20px;">没有订单</div>
        <div v-else class="order" v-for="order in orderList" :key="order.id" :id="order.id">
            <!-- 订单信息 -->
            <div class="o_title bg-default bc-slave">
                <div class="o_title_tcont_name" style="padding-left: 10px;"> 订单时间：{{order.s_create_time}}</div>
                <div class="o_title_state cl-warn">{{orderTip[order.s_state]}}</div>
            </div>
            <!-- 商品信息 -->

            <!-- 浏览订单显示订单详情链接，否则商品链接 -->
            <div class="v3_myOrder" v-for="info in order.product_info" :key="info.pid" :id="info.pid">

                <!-- 点读课程 -->
                <router-link :to="{name:'Odetail',params:{orderId:order.order_id}}" class="a_no_line" target="_blank">
                    <div class="shop_list bg-top bc-default">

                        <div class="shop_list_img">
                            <img lazytype="book" :src="info.cover_image" :onerror="defaultImg">
                        </div>
                        <div class="shop_list_info">
                            <p class="shop_list_info_title">{{info.name}}</p> 
                            <!-- <p class="shop_list_info_title" v-else>{{info.name | deleteTime}}</p>       IOS审核通过后删除此句 -->

                            <p class="shop_list_info_sku cl-tip">{{info.validity|validity}}</p>   <!--IOS审核通过后放开此句 去掉v-if-->
                            <!-- <p class="shop_list_info_sku cl-tip" v-else></p>    IOS审核通过后删除此句 -->

                            <ul class="order-serviceinfo cl-invert">
                                <li class="bg-slave">{{info.service_type}}</li>
                            </ul>
                        </div>

                        <!-- 商品原金额跟数量-->
                        <div class="shop_list_paydata">
                            <p class="price" style=" ">{{(info.order_price?info.order_price:info.price)|rmbPrice}}</p>
                            <p class="nums cl-tip">X{{info.num}}</p>
                        </div>
                    </div>
                </router-link>


                <router-link :to="{name:'Odetail',params:{orderId:order.order_id}}" class="a_no_line" target="_blank" v-if="info.promotion">
                    <div class="shop_list bg-top bc-default">

                        <div class="shop_list_img">
                            <img lazytype="book" :src="info.cover_image" :onerror="defaultImg">
                        </div>
                        <div class="shop_list_info">
                            <p class="shop_list_info_title">{{info.promotion.name}}</p>    <!--IOS审核通过后放开此句 去掉v-if-->
                            <!-- <p class="shop_list_info_title" v-else>{{info.promotion.name | deleteTime}}</p>    IOS审核通过后删除此句 -->

                            <p class="shop_list_info_sku cl-tip">{{info.validity|validity}}</p>  <!--IOS审核通过后放开此句 去掉v-if-->
                            <!-- <p class="shop_list_info_sku cl-tip" v-else></p>    IOS审核通过后删除此句 -->

                            <ul class="order-serviceinfo cl-invert">
                                <li class="bg-slave">{{info.service_type}}</li>
                            </ul>
                        </div>

                        <!-- 购物车增加数量-->
                        <div class="shop_list_paydata">
                            <p class="price" style=" ">{{0|rmbPrice}}</p>
                            <p class="nums cl-tip">X{{info.num}}</p>
                        </div>
                    </div>
                </router-link>
            </div>

            <div class="o_total_price bg-default">
                <div class="cont cl-tip">
                    <span class="cl-default">共
                        <b>{{order.product_info.length}}</b>件商品</span>
                    <span class="cl-default real_pay">实付款：
                        <b>{{order.pay_price|rmbPrice}}</b>
                    </span>
                    <span class="cl-default">(使用优惠券
                        <b>{{order.coupons*100|rmbPrice}}</b>)</span>
                </div>
            </div>
            <div class="o_operator_btn bg-default">
                <ul>
                    <li class="v3css_button v3css_button_border bc-master cl-minor" v-show="order.s_state==-1" @click="removeOrder({order_id:order.order_id,name:-1})">删除订单</li>
                    <li class="v3css_button v3css_button_border bc-master cl-minor" v-show="order.s_state==0" @click="cancelOrder({order_id:order.order_id,name:0})">取消</li>
                    <li class="v3css_button v3css_button_border bc-master cl-minor" v-show="order.s_state==0"  @click="pay(order)">立即支付</li>
                </ul>
            </div>
            <div class="o_cut_off_rule bg-body"></div>
        </div>

        <!-- 蒙版层 -->
        <div id="fullscreen_overlay_800" class="fullscreen_overlay bg-minor" v-show="loading" @click="loading=false"></div>
        <div id="progress" style="position:absolute;bottom:40px;width:100%;z-index:999;" v-show="loading">
            <div style="text-align:center;">
                <img src="../assets/images/running.gif" style="width:40px;">
            </div>
        </div>
    </div>
</template>
<script>
    import * as http from "@/api/http"
    import {iapPay,UpdateTextbook} from "@/api/prompt"
    
    export default {
        data(){
            return {
                orderId:"",
                device_type:101,
                orderTip:{
                    '-1':"交易关闭",
                    '0':"待付款",
                    '1':"交易完成"
                },
                loading:false,
                defaultImg: 'this.src="' + require('../assets/images/gray_1.png') + '"',
                book_id:""
            }
        },
        props:["order_state",'orderList'],
        methods:{
            removeOrder(orderId){//删除订单
                this.$emit("re-order",orderId)//传给父组件
            },
            cancelOrder(orderId){//取消订单
                this.$emit("ca-order",orderId) //传给父组件
                this.$emit("clickCancleBtn", true)
            },
            pay(order){//发起支付
                // 判断下单跟支付是否是同一系统
                if(order.device_type_matched==0){
                    alert("下单跟支付必须在同一系统！")
                    return;
                }
                this.orderId=order.order_id
                if(this.device_type==101){
                    // this.$router.push({name:'Payit',params:{orderId:orderId}})
                    let routeData = this.$router.resolve({name:'Payit',params:{orderId:order.order_id}});
                    window.open(routeData.href,'_blank');
                }else{
                    // 如果支付金额为0，给用户提醒
                    if(order.pay_price<=0){
                        // if(Confirm("确认支付吗？")){
                        //     this.iosPay(order.order_id)
                        // }
                        Confirm({
                            text:"确认支付吗？",
                            confirm:()=>{
                                this.iosPay(order)
                            }
                        })
                    }else{
                        this.iosPay(order)
                    }
                }
            },
            // ios内购
            iosPay(order){
                http.PayOrder({//h5重新发起支付，获取支付信息传给移动端
                        access_token: window.access_token,
                        device_type: "102",//ios
                        pay_mode: "103",
                        id: order.order_id
                })
                .then((res)=>{
                    console.log(res)
                    if(res.errcode==110){
                        this.book_id=res.result.book_id
                        if(!res.result.pay_info){//支付金额0
                            // 交互，通知移动端购买完成
                            UpdateTextbook({orderId:this.orderId,book_id:this.book_id,pay_price:order.beans})
                            this.$router.push({name:"Odetail",params:{orderId:this.orderId}})
                        }else{
                            this.loading=true
                            iapPay({ //交互，传值给ios
                                out_trade_no:this.orderId,  //订单id
                                product_id:res.result.pay_info.ios_sku  //bookid
                            })
                        }
                    }
                })
                .catch((err)=>{

                })
            }
        },
        filters:{
            validity(day){
                if(day%30==0){
                    return day/30+"个月"
                }else{
                    return parseInt(day/30)==0?day%30+"天":parseInt(day/30)+"个月"
                }
            },
            // 价格添加人民币标识(￥)
            rmbPrice(value) {
                value = (value / 100).toFixed(2)
                return '￥' + value
            },


            // IOS审核，删除订单日期
            // deleteTime(value) {
            //     var deleteArr = value.split("-");
            //     deleteArr.pop();
            //     value = deleteArr.join();
            //     return value
            // }
        },
        created(){
            const ua = navigator.userAgent.toLowerCase()
            if (/iphone|ipad|ipod/.test(ua)) {
                this.device_type=102   //iphone
            } else if (/android/.test(ua)) {
                this.device_type=101   //android
            }
            //ios支付完成回传h5页面数据
            app_js_hanler = (message)=>{
                if(JSON.parse(message).command == "iappay_result"){//返回头像url
                    // payType = PRPayTypeIAP
                    // return_code  0 成功 1失败
                    // errstr
                    this.loading=false
                    this.$router.push({name:"Odetail",params:{orderId:this.orderId}})
                    if(JSON.parse(message).return_code==0){//成功
                        alert("支付成功")
                    }else{
                        alert("支付失败，请重新支付")
                    }
                }
            }
        }
    }
</script>
<style>
    #fullscreen_overlay_800{
        position: fixed; 
        top: 0; 
        left: 0; 
        width: 100%; 
        z-index: 800; 
        opacity: 0.4; 
        height: 100%;
    }
</style>


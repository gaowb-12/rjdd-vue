<template>
    <div>
        <div id="content" v-show="showPage">
            <!--收货地址 -->
            <!--商品信息 -->
            <div class="order">
                <!-- 订单信息 -->
                <div class="o_title bg-default bc-slave">
                    <div class="o_title_tcont">
                        <img class="o_title_tcont_icon" src="../assets/images/shop.png">
                        <span class="o_title_tcont_name">人教数字公司自营</span>
                    </div>
                </div>
                <!-- 商品信息 -->

                <!-- 浏览订单显示订单详情链接，否则商品链接 -->

                <div class="v3_myOrder" v-for="info in orderDetail.product_info" :key="info.pid">
                    
                    <!-- 点读课程 -->
                    <router-link :to="{name:'Detail',params:{book_id:info.pid,device_type,bought: 1}}" target="_blank" class="a_no_line" :id="info.pid" v-if="info.name.indexOf('音频') == -1 && info.name.indexOf('知识精讲') == -1">
                        <div class="shop_list bg-top bc-default">

                            <div class="shop_list_img">
                                <img lazytype="book" :src="info.cover_image" :onerror="defaultImg">
                            </div>
                            <div class="shop_list_info">
                                <!-- <p class="shop_list_info_title" v-if="device_type == 102">{{info.name | deleteTime}}</p>   IOS审核通过后放开此句 去掉v-if -->
                                <p class="shop_list_info_title">{{info.name}}</p>    <!--IOS审核通过后删除此句-->

                                <p class="shop_list_info_sku cl-tip">{{info.validity|validity}}</p>
                                <!-- <p class="shop_list_info_sku cl-tip"></p>   IOS审核通过后删除此句 -->

                                <ul class="order-serviceinfo cl-invert">
                                    <li class="bg-slave">{{info.service_type}}</li>
                                </ul>
                            </div>

                            <!-- 购物车增加数量-->
                            <div class="shop_list_paydata">
                                <p class="price">{{info.order_price | rmbPrice}}</p>
                                <p class="nums cl-tip">X {{info.num}}</p>
                            </div>
                        </div>
                    </router-link>

                    <!-- 音频课程 -->
                    <div class="shop_list bg-top bc-default" v-if="info.name.indexOf('音频') != -1">
                        <div class="shop_list_img">
                            <img lazytype="book" :src="info.cover_image" :onerror="defaultImg">
                        </div>
                        <div class="shop_list_info">
                            <!-- <p class="shop_list_info_title" v-if="device_type == 102">{{info.name | deleteTime}}</p>   IOS审核通过后放开此句 去掉v-if -->
                            <p class="shop_list_info_title">{{info.name}}</p>    <!--IOS审核通过后删除此句-->

                            <p class="shop_list_info_sku cl-tip">{{info.validity|validity}}</p> 
                            <!-- <p class="shop_list_info_sku cl-tip" v-else></p>   IOS审核通过后删除此句 -->

                            <ul class="order-serviceinfo cl-invert">
                                <li class="bg-slave">{{info.service_type}}</li>
                            </ul>
                        </div>

                        <!-- 购物车增加数量-->
                        <div class="shop_list_paydata">
                            <p class="price">{{info.order_price | rmbPrice}}</p>
                            <p class="nums cl-tip">X {{info.num}}</p>
                        </div>
                    </div>

                    <!-- 数学教辅知识精讲 -->
                    <div class="shop_list bg-top bc-default" v-if="info.name.indexOf('知识精讲') != -1">
                        <div class="shop_list_img">
                            <img lazytype="book" :src="info.cover_image" :onerror="defaultImg">
                        </div>
                        <div class="shop_list_info">
                            <!-- <p class="shop_list_info_title" v-if="device_type == 102">{{info.name | deleteTime}}</p>   IOS审核通过后放开此句 去掉v-if -->
                            <p class="shop_list_info_title">{{info.name}}</p>    <!--IOS审核通过后删除此句-->

                            <p class="shop_list_info_sku cl-tip">{{info.validity|validity}}</p> 
                            <!-- <p class="shop_list_info_sku cl-tip" v-else></p>   IOS审核通过后删除此句 -->

                            <ul class="order-serviceinfo cl-invert">
                                <li class="bg-slave">{{info.service_type}}</li>
                            </ul>
                        </div>

                        <!-- 购物车增加数量-->
                        <div class="shop_list_paydata">
                            <p class="price">{{info.order_price | rmbPrice}}</p>
                            <p class="nums cl-tip">X {{info.num}}</p>
                        </div>
                    </div>

                    <router-link :to="{name:'Detail',params:{book_id:info.promotion.pid,device_type,bought: 1}}" target="_blank" class="a_no_line" :id="info.pid" v-if="info.promotion">
                        <div class="shop_list bg-top bc-default">

                            <div class="shop_list_img">
                                <img lazytype="book" :src="info.cover_image" :onerror="defaultImg">
                            </div>
                            <div class="shop_list_info">
                                <!-- <p class="shop_list_info_title" v-if="device_type == 102">{{info.promotion.name | deleteTime}}</p>      IOS审核通过后放开此句 去掉v-if -->
                                <p class="shop_list_info_title">{{info.promotion.name}}</p>      <!--IOS审核通过后删除此句-->

                                <p class="shop_list_info_sku cl-tip">{{info.validity|validity}}</p>        <!--IOS审核通过后放开此句 去掉v-if-->
                                <!-- <p class="shop_list_info_sku cl-tip" v-else></p>     IOS审核通过后删除此句 -->

                                <ul class="order-serviceinfo cl-invert">
                                    <li class="bg-slave">{{info.service_type}}</li>
                                </ul>
                            </div>

                            <!-- 商品原金额跟数量-->
                            <div class="shop_list_paydata">
                                <p class="price">{{0|rmbPrice}}</p>
                                <p class="nums cl-tip">X {{info.num}}</p>
                            </div>
                        </div>
                    </router-link>
                

                </div>

                <div class="o_price_freight bg-default bc-slave">
                    <dl>
                        <dt class="cl-tip">实付款</dt>
                        <dd style="font-weight:bolder;color:#feaf5f" v-cloak>{{orderDetail.pay_price|rmbPrice}}</dd>
                    </dl>
                </div>
                <div class="o_cut_off_rule bg-body"></div>
            </div>

            <!--订单信息 -->
            <div class="v3board v3section v3section_inline bg-default" style="padding:10px;">
                <div style="color: #999999;font-size: 12px;line-height: 1.5" v-if="orderDetail.s_state==0">
                    <div>订单编号： {{orderDetail.order_id}}</div>
                    <div>创建时间：{{orderDetail.s_create_time}} </div>
                </div>
                <div style="color: #999999;font-size: 12px;line-height: 1.5" v-else-if="orderDetail.s_state==1">
                    <div>订单编号： {{orderDetail.order_id}}</div>
                    <div>创建时间：{{orderDetail.s_create_time}} </div>
                    <div>订单交易号：{{orderDetail.pay_trade_id}} </div>
                    <div>付款时间：{{orderDetail.pay_time}} </div>
                </div>
                <div style="color: #999999;font-size: 12px;line-height: 1.5" v-else>
                    <div>订单编号： {{orderDetail.order_id}}</div>
                    <div>创建时间：{{orderDetail.s_create_time}} </div>
                    <div>关闭时间：{{orderDetail.cancel_time}} </div>
                </div>
            </div>
            <div class="o_cut_off_rule"></div>
            <div style="height: 70px"></div>

            <!--操作信息 -->
            <div class="order" style="width: 100%;margin: 0;position: fixed;bottom : 0;left:0px;border-top: 1px solid#e5e5e5">
                <div class="o_operator_btn bg-default" style="line-height: 50px">
                    <ul>
                        <li class="v3css_button v3css_button_border bc-master cl-minor" v-show="orderDetail.s_state==-1" @click="confirmDel">删除订单</li>
                        <li class="v3css_button v3css_button_border bc-master cl-minor" v-show="orderDetail.s_state==0" @click="confirmCancel">取消</li>
                        <li class="v3css_button v3css_button_border bc-master cl-minor" v-show="orderDetail.s_state==0" @click="pay(orderDetail)">立即支付</li>
                    </ul>
                </div>
            </div>
            <!-- <div id="progress" style="position:absolute;width:100%;z-index:999;">
                <div style="text-align:center;">
                    <img src="../assets/images/running.gif" style="width:40px;">
                </div>
            </div> -->
        </div>
        <!-- 蒙版层 -->
        <div id="fullscreen_overlay_801" v-show="alertTip" class="fullscreen_overlay bg-minor" @click="alertTip=false"></div>
        <!-- 弹出层 -->
        <div class="v3css_confirm bg-default" v-show="alertTip">
            <div class="confirm_title cl-master">系统提醒</div>
            <div class="confirm_text textline">{{alertTipText}}</div>
            <table class="confirm_command">
                <tbody>
                    <tr>
                        <td style="width: 50%;">
                            <div class="v3css_button v3css_button_max bg-default cl-master v3css_button_border dc-master" @click="alertTip=false">取消</div>
                        </td>
                        <td style="width: 50%;">
                            <div class="v3css_button v3css_button_max bg-master cl-invert" @click="oparateOrder">确认</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 蒙版层 -->
        <div id="fullscreen_overlay_800" class="fullscreen_overlay bg-minor" v-show="loading" @click="loading=false"></div>
        <div id="progress" style="position:absolute;bottom:40px;width:100%;z-index:999;" v-show="loading">
            <div style="text-align:center;">
                <img src="../assets/images/running.gif" style="width:40px;">
            </div>
        </div>

        <!-- 取消订单弹出窗（子组件） -->
        <CancelOrderComponent :showMask="isShowMask" v-on:hideMask="cancleMask" v-on:cancelSure="oparateOrder" v-on:cancelReason="handleCancelReason"></CancelOrderComponent>
    </div>    
</template>
<script>
    import { RemoveOrder, CancelOrder, OrderDetail,PayOrder } from "@/api/http";
    import { iapPay,UpdateTextbook } from "@/api/prompt"
    import CancelOrderComponent from '../components/CancelOrderComponent'
    export default {
        components: {
            CancelOrderComponent,
        },
        data(){
            return {
                orderDetail:"",
                alertTip:false,
                alertTipText:"您确认要取消该订单吗?",
                confirmName:0,
                orderId: this.$route.params.orderId,
                device_type:101, //101 android  102 ios内购
                loading:false,
                defaultImg: 'this.showPage=true;this.src="' + require('../assets/images/gray_1.png') + '"',
                showPage:false,

                // 取消订单弹出窗
                isShowMask: false,   // 是否显示取消订单弹出窗
                cancelReason: '',    // 取消订单原因
                book_id:""
            }
        },
        methods:{
             // 关闭取消订单弹出窗
            cancleMask(value){
                this.isShowMask = value;
            },
            // 取消订单原因
            handleCancelReason(value){
                console.log("取消原因" + value);
                this.cancelReason = value;
            },

            confirmCancel(){
                this.confirmName=0//取消订单
                // this.alertTip=true
                // this.alertTipText="您确认要取消该订单吗?"

                this.isShowMask = true;
            },
            confirmDel(){
                this.confirmName=-1//删除订单
                this.alertTip=true
                this.alertTipText="您确认要删除该订单吗?"
            },
            async oparateOrder(){
                if(!this.confirmName==0){
                    try {
                        // 删除订单
                        const res =await RemoveOrder({
                            access_token:window.access_token,
                            id:this.orderDetail.order_id
                        })
                        console.log(res);
                        this.alertTip=false;
                        this.$router.push({name:"MyOrderAll",params:{order_state:"all"}});
                    } catch (error) {
                        console.log(error)
                    }
                }else{
                    try {
                        // 取消订单
                        const res =await CancelOrder({
                            access_token:window.access_token,
                            id:this.orderDetail.order_id,
                            reason: this.cancelReason
                        })
                        this.alertTip=false;
                        this.$router.push({name:"MyOrderAll",params:{order_state:"all"}});
                    } catch (error) {
                        console.log(error)
                    }
                }
            },
            pay(order){//发起支付
                // 判断下单跟支付是否是同一系统
                if(order.device_type_matched==0){
                    alert("下单跟支付必须在同一系统！")
                    return;
                }
                console.log(order)
                if(this.device_type==101){
                    this.$router.push({name:'Payit',params:{orderId:order.order_id}})
                }else{
                    // 如果支付金额为0，给用户提醒
                    if(order.pay_price/100<=0){
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
                PayOrder({//h5重新发起支付，获取支付信息传给移动端
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
                            alert("支付成功!")
                            // 交互，通知移动端购买完成
                            UpdateTextbook({orderId:order.order_id,book_id:this.book_id,pay_price:order.beans})
                            window.location.reload()
                        }else{
                            this.loading=true
                            iapPay({ //交互，传值给ios
                                out_trade_no:order.order_id,  //订单id
                                product_id:res.result.pay_info.ios_sku  //bookid
                            })
                        }
                    }
                })
                .catch((err)=>{

                })
            }
        },
        created(){
            const ua = navigator.userAgent.toLowerCase()
            if (/iphone|ipad|ipod/.test(ua)) {
                this.device_type=102   //iphone
            } else if (/android/.test(ua)) {
                this.device_type=101   //android
            }
            
            OrderDetail({
                access_token: window.access_token,
                id: this.orderId
            })
            .then((res) => {
                console.log(res)
                this.orderDetail=res.result;
                // 图片预加载，防止页面闪烁
                this.orderDetail.product_info.forEach(element => {
                    const image =new Image();
                    image.src=element.cover_image
                    image.onload=()=>{
                        this.showPage=true
                    }
                    image.onerror=()=>{
                        this.showPage=true
                    }
                });
            }).catch((err) => {
                
            });
            //ios支付完成回传h5页面数据
            app_js_hanler = (message)=>{
                if(JSON.parse(message).command == "iappay_result"){//返回头像url
                    // payType = PRPayTypeIAP
                    // return_code  0 成功 1失败
                    // errstr
                    this.loading=false
                    // 无论支付成功失败，都跳订单详情
                    if(JSON.parse(message).return_code==0){//成功
                        alert("支付成功")
                    }else if(JSON.parse(message).return_code==1){
                        alert("支付失败，请重新支付")
                    }
                    // this.$router.push({name:"reOdetail",params:{orderId:this.orderId}})
                    window.location.reload()
                }
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
        }
    }
</script>
<style>
    [v-cloak] {
        display: none;
    }
</style>

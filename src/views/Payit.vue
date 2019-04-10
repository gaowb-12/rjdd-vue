<template>
    <div>
        <div id="content" v-cloak>
            <div class="v3board v3section v3section_inline bg-default">
                <div class="cl-minor" style="padding:10px 0; line-height:28px;">
                    <!-- <span>支付金额</span>
                    <span class="cl-tip" style="position: absolute;right: 10px;">0.01&nbsp;元</span> -->
                    <div class="o_distribution_mode bg-default bc-slave">
                        <div style="position: relative;padding:0 10px">
                            <div>商品金额</div>
                            <div style="position: absolute;right: 10px;top: 0;color:#eb4e41;">{{ orderDetail.product_info[0].order_price | rmbPrice}}</div>
                        </div>
                    </div>
                    <div class="o_distribution_mode bg-default bc-slave">
                        <div style="position: relative;padding:0 10px">
                            <div>积分折扣</div>
                            <div style="position: absolute;right: 10px;top: 0;color:#eb4e41;">-{{ Math.ceil((orderDetail.product_info[0].order_price - orderDetail.product_info[0].order_price * discount)/100) | discountRmbPrice}}</div>
                        </div>
                    </div>
                    <div class="o_distribution_mode bg-default bc-slave">
                        <div style="position: relative;padding:0 10px">
                            <div>优惠券</div>
                            <div style="position: absolute;right: 10px;top: 0;color:#eb4e41;">-{{orderDetail.coupons*100 | rmbPrice}}</div>
                        </div>
                    </div>
                    <div class="o_distribution_mode bg-default bc-slave">
                        <div style="position: relative;padding:0 10px">
                            <div>学豆</div>
                            <div style="position: absolute;right: 10px;top: 0;color:#eb4e41;">-{{orderDetail.beans*100 | rmbPrice}}</div>
                        </div>
                    </div>
                    <div class="o_distribution_mode bg-default bc-slave">
                        <div style="position: relative;padding:0 10px">
                            <div>合计</div>
                            <!-- <div style="position: absolute;right: 10px;top: 0;color:#eb4e41;">{{orderDetail.pay_price | rmbPrice}}</div> -->
                            <div style="position: absolute;right: 10px;top: 0;color:#eb4e41;">{{orderDetail.product_info[0].order_price - (orderDetail.beans*100) - Math.ceil((orderDetail.product_info[0].order_price - orderDetail.product_info[0].order_price * discount)/100)*100 - (orderDetail.coupons*100) >= 0 ? orderDetail.product_info[0].order_price - (orderDetail.beans*100) - Math.ceil((orderDetail.product_info[0].order_price - orderDetail.product_info[0].order_price * discount)/100)*100 - (orderDetail.coupons*100) : 0 | rmbPrice}}</div>
                        </div>
                    </div>
                </div>


                <form v-if="orderDetail.product_info[0].order_price - (orderDetail.beans*100) - Math.ceil((orderDetail.product_info[0].order_price - orderDetail.product_info[0].order_price * discount)/100)*100 - (orderDetail.coupons*100) > 0">
                    <!-- 支付宝支付 -->
                    <div class="v3item bc-default v3ui v3css_inline pay" style="padding: 5px 15px;">
                        <div :class="{'cl-slave':paySelected=='PAY_ALIPAY'}" class="sel_flg v3inline_prefix cl-assist v3css_icon_radio_selected" value="PAY_ALIPAY" style="vertical-align:45%"></div>
                        <input type="radio" name="pay" value="PAY_ALIPAY" v-model="paySelected">
                        <div class="v3inline_left">
                            <div style=" height: 36px; width: 36px;margin-top: 2px;">
                                <img src="../assets/images/zfb.png" style="width:100%;height:100%">
                            </div>
                        </div>
                        <div class="v3inline_middle" style="vertical-align:70%">
                            <div style="position: absolute; top: 12px; left: 92px;">
                                <div style="font-size:0.9em;">支付宝支付</div>
                                <div class="cl-tip" style="font-size:0.8em;font-weight:normal;">支持信用卡、储蓄卡快捷支付及支付宝</div>
                            </div>
                        </div>
                    </div>
                    <!-- 微信支付 -->
                    <div class="v3item bc-default v3ui v3css_inline" style="padding: 5px 15px;">
                        <div :class="{'cl-slave':paySelected=='PAY_WEIXIN'}" class="sel_flg v3inline_prefix cl-assist v3css_icon_radio_selected" value="PAY_ALIPAY" style="vertical-align:45%"></div>
                        <input type="radio" name="pay" value="PAY_WEIXIN" v-model="paySelected">
                        <div class="v3inline_left">
                            <div style=" height: 36px; width: 36px;margin-top: 2px;">
                                <img src="../assets/images/wx.png" style="width:100%;height:100%">
                            </div>
                        </div>
                        <div class="v3inline_middle" style="vertical-align:70%">
                            <div style="position: absolute; top: 12px; left: 92px;">
                                <div style="font-size:0.9em;">微信支付</div>
                                <div class="cl-tip" style="font-size:0.8em;font-weight:normal;">支持信用卡、储蓄卡快捷支付及微信</div>
                            </div>
                        </div>
                    </div>
                </form>

                <div style="left: 0px; bottom: 0px; line-height: 50px; text-align: center; width: 100%; z-index: 700; font-size: 1.2em; position: fixed;">
                    <div id="btn_buynow" class="v3css_button v3css_button_min cl-invert bg-warn" @click="pay">{{payText}}</div>
                </div>
            </div>

            <!-- 蒙版层 -->
            <div id="fullscreen_overlay_800" class="fullscreen_overlay bg-minor" v-show="loading"></div>
            <div id="progress" style="position:absolute;bottom:40px;width:100%;z-index:999;" v-show="loading">
                <div style="text-align:center;">
                    <img src="../assets/images/running.gif" style="width:40px;">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { PayOrder,QueryResult,OrderDetail,GetUserPoint } from "@/api/http";
    import { thirdPay,PaySuccess,UpdateTextbook } from "@/api/prompt";
    export default {
        name:"Payit",
        data(){
            return {
                paySelected:"PAY_ALIPAY",//选中的支付方式,PAY_ALIPAY:支付宝支付，PAY_WEIXIN：微信支付
                loading:false,
                pay_mode:"",
                payText:"立即支付",
                orderDetail:{},
                discount: 1,    // 用户折扣
                book_id:"",//bookid
            }
        },
        methods:{
            pay(){
                // 如果支付金额为0，给用户提醒
                if(this.orderDetail.pay_price<=0){
                    Confirm({
                        text:"确认支付吗？",
                        confirm:()=>{
                            this.payOrder();
                        }
                    })
                }else{
                    this.payOrder();
                }
            },
            payOrder(){
                this.loading=true;
                this.payText="正在支付..."
                PayOrder({
                    access_token:window.access_token,
                    device_type:"101",//101 Android,102 ios
                    id:this.$route.params.orderId,//订单id
                    pay_mode:this.paySelected=="PAY_ALIPAY"?"102":"101"//101微信，102支付宝
                })
                .then((res)=>{
                    console.log(res)
                    if(res.errcode==110){
                        this.book_id=res.result.book_id  //获取bookid
                        if(!res.result.pay_info){//支付金额0
                            // 交互，通知移动端购买完成
                            UpdateTextbook({orderId:this.$route.params.orderId,book_id:this.book_id,pay_price:this.orderDetail.pay_price/100+this.orderDetail.beans})
                            this.$router.push({name:"Odetail",params:{orderId:this.$route.params.orderId}})
                        }else{
                            const type=this.paySelected=="PAY_ALIPAY"?"alipay":"wxpayReq"
                            thirdPay(type,res.result.pay_info)
                        }
                    }
                })
                .catch((err)=>{
                    this.loading=false;
                    this.payText="立即支付"
                })
            },
            queryResult(timer){
                QueryResult({
                    access_token:window.access_token,
                    id:this.$route.params.orderId
                })
                .then((res)=>{
                    
                    if(res.errcode==110){
                        if(res.result==1){
                            // alert("支付成功")
                            // 通知移动端支付成功
                            PaySuccess({book_id:this.book_id,pay_price:this.orderDetail.pay_price/100+this.orderDetail.beans})
                            this.loading=false;
                            this.payText="立即支付"
                            clearInterval(timer)
                            this.$router.push({name:"Odetail",params:{orderId:this.$route.params.orderId}})
                        }else if(res.result==0 ){
                            // alert("未支付")
                        }else{
                            // alert("用户已取消")
                            this.loading=false;
                            this.payText="立即支付"
                            clearInterval(timer)
                            this.$router.push({name:"Odetail",params:{orderId:this.$route.params.orderId}})
                        }
                    }else{
                        // alert("未知错误")
                        this.loading=false;
                        this.payText="立即支付"
                        clearInterval(timer)
                    }

                })
                .catch((err)=>{
                    this.loading=false;
                    this.payText="立即支付"
                })
            }
        },
        created(){
            // 获取用户积分级别
            GetUserPoint({
                access_token: localStorage.getItem("access_token")
            })
            .then(res => {
                console.log(res)
                this.discount = res.user.discount
            })
            .catch(err => {
                console.log(err);
            });


            OrderDetail({
                access_token: window.access_token,
                id: this.$route.params.orderId
            })
            .then(res=>{
                console.log(res)
                this.orderDetail=res.result
            })
            .catch(err=>{
                console.log(err)
            })
            //第三方支付完成回传h5页面数据
            app_js_hanler = (message)=>{
                if(JSON.parse(message).command == "third_result"){//返回头像url
                    // return_code  0 成功 1失败

                    // 无论支付成功失败，都跳订单详情
                    if(JSON.parse(message).return_code==0){//成功

                        // 埋点,判断支付方式
                        prompt(JSON.stringify({
                            "command": "recordEvent",
                            "id": this.paySelected=="PAY_ALIPAY"?"dd010090":"dd010089"//dd010089微信，dd010090支付宝
                        }));

                        const timer=setInterval(()=>{
                            this.queryResult(timer);
                        },1000)
                        
                    }else if(JSON.parse(message).return_code==1){
                        this.loading=false;
                        this.payText="立即支付"
                        alert("支付失败，请重新支付")
                    }
                }
            }
        }
    }
</script>
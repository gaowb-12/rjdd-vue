<template>
  <div class="bg-body bc-default cl-default">
      <div id="body_inner">
        <div id="content">
            <!--商品信息 -->
            <div class="order eventflag" id="o_None" oid="None">
                <!-- 订单信息 -->
                <div class="o_title bg-default bc-slave" style="margin-bottom:10px;">
                    <div class="o_title_tcont">
                        <img class="o_title_tcont_icon" src="../assets/images/shop.png">
                        <span class="o_title_tcont_name">人教数字公司自营</span>
                    </div>
                </div>
                <!-- 商品信息 -->

                <!-- 浏览订单显示订单详情链接，否则商品链接 -->
                <div v-for="(item, index) in product_list" :key="index">
                    <!-- 点读课程 -->
                    <router-link :to="{name:'Detail',params: {book_id: item.pid,device_type}}" class="a_no_line"  target="_blank" v-if="item.name.indexOf('音频') == -1 && item.name.indexOf('知识精讲') == -1">
                        <div class="shop_list bg-top bc-default" style="background:#fff;">
                            <div class="shop_list_img">
                                <img lazytype="book" :src="item.cover_image" :onerror="defaultImg">
                            </div>
                            <div class="shop_list_info">
                                <!-- <p class="shop_list_info_title" v-if="device_type == 102">{{item.name | deleteTime}}</p>   IOS审核通过后放开此句     -->
                                <p class="shop_list_info_title">{{item.name}}</p>      <!-- IOS审核通过后删除此句 -->                         
                                <!-- <p class="shop_list_info_sku cl-tip" v-if="device_type == 102"></p>  IOS审核通过后放开此句 -->
                                <p class="shop_list_info_sku cl-tip">{{item.validity | month}}个月</p>   <!-- IOS审核通过后删除此句 -->

                                <ul class="order-serviceinfo cl-invert">
                                    <li class="bg-slave">{{item.service_type}}</li>
                                </ul>
                            </div>
                            <!-- 购物车增加数量-->
                            <div class="shop_list_paydata">
                                <p class="price" style=" ">{{item.price | rmbPrice}}</p>
                                <p class="fake_price" v-if="item.is_promotion == 'true'">{{item.price | rmbPrice}}</p>
                                <p class="nums cl-tip">X {{item.num}}</p>
                            </div>
                        </div>
                    </router-link>

                    <!-- 语文音频课程 -->
                    <div class="shop_list bg-top bc-default" style="background:#fff;" v-if="item.name.indexOf('音频') != -1">
                        <div class="shop_list_img">
                            <img lazytype="book" :src="item.cover_image" :onerror="defaultImg">
                        </div>
                        <div class="shop_list_info">
                            <!-- <p class="shop_list_info_title" v-if="device_type == 102">{{item.name | deleteTime}}</p>   IOS审核通过后放开此句     -->
                            <p class="shop_list_info_title">{{item.name}}</p>      <!-- IOS审核通过后删除此句 -->                         
                            <!-- <p class="shop_list_info_sku cl-tip" v-if="device_type == 102"></p>  IOS审核通过后放开此句 -->
                            <p class="shop_list_info_sku cl-tip">{{item.validity | month}}个月</p>   <!-- IOS审核通过后删除此句 -->

                            <ul class="order-serviceinfo cl-invert">
                            <li class="bg-slave">{{item.service_type}}</li>
                            </ul>
                        </div>
                        <!-- 购物车增加数量-->
                        <div class="shop_list_paydata">
                            <p class="price" style=" ">{{item.price | rmbPrice}}</p>
                            <p class="fake_price" v-if="item.is_promotion == 'true'">{{item.price | rmbPrice}}</p>
                            <p class="nums cl-tip">X {{item.num}}</p>
                        </div>
                    </div>

                    <!-- 数学教辅知识精讲 -->
                    <div class="shop_list bg-top bc-default" style="background:#fff;" v-if="item.name.indexOf('知识精讲') != -1">
                        <div class="shop_list_img">
                            <img lazytype="book" :src="item.cover_image" :onerror="defaultImg">
                        </div>
                        <div class="shop_list_info">
                            <!-- <p class="shop_list_info_title" v-if="device_type == 102">{{item.name | deleteTime}}</p>   IOS审核通过后放开此句     -->
                            <p class="shop_list_info_title">{{item.name}}</p>      <!-- IOS审核通过后删除此句 -->                         
                            <!-- <p class="shop_list_info_sku cl-tip" v-if="device_type == 102"></p>  IOS审核通过后放开此句 -->
                            <p class="shop_list_info_sku cl-tip">{{item.validity | month}}个月</p>   <!-- IOS审核通过后删除此句 -->

                            <ul class="order-serviceinfo cl-invert">
                            <li class="bg-slave">{{item.service_type}}</li>
                            </ul>
                        </div>
                        <!-- 购物车增加数量-->
                        <div class="shop_list_paydata">
                            <p class="price" style=" ">{{item.price | rmbPrice}}</p>
                            <p class="fake_price" v-if="item.is_promotion == 'true'">{{item.price | rmbPrice}}</p>
                            <p class="nums cl-tip">X {{item.num}}</p>
                        </div>
                    </div>
                    
                    <router-link :to="{name:'Detail',params: {book_id: item.promotion.pid,device_type}}" class="a_no_line" v-if="item.promotion" target="_blank">
                        <div class="shop_list bg-top bc-default" style="background:#fff;">
                            <div class="shop_list_img">
                                <img lazytype="book" :src="item.cover_image" :onerror="defaultImg">
                            </div>
                            <div class="shop_list_info">
                                <!-- <p class="shop_list_info_title" v-if="device_type == 102">{{item.promotion.name | deleteTime}}</p>   IOS审核通过后放开此句 -->
                                <p class="shop_list_info_title">{{item.promotion.name}}</p>   <!-- IOS审核通过后放开此句 -->
                                <!-- <p class="shop_list_info_sku cl-tip" v-if="device_type == 102"></p>  IOS审核通过后删除此句 -->
                                <p class="shop_list_info_sku cl-tip">{{item.validity | month}}个月</p>   <!-- IOS审核通过后放开此句 -->
                                
                                <ul class="order-serviceinfo cl-invert">
                                <li class="bg-slave">{{item.service_type}}</li>
                                </ul>
                            </div>
                            <!-- 购物车增加数量-->
                            <div class="shop_list_paydata">
                                <p class="price" style=" ">{{0 | rmbPrice}}</p>
                                <p class="fake_price" v-if="item.is_promotion == 'true'">{{item.price | rmbPrice}}</p>
                                <p class="nums cl-tip">X {{item.num}}</p>
                            </div>
                        </div>
                        
                    </router-link>
                </div>
                


                <div class="o_distribution_mode bg-default bc-slave" style="margin:10px 0;">
                    <div style="position: relative;padding:0 10px">
                        <div>商品数量</div>
                        <div style="position: absolute;right: 10px;top: 0">{{total_num}}件</div>
                    </div>
                </div>
                <div class="o_distribution_mode bg-default bc-slave" style="position: relative;padding:0 10px">
                    <div class="v3item  bc-slave v3ui v3css_inline">
                        <div class="v3inline_left">优惠券</div>
                        <div class="v3inline_right_block cl-tip" style="top:0;right:0;" @click="isCoupon=true">
                            <div class="v3inline_right" style="color:#333333;font-weight:bold;">{{selected_coupons.length?"已选"+selected_coupons.length+"张，优惠"+coupon_sum+"元":(my_usable_coupons.length?my_usable_coupons.length+"张优惠券可用":"无优惠券可用")}}</div>
                            <div class="v3inline_postfix v3css_icon_more"></div>
                        </div>
                    </div>
                </div>
                <div class="o_distribution_mode bg-default bc-slave">
                    <!-- ios -->
                    <div style="position: relative;padding:0 10px" v-if="device_type==102">
                        <div>学豆支付</div>
                        <div style="position: absolute;right: 10px;top: 0;color:#eb4e41;">
                            -{{(useBeans)*100 | rmbPrice}}
                        </div>
                    </div>
                    <!-- android -->
                    <div style="position: relative;padding:0 10px;" v-else  @click="isUseXD">
                        <div>使用学豆支付</div>
                        <div class="v3css_icon_radio" :class="{v3css_icon_radio_selected:active}" style="position: absolute;right: 10px;top: 0"></div>
                    </div>
                </div>
                <div class="o_distribution_mode bg-default bc-slave" style="position: relative;padding:0 10px;margin-bottom:10px;">
                    <div class="v3item  bc-slave v3ui v3css_inline">
                        <div class="v3inline_left">学豆余额</div>
                        <div class="v3inline_left" style="color:#333333;font-weight:bold;">￥{{beans_balance}}</div>
                        <div class="v3inline_left" style="color:#eb4e41;font-size:12px;;margin-left:5px;" v-if="!isBalanceEnough">余额不足，请充值！</div>
                        <div class="v3inline_right_block cl-tip" style="top:0;right:0;" @click="recharge">
                            <div class="v3inline_right" style="color:#eb4e41;">学豆充值</div>
                            <div class="v3inline_postfix v3css_icon_more"></div>
                        </div>
                    </div>
                </div>
                <div class="o_distribution_mode bg-default bc-slave">
                    <div style="position: relative;padding:0 10px">
                        <div>商品金额</div>
                        <div style="position: absolute;right: 10px;top: 0;color:#eb4e41;">{{total_price | rmbPrice}}</div>
                    </div>
                </div>
                <div class="o_distribution_mode bg-default bc-slave">
                    <div style="position: relative;padding:0 10px">
                        <div>积分折扣</div>
                        <div style="position: absolute;right: 10px;top: 0;color:#eb4e41;">-{{Math.ceil((total_price - total_price * discount)/100) | discountRmbPrice}}</div>
                    </div>
                </div>
                <div class="o_distribution_mode bg-default bc-slave" v-if="audioType">
                    <div style="position: relative;padding:0 10px">
                        <div>优惠券</div>
                        <div style="position: absolute;right: 10px;top: 0;color:#eb4e41;">-{{coupon_sum*100 | rmbPrice}}</div>
                    </div>
                </div>
                <div class="o_distribution_mode bg-default bc-slave">
                    <div style="position: relative;padding:0 10px">
                        <div>学豆</div>
                        <div style="position: absolute;right: 10px;top: 0;color:#eb4e41;">-{{(useBeans)*100 | rmbPrice}}</div>
                    </div>
                </div>
                <div class="o_distribution_mode bg-default bc-slave">
                    <div style="position: relative;padding:0 10px">
                        <div>合计</div>
                        <!-- <div style="position: absolute;right: 10px;top: 0;color:#eb4e41;">{{ ((total_price-(coupon_sum*100>total_price?total_price:coupon_sum*100)-beans*100) - (total_price - total_price * discount)) >= 0 ? (total_price-(coupon_sum*100>total_price?total_price:coupon_sum*100)-beans*100) - (total_price - total_price * discount) : 0  | rmbPrice }}</div> -->
                        <div style="position: absolute;right: 10px;top: 0;color:#eb4e41;">{{ ((total_price-(coupon_sum*100>total_price?total_price:coupon_sum*100)-beans*100) - Math.ceil((total_price - total_price * discount)/100)*100 ) >= 0 ? (total_price-(coupon_sum*100>total_price?total_price:coupon_sum*100)-beans*100) - Math.ceil((total_price - total_price * discount)/100)*100 : 0  | rmbPrice }}</div>
                    </div>
                </div>

                <div class="o_cut_off_rule bg-body"></div>
            </div>

            <!--操作信息 -->
            <div class="unit_operate bc-slave">
                <input id="forb" type="hidden" value="0">
                <div class="op_container">
                    <div class="op_price" style="line-height: 50px; font-size: 1em;right:0;left:20px;">
                        <div style="font-size: 1.2em;">
                            <!-- 合计： -->
                            <span id="total_price" class="cl-red">{{ ((total_price-(coupon_sum*100>total_price?total_price:coupon_sum*100)-beans*100) - Math.ceil((total_price - total_price * discount)/100)*100 ) >= 0 ? (total_price-(coupon_sum*100>total_price?total_price:coupon_sum*100)-beans*100) - Math.ceil((total_price - total_price * discount)/100)*100 : 0  | rmbPrice }}</span>
                        </div>
                    </div>
                    <div id="oconfirm" class="op_account bg-red" @click="createOrder">
                        提交订单
                    </div>
                </div>
            </div>
            <!-- 蒙版层 -->
            <div id="fullscreen_overlay_800" class="fullscreen_overlay bg-minor" v-show="loading" @click="loading=false"></div>
            <div id="progress" style="position:absolute;bottom:40px;width:100%;z-index:999;" v-show="loading">
                <div style="text-align:center;">
                    <img src="../assets/images/running.gif" style="width:40px;">
                </div>
            </div>

            <!-- 优惠券 -->
            <div id="fullscreen_overlay_800" class="fullscreen_overlay bg-minor" style="opacity:0.6;" v-show="isCoupon" @click="isCoupon=false"></div>
            <div class="coupon-v3"  v-show="isCoupon">

                <div class="tab">
                    <div class="button" :class="{active:active_coupon=='valid'}" @click="tab('valid')">可用优惠券</div>
                    <div class="button" :class="{active:active_coupon=='invalid'}" @click="tab('invalid')">不可用优惠券</div>
                </div>

                <p class="coupon-tip" v-show="active_coupon=='valid'">您已选中优惠券{{selected_coupons.length}}张，可抵用<span style="color:#eb4e41;">{{coupon_sum}}</span>元</p>

                <!-- 可用优惠券 -->
                <div class="coupon used-coupon" v-show="active_coupon=='valid'">
                    <div class="use-coupon-list">
                        <Coupon v-bind:coupon="coupon" v-for="coupon in my_usable_coupons" :key="coupon.id">
                            <i class="coupon-select" :class="{selected:selected_coupons.indexOf(coupon.id)!=-1}"></i>
                            <input type="checkbox" class="coupon-select" :name="coupon.id" :value="coupon.id" v-model="selected_coupons" @click="clickCoupon(coupon.superimposed,coupon.id,$event)" @change="selectCoupon(coupon.id,coupon.face_value)">
                        </Coupon>
                    </div>
                    <!-- <div class="unuse-coupon">不使用优惠券：<input type="checkbox" name="unuse" value="unuse-coupon" v-model="unused_coupons" @change="unuseCoupon"></div> -->
                    <div class="coupon-sure" @click="isCoupon=false">确定</div>
                </div>
                
                <!-- 不可用优惠券 -->
                <div class="coupon unused-coupon" v-show="active_coupon=='invalid'">
                    <div class="use-coupon-list">
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

            </div>
        </div>
      </div>
  </div>
</template>

<script>
import * as http from "@/api/http"
import { iapPay,RechargeXD,UpdateTextbook,backViewController } from "@/api/prompt"
import MyCoupon from "./MyCoupon";
import  Coupon  from "../components/Coupon";

export default {
    name: "OconfirmCombo",
    data() {
        return {
            audioType: true,     // 音频教材类型（不允许使用优惠券）
            id: '',               // 订单id 和 未支付的订单id
            pid: '',              // 主商品ID
            total_num: '',        // 共几件商品
            total_price: "",      // 合计费用
            express_price: '',    // 快递费
            discount: 1,          // 积分折扣
            device_type:this.$route.params.device_type,
            product_list: [],
            loading:false,
            active:false,//是否使用学豆支付
            isCoupon:false,//是否显示优惠券
            isBalanceEnough:true,//ios学豆余额是否充足
            active_coupon:"valid",//切换可用不可用优惠券
            selected_coupons:[],//被选中的优惠券id的集合
            unused_coupons:[],//不使用优惠券
            my_usable_coupons:[],//可用优惠券
            my_unusable_coupons:[],//不可用优惠券
            coupon_sum:0,//抵用优惠券的总额
            isSuperimposed:false,//是否有可叠加优惠券
            beans:"",//学豆个数
            beans_balance:"",//学豆余额
            defaultImg: 'this.src="' + require('../assets/images/gray_1.png') + '"',
            book_id:""
        };
    },
    computed:{
        // 计算使用多少学豆
        useBeans(){
            // 控制是否使用学豆开关
            if(this.active){
                // 优惠券总额
                const coupon_sum= this.coupon_sum*100>this.total_price?this.total_price:this.coupon_sum*100;

                if(this.device_type==101){//android 可以切换是否使用学豆
                    this.beans= (this.total_price-coupon_sum<=this.beans_balance*100?(this.total_price-coupon_sum):this.beans_balance*100)/100 - Math.ceil((this.total_price - this.total_price * this.discount)/100);
                    this.beans < 0 ? this.beans = 0 : this.beans
                }else if(this.device_type==102){//ios 必须使用学豆
                
                    if(this.total_price-coupon_sum<=this.beans_balance*100){
                        //学豆充足
                        this.isBalanceEnough=true;
                        this.beans=(this.total_price-coupon_sum)/100 - Math.ceil((this.total_price - this.total_price * this.discount)/100);
                        this.beans < 0 ? this.beans = 0 : this.beans
                    }else{
                        // 学豆不足
                        this.isBalanceEnough=false;
                        this.beans=0;
                    }
                }
            }
            return this.beans
        }
    },
    methods: {
        createOrder() {
            console.log(this.isBalanceEnough)
            if(!this.isBalanceEnough){
                console.log(this.isBalanceEnough)
                Confirm({
                    text:"余额不足，请充值！",
                    confirm:function(){
                        RechargeXD()
                    }
                })
                return;
            };
            if(this.$route.params.device_type==101){//设备类型101 跳转第三方
                // this.$router.push({ name: 'Payit', params:{orderId: this.id}})
                this.createCommon(()=>{
                    let routeData = this.$router.resolve({ name: 'Payit', params:{orderId: this.id}});
                    window.open(routeData.href,'_blank');
                })
                
            }else{//设备类型102 ios内购
                if((this.total_price-this.coupon_sum*100-this.beans*100)/100 - Math.ceil((this.total_price-this.total_price*this.discount)/100) <= 0){
                    Confirm({
                        text:"确认支付吗？",
                        confirm:()=>{
                            this.createCommon(()=>{
                                this.iosPay()
                            })
                        }
                    })
                }else{
                    this.createCommon(()=>{
                        this.iosPay()
                    })
                }
            }
        },
        createCommon(func){
            console.log(this.selected_coupons.join("_"))
            const data = {
                access_token: window.access_token,
                beans:this.beans,//学豆个数
                coupon_ids:this.selected_coupons.join("_")||"", //优惠券ID串
                device_type: this.$route.params.device_type,   // 	设备类型 101：Android；102：IOS
                // discount: (this.total_price - this.total_price *  this.discount) /100,    // 折扣金额（向上取整，给用户更多优惠，避免出现小数）
                num: this.$route.params.num,
                pid: this.$route.params.pid,
            };
            http.CreateOrder(data)
            .then(res => {
                // console.log(res)
                if(res.errcode == 110){//创建成功
                    this.id = res.result.id  // 未支付的订单id
                    typeof func=="function"?func():"";
                }
                if(res.errcode==1201){
                    this.$router.push({ name: 'OconfirmRemind', params: {nopay_order_id: res.result.nopay_order_id, book_id: this.$route.params.book_id, device_type: this.$route.params.device_type}}) 
                }
            })
            .catch(err => {
                console.log(err)
                // alert("系统异常，请刷新重试！");
            })
        },
        // ios内购
        iosPay(){
            http.PayOrder({//h5重新发起支付，获取支付信息传给移动端
                access_token: window.access_token,
                device_type: "102",//ios
                pay_mode: "103",
                id: this.id
            })
            .then((res)=>{
                // console.log(res)
                if(res.errcode==110){
                    this.book_id=res.result.book_id
                    if(!res.result.pay_info){//支付金额0
                        alert("支付成功!")
                        // 交互，通知移动端购买完成
                        UpdateTextbook({orderId:this.id,book_id:this.book_id,pay_price:this.beans})
                        this.$router.push({name:"Odetail",params:{orderId:this.id}})
                    }else{
                        this.loading=true
                        iapPay({ //交互，传值给ios
                            out_trade_no:this.id,  //订单id
                            product_id:res.result.pay_info.ios_sku  //bookid
                        })
                    }
                }
            })
            .catch((err)=>{

            })
        },
        isUseXD(){
            this.active=!this.active
            if(!this.active){
                this.beans=0
            }
        },
        tab(active){
            this.active_coupon=active
        },
        // 判断优惠券不可用原因
        couponInvalidResult(time){
            if(!time) return true;//判断是否已使用过
            const mytime=new Date(time).valueOf();
            const nowtime=new Date().valueOf();
            return mytime>nowtime
        },
        // 通过点击事件控制选择优惠券
        clickCoupon(superimposed,couponId,event){
            //点击不可叠加的优惠券
            if(superimposed==0){
            
                // 判断是否有其他优惠券被选中，并且当前优惠券没有被选中
                if(this.selected_coupons.length>0&&this.selected_coupons.indexOf(couponId)==-1){
                    event.preventDefault();
                    alert("取消其他才能再次选择!")
                }
                // 判断当前优惠券的选中状态,如果即将被选中，那么抵用金额置零
                else if(this.selected_coupons.indexOf(couponId)==-1){
                    this.isSuperimposed=true//此时有不可叠加优惠券
                    this.coupon_sum=0

                    // 控制优惠券ui状态变化，即将被选中时，当前优惠券被激活，其他置灰
                    document.querySelectorAll("[superimposed]").forEach(element => {
                        element.classList.add("unused")
                    });
                    document.querySelector("[id='"+couponId+"']").classList.remove("unused")

                }
                // 优惠券即将被取消
                else{
                    this.isSuperimposed=false//此时没有不可叠加优惠券
                    // 控制优惠券ui状态变化，即将被取消时，所有优惠券都被激活
                    document.querySelectorAll("[superimposed]").forEach(element => {
                        element.classList.remove("unused")
                    });
                }
                
            }else{//点击可叠加的优惠券
                if(this.isSuperimposed){//如果有不可叠加优惠券已选择
                    event.preventDefault();
                    alert("取消其他才能再次选择!")
                }else{
                    if(this.selected_coupons.length==1&&this.selected_coupons.indexOf(couponId)!=-1){
                        // 控制优惠券ui状态变化，当前是可叠加优惠券时，所有可叠加优惠券被激活，其他不可叠加都被置灰
                        document.querySelectorAll("[superimposed='0']").forEach(element => {
                            element.classList.remove("unused")
                        });
                    }
                    else{
                        // 控制优惠券ui状态变化，当前是可叠加优惠券时，所有可叠加优惠券被激活，其他不可叠加都被置灰
                        document.querySelectorAll("[superimposed='0']").forEach(element => {
                            element.classList.add("unused")
                        });
                        document.querySelector("[superimposed='1']").classList.remove("unused")
                    }
                }
            }
            
        },
        selectCoupon(couponId,money){
            if(this.selected_coupons.indexOf(couponId)!=-1){

                // 判断所选优惠券金额是否大于用户支付金额，然后做限制
                if(this.coupon_sum*100 >=  this.total_price - Math.ceil((this.total_price - this.total_price * this.discount)/100)*100 ){
                    // this.coupon_sum-=Number(money);
                    this.selected_coupons.pop();
                    alert("优惠券金额过大！")
                    return;
                }
                this.coupon_sum+=Number(money);
            }
            else
                this.coupon_sum-=Number(money)
        },
        // 学豆充值
        recharge(){
            RechargeXD()
        },
        // 获取学豆
        getBeans(cancelToken){
            http.GetUserinfo({
                access_token:localStorage.getItem("access_token")
            },cancelToken)
            .then((res)=>{
                // console.log(res)
                if(res.errcode=="110"){
                    this.beans_balance=res.user.beans
                    // 判断当前学豆是否足够支付订单，如果足够，默认选中学豆支付
                    if(this.beans_balance>=this.total_price){
                        this.active=true//选中学豆支付
                    }
                }else{

                }
            })
            .catch((err)=>{

            })
        }
    },
    created() {
        // console.log(this.$route.params.book_id);

        // 获取用户积分级别
        http.GetUserPoint({
            access_token: localStorage.getItem("access_token")
        })
        .then(res => {
            // console.log(res)
            this.discount = res.user.discount
        })
        .catch(err => {
            console.log(err);
        });


        // 获取用户已购买的书籍
        const orderBooks = {
            access_token: window.access_token,
        };
        http.MyOrderbooks(orderBooks)
        .then(res => {
            // console.log(res.books)
            const book_id = this.$route.params.book_id;
            const nowTime = new Date().getTime();
            console.log(res)
            // 已购买书籍--判断bookid
            const isBoughtBooks = res.books.some((item) => {
                return item.bookid == book_id
            });
            // 已购买书籍--判断是否已过期
            const boughtBooks = res.books.filter((item) => {
                return item.bookid == book_id
            });
            let powertime=typeof(boughtBooks[0].powertime)=="number"?boughtBooks[0].powertime:new Date(boughtBooks[0].powertime*1000).getTime();
            if(isBoughtBooks && powertime - nowTime > 0){
                console.log('购买过');
                backViewController();  //与app端交互，重新跳转到音频课程页
            }else{
                console.log('未购买过');
            }

        })
        .catch(err => {
            console.log(err);
        });

        // 用于取消请求
        window.CancelToken = this.$axios.CancelToken;
        window.source = CancelToken.source();
        
        this.$route.params.device_type==102?this.active=true:this.active=false;
        const data = {
            access_token: window.access_token,
            device_type: this.$route.params.device_type, // 	设备类型 101：Android；102：IOS
            num: this.$route.params.num,
            pid: this.$route.params.pid
        };
        http.ConfirmOrder(data)
        .then(res => {
            console.log(res)
            this.total_price = res.result.total_price
            
            this.express_price = res.result.express_price
            this.product_list = res.result.product_list
            this.total_num = this.$route.params.num
            this.pid = res.result.pid         // 主商品ID
            if(res.errcode == 1201){
                this.$router.push({ name: 'OconfirmRemind', params: {nopay_order_id: res.result.nopay_order_id, book_id: this.$route.params.book_id, device_type: this.$route.params.device_type}})
            }
            // 获取total_price完成再获取学豆
            this.getBeans({
                cancelToken: source.token
            })
            // console.log(res.result.product_list[0].name)
            

            // 音频教材类型（不允许使用优惠券）
            if(res.result.product_list[0].name.indexOf('音频') !== -1){
                // this.audioType = false

                // 获取"音频教材"可用优惠券
                http.GetUsableCoupons({
                    access_token:localStorage.getItem("access_token"),
                    book_type: '02'     //使用书籍类型（选填，空：所有；01：点读；02：音频）
                },{
                    cancelToken: source.token
                })
                .then((res)=>{
                    // console.log(res)
                    if(res.errcode==110){
                        this.my_usable_coupons=res.coupons
                    }
                })
                .catch((err)=>{
                    console.log(err)
                });

            }else{
                // 获取"点读教材"可用优惠券
                http.GetUsableCoupons({
                    access_token:localStorage.getItem("access_token"),
                    book_type: '01'     //使用书籍类型（选填，空：所有；01：点读；02：音频）
                },{
                    cancelToken: source.token
                })
                .then((res)=>{
                    // console.log(res)
                    if(res.errcode==110){
                        this.my_usable_coupons=res.coupons
                    }
                })
                .catch((err)=>{
                    console.log(err)
                });
            }            

        })
        .catch(err => {
            console.log(err);
        });
        
        //ios支付完成回传h5页面数据
        app_js_hanler = (message)=>{
            if(JSON.parse(message).command == "iappay_result"){//返回头像url
                // payType = PRPayTypeIAP
                // return_code  0 成功 1失败
                // errstr
                this.loading=false
                // 无论支付成功失败，都跳订单详情
                this.$router.push({name:"Odetail",params:{orderId:this.id}})
                if(JSON.parse(message).return_code==0){//成功
                    alert("支付成功")
                }else{
                    alert("支付失败，请重新支付")
                }
            }
            // //获取充值的结果
            if(JSON.parse(message).command == "recharge_amount"){//返回充值金额
                this.getBeans()
                location.reload()
            }
        }
        // 获取可用优惠券
        /*
        http.GetUsableCoupons({
            access_token:localStorage.getItem("access_token"),
        },{
            cancelToken: source.token
        })
        .then((res)=>{
            // console.log(res)
            if(res.errcode==110){
                this.my_usable_coupons=res.coupons
            }
        })
        .catch((err)=>{
            console.log(err)
        });
        */

        // 获取不可用优惠券
        http.GetUnusableCoupons({
            access_token:localStorage.getItem("access_token")
        },{
            cancelToken: source.token
        })
        .then((res)=>{
            // console.log(res)
            if(res.errcode==110){
                this.my_unusable_coupons=res.coupons
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    components:{
        MyCoupon,
        Coupon
    }
};
</script>
<style scoped>
    .v3css_icon_radio{
        font-size:18px;
        color:#ccc;
    }
    .order{
        margin-bottom: 50px;
    }
    .v3css_icon_radio_selected{
        color:#feaf5f !important;
    }
    .coupon-v3{
        position: fixed;
        width: 100%;
        height: 88%;
        bottom: 0;
        left: 0;
        background-color: #f3f6f9;
        box-sizing: border-box;
        z-index: 801;
    }
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
    div.coupon-sure{
        position: fixed;
        width: 4.8rem;
        bottom: 0.3rem;
        left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        text-align: center;
        line-height: 0.76rem;
        background-color: #eb4e41;
        border-radius:0.38rem;
        font-size:0.28rem;
        color:#fff;
    }
    .coupon-v3 div.unuse-coupon{
        position: absolute;
        height:auto;
        line-height: normal;
        left: 0;
        bottom: 1.15rem;
        padding-left: 0.25rem;
    }
    .coupon-v3 p.coupon-tip{
        line-height: 0.6rem;
        background-color: #fdf3df;
        padding-left: 0.25rem;
    }
    .coupon-v3 .used-coupon{
        height: 63%;
    }
    .coupon-v3 .coupon .use-coupon-list{
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        height: 100%;
        padding: 0.25rem;        
    }
    .coupon-v3 .coupon.unused-coupon{
        height:82%;
    }
    .coupon-v3 input.coupon-select{
        opacity: 0;
    }
    .used-coupon .item-coupon:nth-last-of-type(1){
        margin-bottom: 0;
    }
    .unused-coupon .item-coupon:last-of-type{
        margin-bottom: 0;
    }
    #oconfirm.isBalanceEnough{
        background-color: #bebdbd;
    }
</style>

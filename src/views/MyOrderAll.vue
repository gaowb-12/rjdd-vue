<template>
    <div class="container" ref="container">
        <div id="content" ref="content">
            <!--tabs示例-->
            <div id="mytabs" class="v3ui v3ui_tabs">
                <!--选项卡区域-->
                <table id="tabs_header" class="tabs_header">
                    <tr>
                        <td id="tab_1" class="tabs_title cl-tip" :class="{tabs_selected:order_state=='all'}" style="width: 25%;">
                            <router-link :to="{params:{order_state:'all'}}" replace @click.native="getlist">全部</router-link>
                        </td>
                        <td id="tab_2" class="tabs_title cl-tip" :class="{tabs_selected:order_state=='unpaid'}" style="width: 25%;">
                            <router-link :to="{params:{order_state:'unpaid'}}" replace @click.native="getlist">待付款</router-link>
                        </td>
                        <td id="tab_3" class="tabs_title cl-tip" :class="{tabs_selected:order_state=='close'}" style="width: 25%;">
                            <router-link :to="{params:{order_state:'close'}}" replace @click.native="getlist">交易关闭</router-link>
                        </td>
                        <td id="tab_4" class="tabs_title cl-tip" :class="{tabs_selected:order_state=='finish'}" style="width: 25%;">
                            <router-link :to="{params:{order_state:'finish'}}" replace @click.native="getlist">交易完成</router-link>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="list_order">
                <!-- 加载订单组件 -->
                <MyOrder ref="aaa" v-bind:order_state="order_state" v-bind:orderList="orderList" v-on:re-order="getOrder" v-on:ca-order="getOrder" v-on:clickCancleBtn="cancleMask" />

                <!-- 滚动加载 -->
                <div class="v3morebox" style="padding:15px 0px;background-color:white;" v-show="!loadingMore">
                    <table style="width:100%;border-spacing:0px;border-collapse:separate;">
                        <tr>
                            <td style="vertical-align:middle;text-align:right;width:40%;padding-right:10px;">
                                <img src="../assets/images/running.gif" style="width:30px;">
                            </td>
                            <td style="vertical-align:middle;text-align:left;font-size:12px;color:#999999;">
                                <div>正在努力加载</div>
                            </td>
                        </tr>
                    </table>
                </div>

            </div>
        </div>

        <!-- 蒙版层 -->
        <div id="fullscreen_overlay_800" v-show="alertTip" class="fullscreen_overlay bg-minor" @click="alertTip=false"></div>
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
                            <div class="v3css_button v3css_button_max bg-master cl-invert" @click="cancelOrder">确认</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


        <!-- 取消订单弹出窗（子组件） -->
        <CancelOrderComponent :showMask="isShowMask" v-on:hideMask="cancleMask" v-on:cancelSure="cancelOrder" v-on:cancelReason="handleCancelReason"></CancelOrderComponent>
    </div>
</template>
<script>
    import MyOrder from "../components/MyOrder";
    import CancelOrderComponent from '../components/CancelOrderComponent'
    import { GetOrderList,RemoveOrder,CancelOrder } from "@/api/http";
    import { iapPay } from "@/api/prompt"
    export default {
        name: 'MyOrderAll',
        data () {
            return {
                order_state:this.$route.params.order_state,
                orderType:{//订单类别: -1：交易关闭（已取消） 0：全部 1：待付款 2：交易完成.
                    'close':-1,
                    'all':0,
                    'unpaid':1,
                    'finish':2
                },
                page_no:1,//当前页
                page_size:8,//每页记录数量(通知接口)
                orderList:"",//订单数
                _APP_RESULT_COUNT:"",//总记录
                page_num:8,//每页固定数据量(步长)
                loadingMore:false,
                alertTip:false,
                alertTipText:"您确认要删除该订单吗?",
                orderId:"",
                oprateOrder:"",


                // 取消订单弹出窗
                isShowMask: false,   // 是否显示取消订单弹出窗
                cancelReason: '',    // 取消订单原因
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


            getlist(){//获取数据
                GetOrderList({
                    access_token:window.access_token,
                    page_no:this.page_no,
                    page_size:this.page_size,
                    type:this.orderType[this.order_state]
                })
                .then((res)=>{
                    console.log(res)
                    this.orderList=res.result._APP_RESULT_LIST//当前页记录详情
                    this._APP_RESULT_COUNT=res.result._APP_RESULT_COUNT//总记录

                    if(this._APP_RESULT_COUNT<=this.page_size) {//当前页的记录数大于等于总记录
                        this.loadingMore=true;
                        return
                    };
                })
                .catch((err)=>{
                    console.log(err)
                })
            },
            // 接收子组件传值,获取子组件传递的orderId
            getOrder(params){                
                this.oprateOrder=params.name
                this.orderId=params.order_id
                if(this.oprateOrder==0){                    
                    // this.alertTipText="您确认要取消该订单吗?"
                }else{
                    this.alertTip=true;
                    this.alertTipText="您确认要删除该订单吗?"
                }
            },
            //操作订单
            async cancelOrder(){
                
                if(!this.oprateOrder==0){
                    try {
                        // 删除订单
                        const res =await RemoveOrder({
                            access_token:window.access_token,
                            id:this.orderId
                        })
                        console.log(res);
                        this.alertTip=false;
                        this.getlist();//重新获取数据
                        
                    } catch (error) {
                        console.log(error)
                    }
                }else{
                    try {
                        // 取消订单
                        console.log(this.orderId)
                        const res =await CancelOrder({
                            access_token:window.access_token,
                            id:this.orderId,
                            reason: this.cancelReason     // 取消订单原因
                        })
                        console.log(res);
                        this.alertTip=false;
                        this.getlist();//重新获取数据
                        
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        },
        mounted(){
            this.getlist();

            document.addEventListener("scroll",(e)=>{//滚动加载更多
                if(this.loadingMore) return;//控制开关

                if(this._APP_RESULT_COUNT<=this.page_size) {//当前页的记录数大于等于总记录
                    this.loadingMore=true;
                    return 
                };
                const body = document.body;
                const offsetHeight =body.offsetHeight
                const scrollTop =window.pageYOffset||0
                const clientHeight =window.innerHeight||0

                if(offsetHeight-scrollTop-clientHeight<=10){
                    this.loadingMore=true;
                    this.page_size+=this.page_num
                    const aaa=async ()=>{
                        await this.getlist();
                        this.loadingMore=false;
                    }
                    aaa()
                }
            })
            
        },
        beforeRouteUpdate (to, from, next){
            next();
            this.order_state=this.$route.params.order_state;
        },
        components:{
            MyOrder,
            CancelOrderComponent
        }
    }
</script>

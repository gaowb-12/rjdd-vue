<template>
    <div>
        <div id="content" v-show="showPage">
            <div class="v3board v3section v3section_inline bg-top">
                <div class="unit_touchslider">
                    <img :src="book.title_image" :alt="book.name" :onerror="defaultImg">
                </div>
                <div class="unit_brief bc-slave bg-default">                   

                    <div class="title" style="font-size:1.3em;">
                        {{book.name}}
                    <span class="item audio bg-warn cl-invert" style="font-size:0.6em">{{book.service_type}}</span>
                        <span class="item2 audio cl-minor dc-red cl-red">{{book.refund_type}}</span>
                    </div>

                    <div class="subtitle cl-minor">{{book.title_text}}</div>

                    <div class="price_item price_op cl-red">
                        <span class="price">{{book.price | rmbPrice}}</span>
                        <span class="points"></span>
                    </div>

                    <div class="price_item cl-tip" id="price_fake" style="font-size: 0.85em;">
                        <span class="price_fake">价格</span>
                        <span class="fprice price_fake">{{book.price_old | rmbPrice}}</span>
                        <span>已有&nbsp;{{book.user_count | userCount}}万&nbsp;人订购</span>
                    </div>

                </div>
            </div>

            <!-- 促销 -->
            <div class="v3board v3section v3section_inline bg-default" v-if="isShowCX">
                <div class="unit_gift">
                    <div class="gtitle bc-slave">
                        <span class="gname audio cl-minor">促销</span>
                        <span class="gname2 audio cl-minor dc-red cl-red">{{book.products[0].promotion.type}}</span>
                        <!-- <span class="gname2 audio cl-minor dc-red cl-red">限时促销</span> -->
                    </div>

                    <div class="items">
                        <!-- 初始化显示 -->
                        <div class="itme" v-if="init">
                            <router-link :to="{name: 'Detail', params: {book_id: book.products[0].promotion.pid}}" @click.native="followRead">
                                <div class="v3item  bc-slave item_inline p_detail">
                                    <!-- <div class="item_info" v-if="device_type == 102">{{book.promotion.name | deleteTime}}</div>     IOS审核后放开此句 -->
                                    <div class="item_info">{{book.promotion.name}}</div>    <!--IOS审核后放开此句-->
                                    <div class="item_left v3css_icon_more"></div>
                                </div>
                            </router-link>
                        </div>

                        <!-- 点击切换后显示 -->
                        <div class="itme" v-if="no_init">
                            <router-link :to="{name: 'Detail', params: {book_id: book.promotion.pid}}" @click.native="followRead">
                                <div class="v3item  bc-slave item_inline p_detail">
                                    <div class="item_info">{{book.promotion.name}}</div>
                                    <div class="item_left v3css_icon_more"></div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <div class="v3board v3section v3section_inline bg-default unit_select" v-if="chooseSwitch">
                <div class="stitle cl-minor">
                    <span>请选择</span>
                </div>
                <div class="v3items cl-default bg-default bc-default">
                    <div class="v3item bc-default v3ui v3css_inline sku" v-for="(product,index) in book.products" :key="product.pid">
                        <div :class="{'cl-slave':validity==product.validity}" class="sel_flg v3inline_prefix cl-assist v3css_icon_radio_selected" style="padding-bottom:3px;"></div>
                        <div class="v3inline_left" price="1" points="0"> {{product.validity | month}}个月</div>
                        <div class="v3inline_middle"></div>
                        <div class="v3inline_right_block cl-red">
                            <div class="v3inline_right ">
                                <span>{{product.price | rmbPrice}}</span>
                            </div>
                        </div>
                        <input type="radio" name="aaaa" :value="product.validity" v-model="validity" @change="getPrice(product,index); initTab()">
                    </div>
                </div>

            </div>
            <div class="v3board v3section v3section_inline bg-default" style="margin-bottom:0px;">
                <div class="unit_content  bg-default">
                    <div class="ctitle bc-slave cl-minor">
                        详情信息
                    </div>
                    <div class="cdetail bc-slave cdetail2">
                        <p v-for="(item, index) in book.content_image" :key="index">
                            <img :src="item" :onerror="defaultImg">
                        </p>                        
                    </div>
                </div>
            </div>

            <!--操作信息 -->
            <div class="unit_operate bc-slave" style="z-index:2;" v-if="bought">
                <div class="op_container">
                    <router-link :to="{name: 'OconfirmCombo', params: {pid: book.pid, num: this.num, book_id: this.book_id,device_type}}" target="_blank" class="op_account bg-red">
                        立即购买
                    </router-link>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
    import { Detail } from "@/api/http";

    export default {
        name: "Detail",
        data() {
            return {
                chooseSwitch: true,              // 请选择开关，IOS审核不显示（等审核通过后再放开）
                init: true,
                no_init: false,
                bought: true,                               // 控制是否显示"立即购买"按钮（从已下订单点击到详情不显示，解决不可重复购买问题）
                validity:"",
                book_id: this.$route.params.book_id,        // 教材ID (移动端传参过来) 1211001101161 (无) / 1212001101123 (有)
                device_type: this.$route.params.device_type,                     // 设备类型(需要移动端传过来) Android(101)/IOS(102)
                isShowGM: false,                // 是否显示购买提示条
                isShowCX: false,                // 是否显示促销赠送信息
                num: '',                        // 数量
                index: 0,
                defaultImg: 'this.showPage=true;this.src="' + require('../assets/images/gray_2.png') + '"',
                showPage:false,//控制页面闪烁

                book: {}
            }
        },
        created() {
            // console.log(this.$route.params.bought)
            if(this.$route.params.bought == 1){
                this.bought = false
            }

            const book_id = this.$route.params.book_id
            // console.log(book_id)
            if(book_id.indexOf("-") >= 0){
                let data = {
                    access_token: window.access_token,
                    device_type: this.device_type,
                    pid: this.$route.params.book_id
                }
                this.isShowGM = false
                this.followRead(data)
                return;
            }else{
                let data = {
                    access_token: window.access_token,
                    book_id: this.book_id,
                    device_type: this.device_type
                }
                this.isShowGM = true
                this.clickRead(data)
            }

            /*
            const data = {
                access_token: window.access_token,
                book_id: this.book_id,
                device_type: this.device_type
            }
            this.clickRead(data)
            */
        },
        mounted(){
            
            // IOS审核
            // if(this.device_type == 102){
            //     this.chooseSwitch = false
            // }

            // console.log(this.$route.params.book_id)
        },        
        methods: {
            initTab(){
                this.init = false
                this.no_init = true
            },

            getPrice(product,index){
                this.book.price=product.price
                this.book.price_old=product.price_old
                this.book.pid=product.pid
                this.book.promotion = product.promotion

                console.log(this.book.promotion.pid)
            },

            // 点读--商品详情
            clickRead(data){
                
                Detail(data)
                .then(res => {
                    console.log(res)
                    this.book = {
                        content_image: res.result.content_image.split(","), // 详情图片
                        name: res.result.name,                              // 商品名称
                        // pid: res.result.pid,                                // pid
                        price: res.result.price,                            // 价格
                        price_old: res.result.price_old,                    // 旧价格
                        refund_type: res.result.refund_type,                // 不支持退订
                        service_type: res.result.service_type,              // 在线服务
                        title_image: res.result.title_image,                // 顶部大图
                        title_text: res.result.title_text,                  // 描述
                        user_count: res.result.user_count,                  // 订购人数
                        validity: res.result.validity,                      // 请选择有效期
                        products:res.result.products,                       // 
                    }
                    // 初始化
                    this.validity=this.book.products[0].validity
                    this.getPrice(this.book.products[0])
                    // 图片预加载，防止页面闪烁
                    const image =new Image();
                    image.src=this.book.title_image
                    image.onload=()=>{
                        this.showPage=true
                    }
                    image.onerror=()=>{
                        this.showPage=true
                    }
                    /*
                    if(window.user_id == 100098){                           //测试用户账号，价格显示0.01
                        this.book.price = 1
                    }
                    */

                    if(res.result.products[0].promotion){
                        this.num = 2
                        this.isShowCX = true

                        // this.isShowGM = true
                        this.book.promotion = {                          // 促销信息
                            name: this.book.promotion.name,                // 促销商品名称  (IOS审核通过后放开此句)
                            pid: this.book.promotion.name.pid,                  // 促销商品ID
                            type: this.book.promotion.name.type                 // 促使类型 (限时赠送)
                        }
                    }else{
                        this.num = 1
                        this.isShowCX = false
                        // this.isShowGM = false
                        this.book.promotion = ""
                        /*
                        this.book.promotion = {     // 促销信息
                            name: "",                   // 促销商品名称
                            pid: "",                    // 促销商品ID
                            type: ""                    // 促使类型 (限时赠送)
                        }
                        */
                    }
                })
                .catch(err => {
                    console.log(err)
                    // alert("系统异常，请刷新重试！")
                })
            },
            // 跟读--商品详情
            followRead(){                
                var data = {
                    access_token: window.access_token,                    
                    device_type: this.device_type,
                    pid: this.$route.params.book_id,
                }
                this.isShowGM = false
                this.clickRead(data)
            }
        }
    }
</script>
<style scoped>
    [v-cloak] { display: none }
</style>


<template>
    <div class="bg-body bc-default cl-default">
            <div id="body_inner">
                <div id="content">

                    <div class="v3ui_newcomment v3ui_forms" style="overflow: hidden;">

                        <div class="v3board v3section v3section_inline">
                            <div class="v3title cl-default">
                                <span class="v3css_icon_title_triangle cl-master"></span>
                                <span>反馈内容</span>
                            </div>
                            <div class="v3items cl-default bg-default bc-default">
                                <div class="v3item bc-default v3ui v3css_inline v3ui_inline_edit">
                                    <div class="v3inline_left">标题：</div>
                                    <div class="v3inline_middle cl-tip"><input v-model="title" type="text" class="v3css_input" maxlength="64" placeholder="请输入标题" /></div>
                                </div>
                            </div>
                        </div>
                        <div class="v3board bg-default">
                            <div class="nr_tip cl-red"></div>
                            <div class="v3ui v3ui_richdiv bg-default bc-default">
                                <textarea v-model="content" placeholder="问题描述" class="comment_content"></textarea>
                            </div>
                        </div>

                        <div id="comment_image" class="v3board v3board_inner bg-default">
                            <div class="v3ui v3ui_image_upload" id="imgupload" style="border-bottom-width:0px;padding-bottom:0px;"
                                image_tip="请上传问题截图" imagelimitip="" imagelimit="" max_upload="4">
                                <div class="image_tip cl-tip">请上传问题截图</div>
                                <div class="nbiu_container">                                    
                                    
                                    <!-- "+"号上传图片 -->
                                    <div class="nbiu_inrect bc-default" style="width: 70px; line-height: 70px; margin: 10px 12px 10px 5px;" v-for="(item,index) in imgs" :key="index">
                                        <div class="v3css_icon_plus cl-assist"></div>
                                        <img class="nbiu_preview" :src="item">
                                        <div class="nbiu_cancel" v-if="feedbackUploadFinshed" @click="cancelUpload(index)"></div>
                                    </div>
                                    <div class="nbiu_inrect bc-default" v-if="fourHidden" style="width: 70px; line-height: 70px; margin: 10px 5px;" @click="uploadFeedImgs">
                                        <div class="v3css_icon_plus cl-assist"></div>
                                        <img class="nbiu_preview">
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="v3board v3section v3section_inline" style="margin-bottom: 50px;">
                            <div class="v3title cl-default">
                                <span class="v3css_icon_title_triangle cl-master"></span>
                                <span>用户信息</span>
                            </div>
                            <div class="v3items cl-default bg-default bc-default">
                                <div class="v3item bc-default v3ui v3css_inline v3ui_inline_edit" name="username" value="" id="content_name" data-inlineedit="{ &quot;maxlength&quot;:20 , &quot;input_tip&quot;:&quot;联系方式（手机号或Email）&quot;}">
                                    <div class="v3inline_prefix v3css_icon_cellphone"></div>
                                    <div class="v3inline_left"></div>
                                    <div class="v3inline_middle cl-tip"><input style="width:90%;" v-model="contact_way" type="text" class="v3css_input" placeholder="联系方式（手机号或Email）" /></div>
                                    <div class="v3inline_right_block cl-tip">
                                        <div class="v3inline_right">绝对保密</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="v3ui v3ui_nc_toolbar bg-body cl-minor bc-master" style="visibility: inherit;">
                            <div class="v3ui_nc_toolbar_inner v3css_fix_bottom_bar">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td class="nct_left">
                                                <div id="nct_action_upload" class="nct_unit v3css_icon_graphic_identify" style="display: inline-block;">
                                                    <div class="nct_action_tooltip bg-master cl-invert">{{imgCount}}</div>
                                                </div>
                                                <!--<div id="nct_action_emotion" class="nct_unit v3css_icon_emoji"></div>-->
                                            </td>
                                            <td class="nct_right">
                                                <div class="nct_unit" id="nct_edittrack"></div>
                                                <div class="v3ui v3ui_location nct_unit">
                                                    <span class="v3css_control_icon v3css_icon_location cl-ok"></span>
                                                    <span class="v3css_control_text">{{postion}}</span>
                                                </div>
                                                <div class="v3ui v3ui_app_menucontrol nct_unit v3css_button v3css_button_min bg-master cl-invert" @click="submitFeedback">提交反馈</div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            

            <!-- 蒙版层 -->
            <div class="fullscreen_overlay bg-minor" style="position:fixed;" v-if="mask" @click="closeMask"></div>
            <!-- 提醒弹出层 -->
            <div v-if="remind" class="v3css_confirm bg-default v3css_overlay_autodestroy fullscreen_overlay_modal_item" clickhide="destroy" middle_align="bottom" style="position: fixed; z-index: 803; width: 100%; left: 0px; top: auto; bottom: 0px;">            
                <div class="confirm_title cl-master">提醒</div>            
                <div class="confirm_text textline">{{remind_text}}</div>
                <table class="confirm_command">                
                    <tbody>
                        <tr>
                            <td style="width: 100%;"><div class="v3css_button v3css_button_max bg-master cl-invert" @click="remind=mask=false">确认</div></td>
                        </tr>            
                    </tbody>
                </table>
            </div>

            <!-- 反馈提交信息提示 -->
            <div class="v3css_rs_feedback" v-if="response">
                <img class="v3css_rs_runimg" :src="response_img">
                <div class="v3css_rs_info cl-invert">{{response_text}}</div>
            </div>
    </div>
</template>

<script>
import * as http from "@/api/http";
import { uploadFeedback } from "@/api/prompt"

export default {
    name: "FeedbackComment",
    data() {
        return {
            imgCount: 4,
            feedbackUploadFinshed: false,   // 控制用户上传截图
            fourHidden: true,              // 用户上传4张后隐藏
            remind: false,                  // 控制提醒弹出层
            mask: false,                    // 控制蒙版层
            response: false,                // 提交反馈响应
            response_img: null,             // 反馈响应的图片
            response_text: null,            // 反馈响应内容
            remind_text: null,              // 提醒的内容
            title: "",                      // 反馈标题
            content: "",                    // 反馈内容                        
            contact_way: "",                // 联系方式
            imgs: [],
            postion: this.$route.params.positiopn,                 // 位置
            dev_name: this.$route.params.dev_name,            // 设备名称
            postion_data: this.$route.params.positiopn_data,        // 位置详情
            ua_data: this.$route.params.ua_data,                  // ua
            user_id: window.user_id,
            user_name: null
        }
    },
    created(){
        http.GetUserinfo({
            access_token:localStorage.getItem("access_token")
        })
        .then((res)=>{
            console.log(res.user)
            if(res.user.nickname){
                this.user_name = res.user.nickname
            }else if(res.user.mobile){
                this.user_name = res.user.mobile
            }else if(res.user.reg_name){
                this.user_name = res.user.reg_name
            }else {
                this.user_name = res.user.user_id
            }
        })
        .catch((res)=>{

        });

        // 获取用户设备信息
        /*
        const message = {
                            "command" : "feedbackUploadFinshed",
                            "ossurl" : "http://rjdduploadw.mypep.cn/user/100098/feedback/feedbackIcon_1531892856EcSJClw.png"
                        }
        */
        app_js_hanler = (message) =>{
            if(JSON.parse(message).command == "feedbackUploadFinshed"){
                this.imgCount--
                if(this.imgCount==0) this.imgCount=0
                this.feedbackUploadFinshed = true
                this.imgs.push(JSON.parse(message).ossurl)
                if(this.imgs.length == 4){
                    this.fourHidden = false
                }
            }
        }
    },
    methods: {
        // 关闭蒙版层
        closeMask(){
            this.mask = this.remind = this.response = false
        },
        // 提交反馈
        submitFeedback(){
            if(this.title.length == 0){
                this.mask = this.remind = true
                this.remind_text = "亲，标题不能为空哦，谢谢！"
            }else if(this.content.length < 5){
                this.mask = this.remind = true
                this.remind_text = "亲，别这样惜字如金，请至少输入5个字，谢谢！"
            }else{

                /*
                var user_name;
                if(this.user_name.length == 0){
                    user_name = this.user_id
                }else{
                    user_name = this.user_name
                }
                */

                this.mask = this.response = true
                this.response_img = require('../assets/images/running.gif')
                this.response_text = "正在提交您的反馈！"

                http.FeedbackCreate({
                    title: this.title,                      // 反馈标题
                    content: this.content,                  // 反馈内容
                    dev_name: this.dev_name,                // 设备名称
                    contact_way: this.contact_way,          // 联系方式
                    imgs: this.imgs,
                    postion: this.postion,                  // 位置
                    postion_data: this.postion_data,        // 位置详情
                    ua_data: this.ua_data,
                    user_id: this.user_id,
                    user_name: this.user_name
                })
                .then(res => {
                    // console.log(res);
                    if(res.errcode == 110) {
                        
                        this.mask = this.response = true
                        this.response_img = require('../assets/images/tip.gif')
                        this.response_text = "您的信息反馈已成功提交！"
                        setTimeout(()=>
                            this.$router.push({name: "feedback"})
                        ,1000)

                    }else{
                        this.mask = this.response = true
                        this.response_img = require('../assets/images/fault.gif')
                        this.response_text = "系统错误：未知错误！"
                    }
                })
                .catch(err => {
                    console.log(err);
                    // alert("系统异常，请刷新重试！");
                    this.mask = this.response = true
                    this.response_img = require('../assets/images/fault.gif')
                    this.response_text = "系统错误：未知错误！"
                });
            }
        },
        // 点击"+"上传图片与app端交互
        uploadFeedImgs(){
            uploadFeedback();
        },
        // 取消上传
        cancelUpload(index){
            this.imgs.splice(index,1);
            this.imgCount++
            if(this.imgs.length < 4){
                this.fourHidden = true
            }
        }
    }
}
</script>

<style scoped>
input, textarea {
    font-size: 14px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type="number"]{
    -moz-appearance: textfield;
}

.box {
    position: relative;
}
.word {
    left: 0;
    bottom: 0;
    position: absolute;
    font-size: 14px;
    color: #ff0000;
    padding: 5px;
    width: 30px
}
.comment_content {
    width: 100%;
    height: 100%;
    outline: none;
    overflow: auto;
    resize: none;
    padding: 10px;
    min-height: 180px;
    font-family: "微软雅黑";
    box-sizing: border-box;
}
.v3inline_middle.cl-tip {
    width: calc(100% - 50px);
}

.v3css_rs_feedback {
    padding: 20px;
    text-align: center;
    padding-left: 0px;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 801;
    background: #35c79c;
}
.v3css_rs_feedback .v3css_rs_runimg {
    margin-right: 10px;
    vertical-align: middle;
    width: 24px;
}
.v3css_rs_feedback .v3css_rs_info {
    display: inline-block;
    font-size: 0.85em;
}
.v3css_rs_feedback .v3css_rs_info.cl-invert {
    color: #ffffff;
}
</style>


<template>
    <div>
        <div id="content" :class="{ fixed: isFixed }">
            <div class="v3section v3section_inline">
                <div class="v3title cl-default" style="font-size: 1em;">
                    <span class="v3css_icon_public_infor cl-master" style="padding:0 5px; display: block; float:left; margin: 0 5px 0 0; font-size: 1.2em;"></span>
                    <span>公开信息</span>
                </div>

                <div class="v3items cl-default bg-default bc-default">
                    <!-- 上传头像 -->
                    <div class="v3item bc-default v3css_inline" style="line-height: 0;">
                        <div class="v3inline_left" style="line-height:80px;">头像</div>
                        <div class="v3inline_right_block v3ui_image_upload">
                            <form enctype="multipart/form-data" style="display: inline-block; margin-right: 0px;" @click="UploadHeader">
                                <div class="nbiu_inrect bc-default" style="width: 80px;height: 80px; line-height:80px;">
                                    <div class="v3css_icon_plus cl-assist" v-show="!head_image"></div>
                                    <img class="nbiu_preview" :src="head_image" v-show="head_image">
                                    <!-- <input class="nbiu_imginput" type="file" accept="image/*" name="imgfile" style="left:0;width: 100%;" @change="uploadFile($event)"> -->
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- 选择系统头像 -->
                    <div class="v3item bc-default v3css_inline" style="text-align: right;border: 0;padding-top:0px;">
                        <span class="v3css_button_min  bg-master cl-invert" @click="selected='head_img'; addFixed();" style="display: inline-block;">选择系统头像</span>
                    </div>

                    <!-- 设置昵称 -->
                    <div class="v3item bc-default v3css_inline nickname" @click="setNickname">
                        <div class="v3inline_left nicheng">昵称</div>
                        <div class="v3inline_right_block cl-tip" v-show="!nicknameShow">
                            <div class="v3inline_right  cl-tip">{{user.nickname?user.nickname:"未设置"}}</div>
                        </div>
                        <div class="v3inline_middle cl-tip setnickname" v-show="nicknameShow">
                            <input class="v3css_input" type="text"  maxlength="20" v-model.trim="nickname" ref="nicknameInput" style="font-size: 14px;"  @blur="saveNickname">
                        </div>
                    </div>

                    <!-- 设置年级 -->
                    <div class="v3item bc-default v3css_inline">
                        <div class="v3inline_left">年级</div>
                        <div class="v3inline_right_block cl-tip" @click="selected='grade'; addFixed();">
                            <div class="v3inline_right">{{user.grade?grades[user.grade-1]:"未设置"}}</div>
                        </div>
                    </div>

                    <!-- 设置版本(1~6年级) -->
                    <div class="v3item bc-default v3css_inline" v-if="en_version">
                        <div class="v3inline_left">英语版本</div>
                        <div class="v3inline_right_block cl-tip" @click="selected='eng_ver'; addFixed();">
                            <div class="v3inline_right">{{user.eng_ver?user.eng_ver:"未设置"}}</div>                            
                        </div>
                    </div>
                    <!-- 设置版本(7~9年级初中版本) -->
                    <div class="v3item bc-default v3css_inline" v-if="en_junior">
                        <div class="v3inline_left">英语版本</div>
                        <div class="v3inline_right_block cl-tip">
                            <div class="v3inline_right">初中</div>                            
                        </div>
                    </div>

                    <!-- 设置年龄 -->
                    <div class="v3item bc-default v3css_inline">
                        <div class="v3inline_left">年龄</div>
                        <div class="v3inline_right_block cl-tip" @click="selected='age'; addFixed();">
                            <div class="v3inline_right ">{{user.age?user.age+"岁":"未设置"}}</div>
                        </div>
                    </div>

                </div>
                <div class="v3title cl-default">
                    <span class="v3css_icon_lock cl-master" style="padding:0 5px;font-size: 1.2em;"></span>
                    <span>保密信息</span>
                </div>

                <!-- 设置性别 -->
                <div class="v3items cl-default bg-default bc-default">
                    <div class="v3item bc-default v3css_inline">
                        <div class="v3inline_left">孩子性别</div>
                        <div class="v3inline_right_block cl-tip" @click="selected='sex'; addFixed();">
                            <div class="v3inline_right">{{user.sex==2?"男":(user.sex==1?"女":"未设置")}}</div>
                        </div>
                    </div>
                </div>

                <div style="padding: 20px 10px;">
                    <div align="center" class="v3css_button_max  bg-master cl-invert" @click="saveUserinfo">保 存</div>
                </div>

            </div>
        </div>

        <!-- 蒙版层 -->
        <div id="fullscreen_overlay_800" style="position:fixed;" class="bg-minor" v-show="selected" @click="selected=false; removeFixed();"></div>
        <!-- 选择系统头像 -->
        <div class="v3css_choice bg-default" v-show="selected=='head_img'">
            <div class="choice_title cl-master bg-body">
                选择系统头像
            </div>
            <div class="bc-master" style="max-height: 250px;padding: 20px;overflow-y:auto ">
                <div style="line-height: 24px;padding: 2px">
                    <img src="https://rjdduploadw.mypep.cn/static/app/uc/uc_boy.png" style="vertical-align: middle"> 
                </div>
                <div  style="clear:both;overflow:hidden;">
                    <span class="select_head" v-for="index in 8" :key="index">
                        <img class="select_headimg" :src="'https://rjdduploadw.mypep.cn/static/app/head/boy'+index+'.jpg'" @click="upLoadSystemHeader($event); removeFixed();">
                        <img class="select_headtip" src="https://rjdduploadw.mypep.cn/static/app/uc/checked.png" v-show="('https://rjdduploadw.mypep.cn/static/app/head/boy'+index+'.jpg')==head_image">
                    </span>
                </div>

                <div style="line-height: 24px;padding: 2px">
                    <img src="https://rjdduploadw.mypep.cn/static/app/uc/uc_girl.png" style="vertical-align: middle"> 
                </div>
                <div style="clear:both;overflow:hidden;">
                    <span class="select_head" v-for="index in 8" :key="index">
                        <img class="select_headimg" :src="'https://rjdduploadw.mypep.cn/static/app/head/girl'+index+'.jpg'" @click="upLoadSystemHeader($event); removeFixed();">
                        <img class="select_headtip" src="https://rjdduploadw.mypep.cn/static/app/uc/checked.png" v-show="('https://rjdduploadw.mypep.cn/static/app/head/girl'+index+'.jpg')==head_image">
                    </span>
                </div>


            </div>
            <div class="choice_command" @click="selected=false; removeFixed();">
                <div class="v3css_button v3css_button_max  bg-master cl-invert">取消</div>
            </div>
        </div>

        <!-- 选择年级 -->
        <div class="v3css_choice bg-default" v-show="selected=='grade'">
            <div class="choice_title cl-master bg-body">请选择年级</div>
            <div class="choice_container bc-master">
                <div class="choice_item bc-slave cl-default" :class="{'cl-master':++index==user.grade}" v-for="(grade,index) in grades" :key="index" @click="setUserinfo('grade',index++); removeFixed();">{{grade}}</div>
            </div>
            <div class="choice_command" @click="selected=false; removeFixed();">
                <div class="v3css_button v3css_button_max bg-master cl-invert">取消</div>
            </div>
        </div>

        <!-- 选择英语版本 -->
        <div class="v3css_choice bg-default" v-show="selected=='eng_ver'">
            <div class="choice_title cl-master bg-body">请选择英语版本</div>
            <div class="choice_container bc-master">
                <div class="choice_item bc-slave cl-default" :class="{'cl-master':eng_ver==user.eng_ver}" v-for="(eng_ver,index) in eng_vers" :key="index" @click="setUserinfo('eng_ver',eng_ver); removeFixed();">{{eng_ver}}</div>
            </div> 
            <div class="choice_command" @click="selected=false; removeFixed();">
                <div class="v3css_button v3css_button_max bg-master cl-invert">取消</div>
            </div>
        </div>

        <!-- 选择年龄 -->
        <div class="v3css_choice bg-default" v-show="selected=='age'">
            <div class="choice_title cl-master bg-body">请选择年龄</div>
            <div class="choice_container bc-master">
                <div class="choice_item bc-slave cl-default" :class="{'cl-master':age==user.age}" v-for="age in 16" :key="age" @click="setUserinfo('age',age); removeFixed();">{{age}}岁</div>
            </div>
            <div class="choice_command" @click="selected=false; removeFixed();">
                <div class="v3css_button v3css_button_max bg-master cl-invert">取消</div>
            </div>
        </div>

        <!-- 选择性别 -->
        <div class="v3css_choice bg-default" v-show="selected=='sex'">
            <div class="choice_title cl-master bg-body">请选择性别</div>
            <div class="choice_container bc-master">
                <div class="choice_item bc-slave cl-default" :class="{'cl-master':sex==user.sex}" v-for="(sex,index) in sexs" :key="index" @click="setUserinfo('sex',sex); removeFixed();">{{sex==2?'男':'女'}}</div>
            </div>
            <div class="choice_command" @click="selected=false; removeFixed();">
                <div class="v3css_button v3css_button_max bg-master cl-invert">取消</div>
            </div>
        </div>
        <Loading 
        v-bind:loading="loading"
        v-bind:loadingError="loadingError"
        v-bind:loadingText="loadingText"
        v-bind:loadingImg="loadingImg"
        @hideLoading="hideLoadError" />

        <!-- 保存提示 -->
        <div class="v3css_toast bg-dark cl-invert" :class="{active:active}">保存成功!</div>
    </div>
</template>
<script>
    import Loading from "../components/Loding"
    import { GetUserinfo,UpdateUserinfo } from "@/api/http"
    import { UploadHeader,userConfig } from "@/api/prompt"

    export default {
        data(){
            return {
                isFixed: false,
                en_version: true,
                en_junior: false,
                grades:['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级'],
                eng_vers:['新起点','PEP','精通'],
                sexs:[2,1],//2男，1女
                boyHeadImages:[],
                girlHeadImages:[],
                nicknameShow:false,
                selected:false,
                active:false,
                head_image:"",
                user:{},
                loading:false,
                loadingError:false,
                loadingText:"提交用户数据",
                loadingImg:require("../assets/images/running.gif")
            }
        },
        methods:{
            setNickname(){
                this.nicknameShow=true;
                this.$nextTick(function () {// DOM 更新之后执行回调
                    this.$refs.nicknameInput.focus();
                })
            },
            saveNickname(){
                this.nicknameShow=false;
            },
            // 设置除了昵称之外的其他用户信息
            setUserinfo(key,val){
                this.user[key]=val;
                this.selected=false;

                if(val==7 || val==8 || val==9){
                    this.en_junior = true;
                    this.en_version = false;
                }else{
                    this.en_junior = false;
                    this.en_version = true;
                    this.user.eng_ver!="初中"?true:this.user.eng_ver="新起点"
                }
            },
            // 保存用户信息
            saveUserinfo(){
                this.loading=true;
                this.loadingText="提交用户数据";
                this.loadingImg=require("../assets/images/running.gif");

                if(this.en_junior){
                    this.user.eng_ver="初中"
                }
                const userinfos=Object.assign({},this.user);
                userinfos.access_token=window.access_token;

                UpdateUserinfo(userinfos)
                .then((res)=>{
                    console.log(res)
                    if(res.errcode==110){
                        this.loading=false;
                        // 通知移动端
                        userinfos.grade_txt=this.grades[this.user.grade-1];
                        userinfos.sex_txt=this.user.sex==2?"男":(this.user.sex==1?"女":"");
                        userConfig(Object.assign(userinfos,{status:"login",active_time: res.active_time}))
                    }else{
                        this.loading=false;
                    }
                })
                .catch((res)=>{
                    this.loadingError = true;
                    this.loading = false;
                    this.loadingText="系统错误：未知错误！";
                    this.loadingImg=require("../assets/images/fault.gif")
                });
            },

            UploadHeader,//通知移动端
            hideLoadError(hide){
                this.loadingError=hide;
            },
            upLoadSystemHeader(event){
                this.head_image=event.target.src;
                this.user.head_image=this.head_image
                this.selected=false
            },
            addFixed(){
                this.isFixed = true
            },
            removeFixed(){
                this.isFixed = false
            }
        },
        created(){
            app_js_hanler = (message)=>{
                if(JSON.parse(message).command == "imgUploadFinshed"){//返回头像url
                    this.head_image=JSON.parse(message).ossurl
                    this.user.head_image=JSON.parse(message).ossurl
                }
            }
        },
        mounted(){
            GetUserinfo({
                access_token:localStorage.getItem("access_token")
            })
            .then((res)=>{
                console.log(res)
                if(res.errcode==110){
                    this.user=res.user
                    this.head_image=this.user.head_image
                    if(res.user.grade==7 || res.user.grade==8 || res.user.grade==9){
                        this.en_junior = true;
                        this.en_version = false;
                    }else{
                        this.en_junior = false;
                        this.en_version = true;
                    }
                }
            })
            .catch((res)=>{

            });
        },
        computed:{
            nickname:{
                get(){
                    return this.user.nickname;
                },
                set(val){
                    this.user.nickname=val;
                }
            }
        },
        components:{
            Loading
        }
    }
</script>
<style scoped>
.fixed {
    width: 100%;
    position: fixed;
}
</style>

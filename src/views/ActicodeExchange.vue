<template>
    <div>
        <div id="content">
            <div class="v3board v3section v3section_inline bg-default" style="margin-top:5px;">
                <div class="v3title cl-minor" style="padding-top:10px;padding-bottom:10px;">
                    <span class="v3css_icon_title_triangle cl-master"></span>
                    <span>功能介绍</span>
                </div>

                <div class="cl-default bg-default bc-default">
                    <div class="v3item bc-default v3css_inline cl-minor" style="line-height:180%;font-size:0.9em;">
                        输入6位数字或字母组合的有效激活码，点击“激活”按钮，即可激活相应的书籍。
                    </div>
                </div>
            </div>

            <div class=" v3section v3section_inline" style="margin-bottom:20px;">
                <div style="padding: 0 10px;margin-top: 40px;">
                </div>
                <div class="v3items cl-default bg-default bc-default">
                    <div class="v3item bc-default v3ui v3css_inline">
                        <div class="v3inline_prefix">
                            <i class="iconfont icon-xingzhuang" style="position: relative; top: -2px; color: #666;"></i>
                        </div>
                        <div class="v3inline_middle cl-tip actCode">
                            <input class="v3css_input" type="text" autocomplete="off" placeholder="请输入激活码" v-model.trim="actCode" style="font-size: 15px;">
                        </div>
                    </div>
                </div>

                <div style="padding: 0 10px;margin-top: 40px;">
                    <div align="center" class="v3css_button_max bg-master cl-invert" @click="activent">激&nbsp;&nbsp;&nbsp;&nbsp;活</div>
                </div>
            </div>

            <!-- 蒙版层 -->
            <div class="fullscreen_overlay bg-minor" v-if="flag"></div>
            <!-- 提示框 -->
            <div class="v3css_confirm bg-default v3css_overlay_autodestroy fullscreen_overlay_modal_item" v-if="flag">
                <div class="confirm_title cl-master">提醒</div>
                <div class="confirm_text textline" style="text-align: center;">{{confirmText}}</div>

                <ul class="activated_book" v-if="activated_flag">
                    <li v-for="(item,index) in activated_book" :key="index">{{item}}</li>
                </ul>

                <table class="confirm_command">
                    <tbody>
                        <tr>
                            <td style="width: 100%;">
                                <div class="v3css_button v3css_button_max bg-master cl-invert" @click="closeConfirm">确认</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- 激活成功 -->
            <!-- <div class="v3css_toast bg-dark cl-invert" v-if="flag">激活成功!</div> -->

        </div>
    </div>
</template>
<script>
import { CodeActivation } from "@/api/http";
import { exchangeSucceed } from "@/api/prompt";

export default {
    data(){
        return {
            flag: false,
            confirmText: "",    // 弹出框提示内容
            actCode:"",         // 输入的激活码
            activated_flag: false,
            activated_book: []  // 已激活名单列表
        }
    },
    methods: {
        // 关闭弹窗
        closeConfirm() {
            this.flag = false            
        },
        // 激活按钮
        activent() {
            if(!this.actCode){
                this.flag = true
                this.confirmText = "请输入激活码"
                return
            }
            CodeActivation({
                access_token: window.access_token,
                code: this.actCode,
                userName: window.name
            })
            .then(res=>{            
                console.log(res)
                if(res.errcode != 110){
                    this.flag = true
                    this.confirmText = res.errmsg                    
                    return
                }else{
                    this.flag = true                    
                    this.confirmText = "激活成功！"
                    this.activated_flag = true
                    this.activated_book = res.bookNames
                    exchangeSucceed();  //激活成功后通知app端刷新"我的"

                    // setTimeout( () => {
                    //     this.flag = false
                    // },2500)
                }
            })
            .catch(err=>{
                console.log(err)
                alert("系统异常，请刷新重试！")
            })
        }
    }
}
</script>
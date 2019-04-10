<template>
    <div>
        <div id="body_inner">
            <div class="v3board v3section v3section_inline bg-default">
                <div class="v3title cl-minor" style="font-size: 1em;">
                    <span class="v3css_icon_title_triangle cl-master"></span>
                    <span>当前设备</span>
                </div>

                <div class="v3items cl-default bg-default bc-default">

                    <div class="v3item bc-default v3css_inline" v-for="(item,index) in deviceList" :key="index" :id="item.dev_id">
                        <div class="v3inline_prefix v3css_icon_cellphone"></div>
                        <div class="v3inline_left dev_name">{{ item.dev_name }}</div>
                        <!-- <div class="v3inline_middle"></div> -->
                        <div class="v3inline_right_block cl-tip">
                            <div class="v3inline_right ">{{ item.create_time }}</div>
                            <div class="v3inline_right cl-master" style="cursor: pointer" @click="deviceRemove(index,item.dev_id)">移除</div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="v3section v3section_inline bg-default" style="margin-top:5px;">
                <div class="v3title cl-minor" style="padding-top:10px;padding-bottom:10px;">
                    <span class="v3css_icon_title_triangle cl-master"></span>
                    <span>功能介绍</span>
                </div>
                <div class="v3items cl-default bg-default bc-default">
                    <div class="v3item bc-default v3ui v3css_inline cl-minor" style="line-height:180%;font-size:0.9em;">
                        您的人教点读帐号最多在{{max}}台设备登录，为防止帐号无法登录新设备，请移除多余设备
                    </div>
                </div>
            </div>
        </div>

        <!-- 蒙版层 -->
        <!-- <div class="fullscreen_overlay bg-minor" v-if="flag"></div> -->
        <!-- 提示框 -->
        <!-- <div class="v3css_confirm bg-default v3css_overlay_autodestroy fullscreen_overlay_modal_item" v-if="flag">
            <div class="confirm_title cl-master">提醒</div>
            <div class="confirm_text textline">{{confirmText}}</div>
            <table class="confirm_command">
                <tbody>
                    <tr>
                        <td style="width: 100%;">
                            <div class="v3css_button v3css_button_max bg-master cl-invert" @click="closeConfirm">确认</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> -->
        
        <!-- 移除设备成功 -->
        <div class="v3css_toast bg-dark" style="opacity:1; bottom:auto;" v-if="flag">移除设备成功!</div>
    </div>
</template>

<script>
import { GetDevicesList, DeviceRemove } from "@/api/http";
import { removeDevice } from "@/api/prompt";
export default {
  data(){
      return {
            flag: false,
            confirmText: "",    // 弹出框提示内容
            deviceList: [],     // 设备列表
            max: '',            // 允许绑定设备数量上限
      }
  },
  created(){
        GetDevicesList({
            access_token: window.access_token
        })
        .then(res=>{
            if(res.errcode != 110){
                this.flag = true
                this.confirmText = res.errmsg
                return
            }else{
                this.max = res.max
                let arr = res.devs
                // arr.pop()    // 有6台就显示6台，而不是显示5台
                this.deviceList =  arr
            }
        })
        .catch(err=>{
            console.log(err)
            alert("系统异常，请刷新重试！")
        })
  },
  methods: {
        // 关闭弹窗
        closeConfirm() {
            this.flag = false            
        },
        // 移除
        deviceRemove(index,dev_id) {
            this.deviceList.splice(index,1)
            DeviceRemove({
                access_token: window.access_token,
                dev_id: dev_id
            })
            .then(res=>{
                // console.log(res.data)
                if(res.errcode != 110){
                    this.flag = true
                    this.confirmText = res.errmsg
                    return
                }else{
                    this.flag = true
                    this.confirmText = "移除成功"
                    setTimeout( () => {
                        this.flag = false
                    },2500)
                    removeDevice({dev_id})
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
<style>
    .dev_name{
        width: 40%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        vertical-align: middle;
    }
</style>

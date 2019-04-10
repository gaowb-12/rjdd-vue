<template>
    <div style="margin-bottom: 47px;" class="bg-body bc-default cl-default">

        <div id="body_inner">
            <div id="content">

                <div class="v3item bg-default v3item_comment comment_feedback comment_detail" v-for="(main,index) in mainPaste" :key="index">
                    <div class="v3comment_header">
                        <div class="comment_header_left">
                            <img class="ct_thumb" :src="head_image" :onerror="defaultImg">
                        </div>
                        <div class="comment_header_main">
                            <div class="ct_author cl-default">
                                {{main.user_name}}
                                <!--<img class="ct_userlevel" src="https://rjddresw.mypep.cn/static/lv/lvzero.png">-->
                            </div>
                            <div class="ct_attribute cl-tip">
                                <span class="ct_smartime ct_attribute_unit">{{main.create_time | create_time}}</span>

                                <!--<span class="v3css_icon_id_card cl-ok"></span>
                                <span class="ct_grade ct_attribute_unit">三年级</span>-->

                                <span class="v3css_icon_location cl-ok" v-if="main.postion"></span>
                                <span class="ct_location ct_attribute_unit" v-if="main.postion">{{main.postion}}</span>

                            </div>
                        </div>
                        <div class="comment_header_right">
                            <span class="v3css_icon_movedown ct_comment_menu cl-minor" ref="removeMain"  @click="removeComment(); setSession()"></span>
                        </div>
                    </div>
                    <div class="v3comment_body">
                        <div class="ct_text">

                            <div class="comment_text">
                                <div class="ct_extend" style="margin-top:5px;background-color:#F0F0F0; border:0">
                                    <div>
                                        <b>标题简述：</b> {{main.title}}
                                    </div>
                                </div>

                                <div style="margin:10px 0px;">{{main.content}}</div>
                            </div>
                        </div>
                        <div class="comment_image ct_images v3ui v3ui_autolayout clear_after">
                            <ul class="comment_image ct_images v3ui v3ui_autolayout clear_after" v-if="main.imgs.length != 0">
                                <li v-for="(img,index) in main.imgs" :key="index"><img ref="small_pic" @click="openPhotoSwipe($event,index)" :src="img" :onerror="defaultFeedback" /></li>                                
                            </ul>
                            <div style="clear: both;"></div>
                        </div>
                    </div>
                    <div class="v3comment_attach">
                    </div>

                    <div class="v3comment_footer">

                        <div class="ct_comment_action cl-minor">
                            <span class="ct_comment_action_unit ct_doreply">
                                <span class="v3css_icon_comment"></span>
                                <span>4</span>
                            </span>
                        </div>
                    </div>

                </div>

                <div class="v3ui_delay v3css_footbar bg-minor v3css_overlay_autohide v3ui_fix_bottom_bar_delay">
                    <table style="width: 100%;">
                        <tbody>
                            <tr>
                                <td>
                                    <div class="v3ui v3ui_icon v3ui_comment" @click="clickReply">
                                        <div class="v3css_icon_comment cl-invert" style="font-size: 1.4em; display: inline-block; padding-right: 0px;"></div>
                                        <div class="cl-invert" style="font-size: 1em; display: block;">回复</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="v3board v3section  jct3_comment_reply">

                    <div id="SEC_replys_TITLE" class="v3title cl-default bg-default">
                        <span class="v3css_icon_title_triangle cl-master"></span>
                        <span>全部回复<i style="font-style:normal;">（共{{this.list.length}}条）</i></span>
                    </div>

                    <div class="v3items cl-default bg-default">
                        
                        <div v-if="flag" class="v3-noreply">暂无回复</div>

                        <!-- 回复列表 -->                        
                        <div class="v3item bg-default v3item_comment v3item_reply bc-slave" v-for="(reply,index) in list" :key="index">
                            
                            <div class="ct_doreply">
                                <div class="v3comment_header">
                                    <div class="comment_header_left">
                                        <img
                                            v-if="reply.user_id == user_id"
                                            :id="reply.user_id"
                                            class="ct_thumb" 
                                            :src="head_image" 
                                            :onerror="defaultImg"
                                        >
                                        <img
                                            v-else
                                            :id="reply.user_id"
                                            class="ct_thumb" 
                                            src="../assets/images/rjdd_icon.png" 
                                            :onerror="defaultImg"
                                        >
                                    </div>
                                    <div class="comment_header_main">
                                        <div class="ct_author cl-minor" v-if="reply.user_id == user_id">
                                            {{reply.user_name}}
                                            <!--<img class="ct_userlevel" src="https://rjddw.mypep.cn/static/lv/lvzero.png">-->
                                        </div>
                                        <div class="ct_author cl-minor" v-else>
                                            人教客服
                                        </div>

                                        <div class="ct_attribute cl-tip">
                                            <span class="ct_smartime ct_attribute_unit">{{reply.create_time | create_time}}</span>

                                            <span class="v3css_icon_location cl-ok" v-if="reply.postion && reply.user_id == user_id"></span>
                                            <span class="ct_location ct_attribute_unit" v-if="reply.postion && reply.user_id == user_id">{{reply.postion}}</span>

                                            <span class="v3css_icon_location cl-ok" v-if="reply.postion && reply.user_id != user_id"></span>
                                            <span class="ct_location ct_attribute_unit" v-if="reply.postion && reply.user_id != user_id">北京市</span>
                                        </div>
                                    </div>
                                    <div class="comment_header_right">
                                        <span class="v3css_icon_movedown ct_reply_menu cl-minor" :id="reply.id" ref="removeReply" @click="removeComment(); removeSession($event,index)"></span>
                                    </div>
                                </div>
                                <div class="v3comment_body">
                                    <div class="ct_text cl-minor textline">{{reply.content}}</div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                
                <!-- 回复输入框 -->
                <div class="v3ui v3ui_replybox v3ui_forms bg-body fullscreen_overlay_modal_item" style="visibility: inherit; position: fixed; z-index: 801; left: 0px; top: auto; bottom: 0px;" v-if="reply">
                    <div class="v3newreply_inner">
                        <div class="nr_tip cl-red"></div>
                        <div class="nr_replyto cl-minor">回复:</div>
                        <div class="v3ui v3ui_richdiv v3css_overlay_touchmove bg-default bc-default">
                            <textarea v-model="message" class="reply_textarea" placeholder="请输入回复"></textarea>
                        </div>

                        <div class="nr_action">
                            <table>
                                <tbody><tr>
                                    <td class="nr_action_left cl-minor">
                                        <!-- <span class="v3css_icon_emoji nr_action_left_item" id="nr_action_emotion"></span> -->
                                    </td>
                                    <td class="nr_action_right">
                                        <span class="nbrd_status_tip cl-tip nr_action_right_item">{{num}}/100</span>
                                        <span id="submit_reply" class="v3css_button v3css_button_min v3css_button_border dc-master bg-master cl-invert nr_action_right_item" @click="addReply">提交回复</span>
                                    </td>
                                </tr>
                            </tbody></table>
                        </div>                    
                    </div>
                </div>

            </div>
        </div>

        <!-- 蒙版层 -->
        <div class="fullscreen_overlay bg-minor" style="position:fixed;" v-if="mask" @click="closeMask"></div>
        <!-- 刪除留言 -->
        <div v-if="show" class="v3css_choice bg-default v3css_overlay_autodestroy fullscreen_overlay_modal_item" middle_align="bottom" style="position: fixed; z-index: 801; left: 0px; top: auto; bottom: 0px;">
            <div class="choice_title cl-master bg-body">选择命令</div>
            <div class="choice_container bc-master v3css_overlay_touchmove">
                <div class="choice_item bc-slave cl-default" index="1" @click="removeConfirm">删除</div>
            </div>
        </div>
        <!-- 确认删除层 -->
        <div v-if="remove" class="v3css_confirm bg-default v3css_overlay_autodestroy fullscreen_overlay_modal_item" middle_align="bottom" style="position: fixed; z-index: 801; width: 100%; left: 0px; top: auto; bottom: 0px;">
            <div class="confirm_title cl-master">确认要删除该回复吗？</div>
            <div class="confirm_text textline"></div>
            <table class="confirm_command">
                <tbody>
                    <tr>
                        <td style="width: 50%;">
                            <div class="v3css_button v3css_button_max bg-default cl-master v3css_button_border dc-master" @click="cancleRemove">取消</div>
                        </td>
                        <td style="width: 50%;">
                            <div class="v3css_button v3css_button_max bg-master cl-invert" @click="confirmRemove">确认</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 提醒弹出层 -->
        <div v-if="remind" class="v3css_confirm bg-default v3css_overlay_autodestroy fullscreen_overlay_modal_item" clickhide="destroy" middle_align="bottom" style="position: fixed; z-index: 803; width: 100%; left: 0px; top: auto; bottom: 0px;">            
            <div class="confirm_title cl-master">提醒</div>            
            <div class="confirm_text textline">{{remind_text}}</div>
            <table class="confirm_command">                
                <tbody>
                    <tr>                
                        <td style="width: 100%;"><div class="v3css_button v3css_button_max bg-master cl-invert" @click="remind=false">确认</div></td>
                    </tr>            
                </tbody>
            </table>
        </div>

        <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

    <!-- Background of PhotoSwipe. 
         It's a separate element, as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">

        <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. -->
        <div class="pswp__container">
            <!-- don't modify these 3 pswp__item elements, data is added later on -->
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
        </div>

        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">

            <div class="pswp__top-bar">

                <!--  Controls are self-explanatory. Order can be changed. -->

                <div class="pswp__counter"></div>

                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

                <!--<button class="pswp__button pswp__button--share" title="Share"></button>-->

                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                <!-- element will get class pswp__preloader--active when preloader is running -->
                <div class="pswp__preloader">
                    <div class="pswp__preloader__icn">
                      <div class="pswp__preloader__cut">
                        <div class="pswp__preloader__donut"></div>
                      </div>
                    </div>
                </div>
            </div>

            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div class="pswp__share-tooltip"></div> 
            </div>

            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>

            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>

            <div class="pswp__caption">
                <div class="pswp__caption__center"></div>
            </div>

          </div>

        </div>

</div>


    </div>

</template>

<script>
// 引入photoswipe--css/js
import photoswipe from "photoswipe";
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";

import * as http from "@/api/http";
import { newFeedback, feedbackMessage } from "@/api/prompt";

export default {
  name: "FeedbackDetail",
  data() {
    return {
      user_id: window.user_id,
      user_name: null,
      remove: false,    // 控制确认删除弹出层
      mask: false,      // 控制蒙版层
      show: false,      // 控制选择删除命令弹出层
      flag: true,       // 控制有无回复
      reply: false,     // 控制回复弹出层
      remind: false,    // 控制提醒弹出层
      remind_text: null,// 提醒的内容
      list: [],         // list已被遍历成回贴
      mainPaste: [],    // 主贴
      message: "",      // 回复的内容,
      replyId: null,    // 回贴的id
      replyIndex: null, // 回贴的index
      // replyPaste: [], // 回贴
      feedbackID: this.$route.params.feedbackID,
      head_image: null,  // 用户头像
      defaultImg: 'this.src="' + require('../assets/images/boy3.jpg') + '"',
      defaultFeedback: 'this.src="' + require('../assets/images/gray.png') + '"',

      dev_name: null,                           // 需要与app端交互
      postion: null,
      postion_data: null,
      ua_data: null,
    };
  },
  created() {

    // 获取用户信息接口(用于获取头像)
    http
        .GetUserinfo({
            access_token: window.access_token
        })
        .then(res => {
            this.head_image = res.user.head_image;
            if(res.user.nickname){
                this.user_name = res.user.nickname
            }else if(res.user.mobile){
                this.user_name = res.user.mobile
            }else if(res.user.reg_name){
                this.user_name = res.user.reg_name
            }else {
                this.user_name = res.user.user_id
            }
            console.log(this.user_name)
        })
        .catch(err => {
            console.log(err);
            alert("系统异常，请刷新重试！");
        })

    // 反馈详情
    const feedbackID = this.feedbackID;
    http
      .FeedbackDetail(feedbackID, {
        access_token: window.access_token
      })
      .then(res => {
        // console.log(res);
        this.list = res.list;
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].pid == 0) {
            this.mainPaste.push(this.list[i]);
            this.list.shift();
            if (this.list.length != 0) {
              this.flag = false;
            }
          }
        }
        // console.log(this.list)  // 回贴
        console.log(this.mainPaste); // 主贴
      })
      .catch(err => {
        console.log(err);
        alert("系统异常，请刷新重试！");
      });
  },
  computed: {
      num(){
        //   return this.message.length      // 字符个数
          return this.message.replace(/[^\x00-\xff]/g, '01').length   // 字节个数
      }
  },
  methods: {
      // 删除留言
      removeComment(e){
          this.mask = true
          this.show = true    
          // console.log(this.$refs.removeMain)
      },
      // 删除确认提示
      removeConfirm(){
          this.show = false
          this.remove = true
      },
      // 取消删除
      cancleRemove(){
          this.mask = false
          this.remove = false
      },
      // 删除主贴--设置id来区分
      setSession(){
          sessionStorage.setItem("id","1");
      },
      removeSession(e,index){
          console.log(e.target.id)
          console.log(index)
          this.replyId = e.target.id
          this.replyIndex = index
          sessionStorage.removeItem("id");
      },

      // 回贴确认删除
      confirmRemove(e,index){
          this.cancleRemove()
          // console.log(e.target.innerText)
          // console.log(e.target.tagName)
        
          if(sessionStorage.getItem("id") == 1){    // 删除主贴
            
            const feedbackID = this.feedbackID;
            http.FeedbackDelete(feedbackID, {
                access_token: window.access_token
            })
            .then(res => {
                console.log("删除成功")
            })
            .catch(err => {
                console.log(err);
                alert("系统异常，请刷新重试！");
            });

              this.mainPaste.splice(index,1)
              this.list.splice(0,this.list.length)
              this.$router.push({name: "feedback"})
          }else{                                   // 删除回复
            const feedbackID = this.replyId;
            http.FeedbackDelete(feedbackID, {
                access_token: window.access_token
            })
            .then(res => {
                this.$router.go(0)
                console.log("删除成功")
            })
            .catch(err => {
                console.log(err);
                alert("系统异常，请刷新重试！");
            });
            
              const replyIndex = this.index;
              // this.list.splice(replyIndex,1)
              if(this.list.length === 0){
                  this.flag = true
              }
          }
      },
      // 关闭蒙版层
      closeMask(){
          if(this.remind){
              this.remind = false
              this.reply = true
          }else{
              this.mask = this.show = this.remove = this.reply = this.remind = false
          }          
      },
      // 点击回复按钮
      clickReply(){
          this.mask = true
          this.reply = true


          // 点击回复与app端的交互获取地理位置信息
            newFeedback();        
            // const message = {"command":"feedback_message", "positiopn":"北京", "positiopn_data":"北京", "dev_name":"iphone6", "ua_data":"北京"};
            app_js_hanler = (message) =>{
                // alert(message)
                if(JSON.parse(message).command == "feedback_message"){
                    this.postion = JSON.parse(message).positiopn
                    this.postion_data = JSON.parse(message).positiopn_data
                    this.dev_name = JSON.parse(message).dev_name
                    this.ua_data = JSON.parse(message).ua_data
                }
                // alert(this.postion)
            }


      },
      // 提交回复
      addReply(){

         if(this.message.length < 5){
             this.remind = true
             this.remind_text = "亲，别这样惜字如金，请至少输入5个字，谢谢！"
         }else if(this.message.length > 100){
             this.remind = true
             this.remind_text = "亲，写的太多了，不能超过100个字哦，谢谢！"
         }else{

          this.mask = false
          this.reply = false

          const feedbackID = this.feedbackID;
            http.FeedbackReply(feedbackID, {
                // access_token: window.access_token
                content: this.message,
                dev_name: this.dev_name,                           // 需要与app端交互
                postion: this.postion,
                postion_data: this.postion_data,
                ua_data: this.ua_data,
                user_id: localStorage.getItem("user_id"),
                // user_name: window.user_id       //这里传的是user_id,所以在回复的名称中也显示user_id
                user_name: this.user_name
            })
            .then(res => {
                if(res.errcode == 110){
                    this.$router.go(0)
                }
            })
            .catch(err => {
                console.log(err);
                alert("系统异常，请刷新重试！");
            });
        }

      },
      // 打开photoswipe
      openPhotoSwipe(event,index){
            // console.log(event.target.naturalWidth)
            // console.log(this.$refs.small_pic[0].naturalWidth)

            let pswpElement = document.querySelectorAll('.pswp')[0];
            const items = [];

            for(var i=0; i<this.mainPaste[0].imgs.length; i++){
                const itemsImg = {}
                itemsImg.w = this.$refs.small_pic[i].naturalWidth      // 图片的原始宽度
                itemsImg.h = this.$refs.small_pic[i].naturalHeight     // 图片的原始高度
                itemsImg.src = this.mainPaste[0].imgs[i]
                items.push(itemsImg)
            }
            
            const options = {
                index,     // 点击哪张照片显示哪张
                history: false,
                focus: false,
                bgOpacity: .85,
			    tapToClose: true,
                showAnimationDuration: 1,
                hideAnimationDuration: 1
            };
            
            let gallery = new photoswipe( pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
      }

  }
};
</script>

<style scoped>
.comment_header_main .ct_author_bt {
  height: 26px;
  line-height: 26px;
}
.comment_text .ct_extend {
  border: 0;
  margin-top: 5px;
  padding: 10px 10px 6px 10px;
  background-color: #f0f0f0;
}
ul.comment_image li {
  width: 23.8%;
  max-height: 86px;
  overflow: hidden;
  float: left;
  margin: 0 0.6%;
  margin-bottom: 20px;
  list-style: none;
}
ul.comment_image li img {
  width: 100%;  
}
.v3items .v3-noreply {
  padding: 20px;
  text-align: center;
}
.reply_textarea {
  resize: none;
  overflow: auto;
  font-family: "微软雅黑";
  width: 100%;
  height: 55px;
  outline: none;
  font-size: 14px;
}
.v3ui_replybox .v3ui_richdiv {
    overflow-y: hidden;
}
</style>


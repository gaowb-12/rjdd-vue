<template>
  
  <div style="margin-bottom: 60px;" class="bg-body bc-default cl-default">

		<div style="text-align: center; margin-top: 20px;" v-if="flag">暂无反馈</div>

    <div id="body_inner">
        <div id="content">

            <div id="SEC_feedback" class="v3board v3section jct3_comment">

                <div class="v3items cl-default bg-default">

					<div class="v3item bg-default v3item_comment comment_feedback" v-for="(item,index) in list" :key="index">
						<router-link :to="{name:'feedback_detail', params:{feedbackID: item.id}}">

							<div class="v3comment_header">
								<div class="comment_header_left">

									<div class="ct_day_month2">
										<div class="ct_diary_day cl-invert" style="background-color:red;;border-color:red;">{{item.create_time | create_day}}</div>
										<div class="ct_diary_month cl-minor" style="border-color:red;">{{item.create_time | create_month}}月</div>
									</div>

								</div>
								<div class="comment_header_main">
									<span class="ct_author_bt">问题反馈</span>

									<div class="ct_attribute cl-tip">
											<span class="ct_smartime ct_attribute_unit">{{item.create_time | create_time}}</span>

											<!-- <span class="v3css_icon_id_card cl-ok"></span>
											<span class="ct_grade ct_attribute_unit">三年级</span> -->

											<span class="v3css_icon_location cl-ok" v-if="item.postion"></span>
											<span class="ct_location ct_attribute_unit">{{item.postion}}</span>

									</div>
								</div>
							</div>
							<div class="v3comment_body">
									<div class="ct_text">
										<div style="" class="comment_text">
											<div class="ct_extend">
												<div v-if="item.title">
													<b>标题简述：</b>{{item.title}} <span v-if="item.flag == 1" class="message_dot"></span>
												</div>
												<div v-else>
													<b>标题简述：</b>其他问题反馈 <span v-if="item.flag == 1" class="message_dot"></span>
												</div>
											</div>
											<div style="margin:10px; 0">{{item.content}}</div>
										</div>
									</div>
									<!-- 图片 -->
									<ul class="comment_image ct_images v3ui v3ui_autolayout clear_after" v-if="item.imgs">
										<li v-for="(img,index) in item.imgs" :key="index">
											<img :src="img" :onerror="defaultImg" />
										</li>
									</ul>
									<div style="clear: both;"></div>
							</div>
							<div class="v3comment_attach"></div>
																					
							<div class="v3comment_footer">
									<div class="ct_comment_action cl-minor">
											<span class="ct_comment_action_unit ct_doreply">
													<!-- <span class="v3css_icon_comment"></span>
													<span class="cl-tip">9</span> -->
											</span>

											<span class="ct_comment_useragent cl-assist" v-if="item.dev_name">来自 {{item.dev_name}}</span>
									</div>

									<!-- 回复列表 -->
									<!-- <div class="ct_replys cl-minor bc-slave" v-if="item.flag">

											<div class="ct_replys_header">
													<span class="v3css_icon_public_infor"></span>
													<span>最新回复：</span>
											</div>

											<div class="ct_replys_main">
													<div class="ct_reply_item v3uicss_multi_line textline">
															<img class="ct_reply_thumb" src="https://rjddresw.mypep.cn/tina/static/app/head/girl8.jpg">
															<span class="ct_reply_from cl-tip ct_doreply">zock</span>：32345
													</div>
													
													<div class="ct_reply_item v3uicss_multi_line textline">
															<img class="ct_reply_thumb" src="https://rjddresw.mypep.cn/tina/static/app/head/girl8.jpg">
															<span class="ct_reply_from cl-tip ct_doreply">zock</span>：22345
													</div>
													
													<div class="ct_reply_item v3uicss_multi_line textline">
															<img class="ct_reply_thumb" src="https://rjddresw.mypep.cn/tina/static/app/head/girl8.jpg">
															<span class="ct_reply_from cl-tip ct_doreply">zock</span>：12345
													</div>
											</div>
									</div> -->

							</div>
						</router-link>
					</div>									

                </div>

            </div>

            <!-- <router-link :to="{name: 'feedback_comment'}"> -->
                <div class="new_nc bg-master v3ui v3ui_app_menucontrol v3css_overlay_autohide v3ui_fix_bottom_bar_delay" menuid="20010" @click="submitFeedback">
                	提交新反馈
                </div>
            <!-- </router-link> -->

            <div class="v3ui v3ui_replybox v3ui_forms bg-body" action="/diary/submit_reply" id="new_reply" submitwarn="" style="visibility: inherit; display: none;">
                <div class="v3newreply_inner">
                    <div class="nr_tip cl-red"></div>
                    <div class="nr_replyto cl-minor">回复：</div>
                    <div class="v3ui v3ui_richdiv v3css_overlay_touchmove bg-default bc-default" text_limit="5" max_length="100" text_tip="请输入回复"></div>
                    <div class="nr_action">
                        <table>
                            <tbody>
                                <tr>
                                    <td class="nr_action_left cl-minor">
                                        <span class="v3css_icon_emoji nr_action_left_item" id="nr_action_emotion"></span>
                                    </td>
                                    <td class="nr_action_right">
                                        <span class="nbrd_status_tip cl-tip nr_action_right_item"></span>

                                        <span id="submit_reply" class="v3css_button v3css_button_min v3css_button_border dc-master bg-master cl-invert nr_action_right_item">提交回复</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

</template>

<script>
import * as http from "@/api/http";
import { newFeedback, feedbackMessage } from "@/api/prompt";

export default {
  name: "Feedback",
  data() {
    return {
	  flag: false,
      imgs: [],
	  list: [],
      defaultImg: 'this.src="' + require("../assets/images/gray.png") + '"'
    };
  },
  created() {

	// const message = {"command":"feedback_message", "positiopn":"北京", "positiopn_data":"北京", "dev_name":"iphone6", "ua_data":"北京"};
	app_js_hanler = (message) =>{
		// alert(message)
		if(JSON.parse(message).command == "feedback_message"){
			const positiopn = JSON.parse(message).positiopn
			const positiopn_data = JSON.parse(message).positiopn_data
			const dev_name = JSON.parse(message).dev_name
			const ua_data = JSON.parse(message).ua_data
			// let routeFeedbackComment = this.$router.resolve({'name': 'feedback_comment',params: {"positiopn":positiopn, "positiopn_data":positiopn_data,"dev_name":dev_name,"ua_data":ua_data}});
			// window.open(routeFeedbackComment.href, '_blank')
			this.$router.push({'name': 'feedback_comment',params: {"positiopn":positiopn, "positiopn_data":positiopn_data,"dev_name":dev_name,"ua_data":ua_data}})
		}
	}

	// 获取反馈列表信息
    http
      .Feedback({
        	access_token: window.access_token
      })
      .then(res => {
        	// console.log(res);
			this.list = res.list;
			if(this.list.length == 0){
				this.flag = true
			}
			
      })
      .catch(err => {
			console.log(err);
			alert("系统异常，请刷新重试！");
      });
  },
  methods: {
	submitFeedback(){
		newFeedback();
	},
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
.v3css_icon_id_card {
  top: 1px;
  position: relative;
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
  /* border-radius: 50%; */
}
.message_dot {
	width: 6px; 
	height: 6px;
	top: -2px;
	left: 5px;
	border-radius: 50%;
	position: relative;
	background: red;
	display:inline-block; 
}
</style>

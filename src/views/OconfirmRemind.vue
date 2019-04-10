<template>
  <div class="bg-body bc-default cl-default">

		<div id="body_inner">
			<div id="content">
				<div class="v3css_error">
					<div class="v3board bg-default">
						<div class="error_borard bg-default bg-master  cl-invert">
							<div id="error_log" class="v3css_icon_tip_warning">
							</div>
							<div id="error_title">
								<div id="error_title1">友情提醒</div>
								<div id="error_title2">INFORMATION</div>
							</div>
						</div>

						<ul id="error_info" class="cl-default" style="list-style-type: none; margin-left: auto;">
							<li>
                                <span style="color: red;">该商品存在未支付订单</span>，请
								<router-link :to="{name: 'Odetail', params: {orderId: this.nopay_order_id}}" class="a_no_line" style="color:blue">点击这里</router-link>进入订单中支付，或取消未支付订单后重新提交！
                            </li>
						</ul>
					</div>

					<div style="margin-top: 471px; visibility: inherit;" class="error_button v3css_button v3css_button_max bg-slave cl-invert" @click="backDetail">返回</div>
				</div>
			</div>
		</div>

  </div>
</template>

<script>
import * as http from "@/api/http";
export default {
  name: "OconfirmRemind",
  data() {
    return {
        book_id: this.$route.params.book_id,
        nopay_order_id:　this.$route.params.nopay_order_id,
        device_type: this.$route.params.device_type
    };
  },
  created() {
      // console.log(this.$route.params.book_id)
      // console.log(this.$route.params.nopay_order_id)
      // console.log(this.$route.params.device_type)
  },
  methods: {      
      // 返回
      backDetail(){
          this.$router.push({ name: 'Detail', params: {book_id: this.book_id, device_type: this.device_type} })
      }
  }
};
</script>

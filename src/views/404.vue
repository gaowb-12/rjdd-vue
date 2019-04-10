<template>
  
  <div class="bg-body bc-default cl-default">
      <div id="body_inner">
			<div id="content">
				<div class="v3css_error">
					<div class="v3board bg-default">
						<div class="error_borard bg-default bg-warn  cl-invert">
							<div id="error_log" class="v3css_icon_sys_error">
							</div>
							<div id="error_title">
								<div id="error_title1">系统错误</div>
								<div id="error_title2">SYSTEM ERROR</div>
							</div>
						</div>

						<ul id="error_info" class="cl-default">
							<li>亲，这次我是真的错了，工程师正在处理，马上就搞定啦。</li>
							<li>请休息一会儿，点击下面返回按钮，或选择右上角菜单里的刷新试试！</li>
							<li>向你美丽的耐心和宽容致敬，我们爱你！</li>
						</ul>
					</div>
					<div style="margin-top: 405px; visibility: inherit;" class="error_button v3css_button v3css_button_max bg-slave cl-invert" @click="goBack">返回</div>
				</div>
			</div>
		</div>
  </div>

</template>

<script>
export default {
  name: 'NotFound404',
  data () {
    return {
        // 返回
        goBack(){
            javascript:history.go(-1)
        }
    }
  }
}
</script>
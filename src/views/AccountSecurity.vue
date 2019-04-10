<template>
  
  <div class="bg-body bc-default cl-default">
      <div id="body_inner">
        <div id="content">
            <div class="v3board v3section v3section_inline">
                <div class="v3items cl-default bg-default  bc-slave">
                    
                    <router-link :to="{name: 'Mpwdpage'}">
                        <div class="v3item  bc-slave v3ui v3css_inline" id="u_password">
                            <div class="v3inline_prefix">
                                <img src="../assets/images/password.png" style="height:1em;vertical-align:top">
                            </div>
                            <div class="v3inline_left">修改密码</div>
                            <div class="v3inline_middle"></div>
                            <div class="v3inline_right_block cl-tip">
                                <div class="v3inline_right"></div>
                                <div class="v3inline_postfix v3css_icon_more"></div>
                            </div>
                        </div>
                    </router-link>

                    <router-link :to="{name: 'GoCheckuser'}">
                        <div class="v3item  bc-slave v3ui v3css_inline " id="u_mobile">
                            <div class="v3inline_prefix v3css_icon_cellphone"></div>
                            <div class="v3inline_left">更换手机号</div>
                            <div class="v3inline_middle"></div>
                            <div class="v3inline_right_block cl-tip">
                                <div class="v3inline_right"></div>
                                <div class="v3inline_postfix v3css_icon_more"></div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>

        </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'AccountSecurity',
  data () {
    return {
     
    }
  }
}
</script>

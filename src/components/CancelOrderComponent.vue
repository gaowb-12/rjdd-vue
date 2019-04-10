<template>
    <div class="cancel_order" v-if="showMask">
        <div class="mask" @click="handleMask"></div>
        <div class="cancle_panel">
            <h3>取消订单</h3>
            <dl>
                <dt>提示：</dt>
                <dd>1.订单一旦取消，无法恢复。</dd>
                <dd>2.支付学豆、优惠券将返还到您的账户。</dd>
            </dl>
            <h4>请选择取消的原因（必选）</h4>
            <ul>                
                <li v-for="(item,index) in radioList" :key="item.id">
                    <label>
                        <span class="v3css_icon_radio" :class="{v3css_icon_radio_selected: item.isChecked}" style="margin-right: .1rem;"></span>
                        <!-- <input name="cause" type="radio" :value="item.value" v-model="reason" :checked='item.isChecked' @click="check(index)"> {{item.label}} -->
                        <input name="cause" type="radio" :value="item.value" :checked='item.isChecked' @click="check(index)"> {{item.label}}
                    </label>
                </li>
            </ul>
            <button :class="{ selected: isSelected }" :disabled="isDisabled" @click="submitReason();sureBtn();">确 定</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {            
            radioList: [
                {
                    value: 1,
                    label: '操作有误',
                    isChecked: false
                },
                {
                    value: 2,
                    label: '重复下单 /  误下单',
                    isChecked: false
                },
                {
                    value: 3,
                    label: '其它渠道价格更低',
                    isChecked: false
                },
                {
                    value: 4,
                    label: '其他原因',
                    isChecked: false
                }
            ],
            isDisabled: true,
            reason: null,
            isSelected: false, 
            value: null  // 将用户选择的取消原因提交到后台并保存
        }
    },
    props: ["showMask"],
    methods: {
        // 选择单选原因
        selectReason(e){
            if(e.target.value){
                this.isSelected = true;
                this.isDisabled = false;
                this.value = e.target.value;
            }
        },
        // 点击单选项
        check(index) {
            // 先取消所有选中项
            this.isSelected = true;
            this.isDisabled = false;
            this.radioList.forEach((item) => {
                item.isChecked = false;
            });
            //再设置当前点击项选中
            this.value = this.radioList[index].value;
            this.radioList[index].isChecked = true;
            // console.log(this.value);
        },

        // 点击确定按钮
        submitReason(){
            console.log(this.value);    // 将用户选择的取消原因提交到后台接口并保存
            this.$emit('cancelReason',this.value)  // 将用户选择的取消原因提交到后台接口并保存
            this.$emit('hideMask', false)
            this.initRadio();
        },
        // 点击确定按钮--取消订单
        sureBtn(){
            this.$emit('cancelSure','id');
        },
        // 关闭弹出窗
        handleMask(){
            this.$emit('hideMask', false)
            this.initRadio();
        },

        // 初始默认不选中
        initRadio(){
            this.isDisabled = true
            this.isSelected = false
            for(let i=0; i<this.radioList.length; i++){
                this.radioList[i].isChecked = false
            }
        }
    }
}
</script>
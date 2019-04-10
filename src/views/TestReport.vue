<template>
    <div class="test_report">
        <dl>
            <dt v-show="isFinishedAll">完成{{finishTestWords}}个单词的测试</dt>
            <dt v-show="!isFinishedAll">还未完成本单元评测</dt>
            <dd>总单词量：{{testReportList.count_total}} <span>重点词：{{testReportList.count_emphasis}}</span> 认读词：{{testReportList.count_not_emphasis}}</dd>
            <!-- <dd>
                <em>已掌握：{{grasped|computeRate(testReportList.count_total)}}%</em>
                <em>学习中：{{studying|computeRate(testReportList.count_total)}}%</em>
                <em>未学习：{{unstudy|computeRate(testReportList.count_total)}}%</em>
            </dd> -->
        </dl>
        <div class="report_list">
            <flexbox orient="vertical" v-for="word in testReportList.words" :key="word.id">
                <flexbox-item>{{word.word}}</flexbox-item>                
                <flexbox-item>
                    <ul class="clearfix">
                        <li>测试次数：{{word.times_read+word.times_spell}}</li>
                        <li>答对次数：{{word.times_read_pass+word.times_spell_pass}}</li>
                        <li>错误次数：{{word.times_read+word.times_spell-(word.times_read_pass+word.times_spell_pass)}}</li>
                    </ul>
                </flexbox-item>
            </flexbox>
        </div>
    </div>    
</template>
<script>
import { Flexbox, FlexboxItem } from "vux";
import { GetTestReportList } from "@/api/http";
export default {
    components: {
        Flexbox,
        FlexboxItem
    },
    data(){
        return {
            testReportList:[],//测试报告列表
            finishTestWords:0,//完成测试的单词数量
            grasped:0,// 已掌握
            studying:0,// 学习中
            unstudy:0,// 未学习
            isFinishedAll:true,//是否完成全部单词的测试
        }
    },
    created(){
        var catalogid=this.$route.params.catalogid;//1212001402135010000
        // 获取测试列表
        GetTestReportList(catalogid,{
            access_token: localStorage.getItem("access_token")
        })
        .then(res=>{
            console.log(res)
            this.testReportList=res;//获取测试报告列表

            // 遍历单词列表，获取学习状态的掌握数量
            res.words.forEach(word => {
                if(word.learn_state==0)//待学习
                    this.unstudy++
                if(word.learn_state==1)//学习中
                    this.studying++
                if(word.learn_state==2)//已掌握
                    this.grasped++
                
                if(word.flag_read_pass==0&&word.flag_spell_pass==0)//有单词没有测试过
                    this.isFinishedAll=false
                // if(word.flag_emphasis){//是否是重点词汇，0不是，1是
                //     //是重点词汇
                if(word.flag_read_pass==2||word.flag_spell_pass==2)//听读测试跟拼写测试同时通过
                    this.finishTestWords++
                // }else{
                //     // 不是重点词汇
                //     if(word.flag_read_pass==2)//听读测试跟拼写测试同时通过
                //         this.finishTestWords++
                // }

            });
        })
        .catch(err=>{
            console.log(err)
        })
    },
    filters:{
        // 计算单词掌握情况的比率
        computeRate(num,count_total){
            if(count_total)
                return Math.round(num/count_total*100)
        }
    }
}
</script>



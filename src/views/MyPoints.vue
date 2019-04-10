<template>
    <div class="my_points">
        <!-- 会员信息 -->
        <div class="vip_info">
            <dl>
                <dt><span><countup :start-val="0" :end-val="points" :duration="3"></countup></span>分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{level_name}}会员</dt>
                <dd>
                    <x-progress :percent="percent" :show-cancel="false"></x-progress>
                </dd>
                <dd v-if="highestLevel">还差{{gap + 1}}分升至{{next_level}}会员</dd>
            </dl>
        </div>
        <!-- 积分详情 -->
        <div class="vip_detail">
            <flexbox class="vux-1px-b">
                <flexbox-item :span="6"><div class="flex-one point_title">积分详情</div></flexbox-item>
                <flexbox-item>
                    <router-link :to="{name:'PointsRule'}" target="_blank">
                        <div class="flex-one point_rule"><span>积分规则</span></div>
                    </router-link>
                </flexbox-item>
            </flexbox>
            <flexbox class="vux-1px-b" v-for="(item,index) in details" :key="index">
                <flexbox-item><div class="flex-one"><h3>{{item.name}}</h3>{{item.create_time | getYMD}}</div></flexbox-item>
                <flexbox-item :span="2" v-if="item.points > 0"><div class="flex-score"><span :class = "[ item.points < 0 ? 'reduce' : 'add' ]">+{{item.points}}分</span></div></flexbox-item>
                <flexbox-item :span="2" v-else><div class="flex-score"><span :class = "[ item.points < 0 ? 'reduce' : 'add' ]">{{item.points}}分</span></div></flexbox-item>
            </flexbox>

            <flexbox v-if="details.length > 10">
                <flexbox-item><div class="flex-one no_more">没有更多了</div></flexbox-item>
            </flexbox>
        </div>
    </div>
</template>

<script>
import { XProgress, Countup, Flexbox, FlexboxItem } from 'vux'
import { clearInterval } from 'timers';
import { GetUserPointDetail, GetUserPoint } from '@/api/http'

export default {
  components: {
    XProgress,
    Countup,
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      highestLevel: true,
      initNum: 0,  // 百分比
      percent: 0,   // 百分比
      gap: 0,       // 距下一级别的分差数
      nextLevel: 0, // 下一级别数字('1','2',...)
      next_level: '',
      level_name: '', // 当前级别字符串('一级','二级',...)
      points: 0,
      details: []  // 用户签到详情列表
    }
  },
  created() {   
    // 获取用户积分级别
    GetUserPoint({
        access_token: localStorage.getItem("access_token")
    })
    .then(res => {

        this.points = res.user.points;
        this.level_name = res.user.level_name;

        // 将后台返回的当前级别的字符串转换成对应的数字
        let level_num;
        switch (this.level_name)
        {
            case '一级':
                level_num = 1;
                this.gap = 200 - this.points;
                this.initNum = (this.points / 200) * 100;
                break;
            case '二级':
                level_num = 2;
                this.gap = 500 - this.points;
                this.initNum = (this.points / 500) * 100;
                break;
            case '三级':
                level_num = 3;
                this.gap = 1000 - this.points;
                this.initNum = (this.points / 1000) * 100;
                break;
            case '四级':
                level_num = 4;
                this.gap = 2000 - this.points;
                this.initNum = (this.points / 2000) * 100;
                break;
            case '五级':
                level_num = 5;
                this.highestLevel = false;
                // this.gap = 2000 - this.points;
                this.initNum = (this.points / 3000) * 100;
                break;
        }

        // 如果计算错误超过100%，则保证页面样式不出错
        if(this.initNum > 100){
            this.initNum = 100
        }
        
        // 距离下一级别的数字类型
        this.nextLevel = level_num + 1;

        // 距离下一级别将数字类型转换成相应的级别字符串渲染出去
        switch (this.nextLevel)
        {
            case 2:
                this.next_level = "二级";
                break;
            case 3:
                this.next_level = "三级";
                break;
            case 4:
                this.next_level = "四级";
                break;
            case 5:
                this.next_level = "五级";
                break;
        }

        // this.gap = 200 - this.points;
        // this.initNum = (this.points / 200) * 100;

    })
    .catch(err => {
        console.log(err);
    });

    // 获取用户积分详情
    GetUserPointDetail({
        access_token: localStorage.getItem("access_token")
    })
    .then(res => {
        this.details = res.details;
    })
    .catch(err => {
        console.log(err);
    });

    setInterval(() => {
    if(this.percent <= this.initNum){
        this.percent++;
    }
    },15)
  },
  mounted(){
    // 页面一打开通知app端交互方法然后用户可以操作下拉刷新
    this.menucontrol();
  },
  methods: {
    // 通知app端下拉刷新
    menucontrol(){
        // 3.3.0版本只有IOS可以下拉刷新
        var uA = navigator.userAgent;
        var isAndroid = uA.indexOf('Android') > -1 || uA.indexOf('Adr') > -1;
        if(!isAndroid){
            var param = {
                "command" : "menucontrol",
                "menu_action" : [
                    {
                    "name" : "刷新",
                    "id" : 10010,
                    "action" : "show"
                    }
                ]
            }
            prompt(JSON.stringify(param));
        }
    }
  },
  filters: {
    // 创建时间只取年月日    
    getYMD(value){
        const valueArr =  value.split(" ");
        return valueArr[0];
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
</style>


<template>
    <div class="unit_exercise">

        <!-- 选择题 -->
        <div class="subject" v-if="choice">
            <div v-for="item in showData" :key="item.question.text">
                <!-- 题干 -->
                <div class="matter">
                    <flexbox orient="vertical">
                        <!-- 文字 -->
                        <flexbox-item v-if="item.question.text"><pre>{{item.question.text}}</pre></flexbox-item>
                        <!-- 图片 -->
                        <flexbox-item v-else>
                            <img :src="item.question.img" alt="">
                        </flexbox-item>
                    </flexbox>
                </div>

                <!-- 选项 -->
                <div class="option">
                    <flexbox>
                        <flexbox-item>请选择</flexbox-item>
                    </flexbox>
                    <div class="option_div" @click="flag && clickOption($event, 'A', item.answer)">
                        <flexbox v-if="item.A" :class="{ right: isRightA, error: isErrorA }">
                            <flexbox-item :span="1">A</flexbox-item>
                            <flexbox-item v-if="item.A.text"><pre>{{item.A.text}}</pre></flexbox-item>
                            <flexbox-item v-else>
                                <img :src="item.A.img" alt="">
                            </flexbox-item>
                        </flexbox>
                    </div>
                    <div class="option_div" @click="flag && clickOption($event, 'B', item.answer)">
                        <flexbox v-if="item.B" :class="{ right: isRightB, error: isErrorB }">
                            <flexbox-item :span="1">B</flexbox-item>
                            <flexbox-item v-if="item.B.text"><pre>{{item.B.text}}</pre></flexbox-item>
                            <flexbox-item v-else>
                                <img :src="item.B.img" alt="">
                            </flexbox-item>
                        </flexbox>
                    </div>
                    <div class="option_div" @click="flag && clickOption($event, 'C', item.answer)">
                        <flexbox v-if="item.C" :class="{ right: isRightC, error: isErrorC }">
                            <flexbox-item :span="1">C</flexbox-item>
                            <flexbox-item v-if="item.C.text"><pre>{{item.C.text}}</pre></flexbox-item>
                            <flexbox-item v-else>
                                <img :src="item.C.img" alt="">
                            </flexbox-item>
                        </flexbox>
                    </div>
                    <div class="option_div" @click="flag && clickOption($event, 'D', item.answer)">
                        <flexbox v-if="item.D" :class="{ right: isRightD, error: isErrorD }">
                            <flexbox-item :span="1">D</flexbox-item>
                            <flexbox-item v-if="item.D.text"><pre>{{item.D.text}}</pre></flexbox-item>
                            <flexbox-item v-else>
                                <img :src="item.D.img" alt="">
                            </flexbox-item>
                        </flexbox>
                    </div>
                </div>

                <!-- 答案与题目解析 -->
                <div class="answer" v-if="answerResult">
                    <!-- 答案 -->
                    <flexbox>
                        <flexbox-item><i class="iconfont icon-gongbudaan"></i> 答案</flexbox-item>
                    </flexbox>
                    <flexbox class="correct">
                        <flexbox-item :span="6">正确答案  {{item.answer}}</flexbox-item>
                        <flexbox-item>你的答案 {{userClick}}</flexbox-item>                    
                    </flexbox>
                    
                    <!-- 题目解析 -->
                    <flexbox class="resolution">
                        <flexbox-item><i class="iconfont icon-chakanjiexi"></i> 题目解析</flexbox-item>
                    </flexbox>
                    <flexbox class="resolution_panel" orient="vertical">
                        <flexbox-item v-if="item.analysis.text"><pre>{{item.analysis.text}}</pre></flexbox-item>
                        <flexbox-item v-else>
                            <img :src="item.analysis.img" alt="">    
                        </flexbox-item>
                    </flexbox>
                </div>
            </div>
        </div>

        <!-- 主观题 -->
        <div div class="subject" v-if="subjective">
            <div v-for="item in showData" :key="item.question.text">
                <!-- 题干 -->
                <div class="matter">
                    <flexbox orient="vertical">
                        <!-- 文字 -->
                        <flexbox-item v-if="item.question.text"><pre>{{item.question.text}}</pre></flexbox-item>
                        <!-- 图片 -->
                        <flexbox-item v-else>
                            <img :src="item.question.img" alt="">
                        </flexbox-item>
                    </flexbox>

                    <flexbox class="check_btn">
                        <flexbox-item><p @click="handleShowAnswer"><span :class="{up: isUp}">点击查看答案</span></p></flexbox-item>
                    </flexbox>
                </div>

                <!-- 答案与题目解析 -->
                <div class="answer" v-if="showAnswer">
                    <!-- 答案 -->
                    <flexbox>
                        <flexbox-item><i class="iconfont icon-gongbudaan"></i> 答案</flexbox-item>
                    </flexbox>
                    <flexbox class="show_answer correct" orient="vertical">
                        <!-- 文字 -->
                        <flexbox-item v-if="item.analysis.text"><pre>{{item.analysis.text}}</pre></flexbox-item>
                        <!-- 图片 -->
                        <flexbox-item v-else>
                            <img :src="item.analysis.img" alt="">    
                        </flexbox-item>
                    </flexbox>
                </div>
            </div>
        </div>

        <!-- 下一题按钮 -->
        <div class="next" v-if="next">
            <span @click="handleNext" v-if="nextSwitch">下一题</span>
            <span @click="finishOff"  v-if="completeSwitch" class="complete">完成</span>
        </div>


    </div>
</template>

<script>
import { Flexbox, FlexboxItem } from "vux";
import { GetUnitExercise } from '@/api/http';
import { finishOff } from '@/api/prompt';

export default {
    components: {
        Flexbox,
        FlexboxItem,
    },
    data(){
        return {
            borderBNo: false,
            flag: true,
            choice: false,          // 选择题开关
            subjective: false,      // 主观题开关
            next: false,            // 下一题开关
            answerResult: false,    // 选择题答案默认关闭
            showAnswer: false,      // 主观题答案区默认关闭
            list: [],
            showData: [],           // 展示的数据
            correct: '',            // 正确选项
            userClick: '',          // 用户点击的答案选项
            isRightA: false,
            isErrorA: false,
            isRightB: false,
            isErrorB: false,
            isRightC: false,
            isErrorC: false,
            isRightD: false,
            isErrorD: false,
            num: 0,
            
            isUp: false,
            nextSwitch: false,
            completeSwitch: false,


            // next_text: '下一题',
            // isComplete: false,
            // completeFlag: true,
        }
    },
    created () {
        // 请求数据
        GetUnitExercise({},this.$route.params.categoryId)
        .then(res => {
            this.list = res.list;
            if(this.list.length <= 1) {
                // this.next_text = '完成';
                // this.isComplete = true;
                // this.completeFlag = false;
                this.nextSwitch = false;
                this.completeSwitch = true;
            }else{
                this.nextSwitch = true;
                this.completeSwitch = false;
            }
            this.showData.push(this.list[0]);
            if(!this.showData.D) {
               this.borderBNo = true;
            }
            console.log(this.showData);

            this.judgment();

            if (this.list.length != 0){
                this.next = true
            }
        })
        .catch(err => {
            console.log(err);
        })
    },
    methods: {
        // 主观题-点击查看答案
        handleShowAnswer() {
            // this.showAnswer = true;
            this.showAnswer = !this.showAnswer;
            this.isUp = !this.isUp;
        },
        // 选择题-点击选项
        clickOption(e,option,answer) {
            this.flag = false;
            this.answerResult = true;
            this.userClick = option;
            // console.log(option)
            // console.log(this.correct)

            if(option == this.correct){  // 答对
                console.log('答对了')
                this['isRight'+option] = true;
            }else{                       // 答错
                console.log('答错了')
                this['isError'+option] = true;
                this['isRight'+answer] = true;
            }
        },
        // 下一题
        handleNext() {

            this.flag = true;
            this.isRightA = false;
            this.isErrorA = false;
            this.isRightB = false;
            this.isErrorB = false;
            this.isRightC = false;
            this.isErrorC = false;
            this.isRightD = false;
            this.isErrorD = false;
            

            this.showAnswer = false;
            this.answerResult = false;

            if(this.num < (this.list.length - 1)){
                this.num++;
                this.showData.splice(0,1);
                this.showData.push(this.list[this.num]);

                this.judgment();

                if(this.num == (this.list.length-1)){
                    this.num = (this.list.length - 1)
                    // this.next_text = '完成';
                    // this.isComplete = true;
                    // this.completeFlag = false;
                    this.nextSwitch = false;
                    this.completeSwitch = true;
                }else{
                    this.nextSwitch = true;
                    this.completeSwitch = false;
                }
                console.log(this.num, this.list.length)  
                
            }
            
        },
        // 完成关闭
        finishOff,
        // 题型判断
        judgment() {
            switch(this.showData[0].type){
                case 0: // 选择题
                    this.choice = true;
                    this.subjective = false;
                    this.correct = this.showData[0].answer;
                    break;
                default: // 主观题
                    this.choice = false;
                    this.subjective = true;
            }
        }

    }
}
</script>



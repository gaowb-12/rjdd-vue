<template>
    <div class="ranking">
        <flexbox class="ranking_text">
            <flexbox-item v-if="my_data">本次得分{{my_data.total_score}}<br>排名第{{my_data.ranking}}名</flexbox-item>
            <flexbox-item v-else>还未进行单词测试！<br>赶快测试参与PK吧！</flexbox-item>
        </flexbox>
        <div class="ranking_list">
            <flexbox v-for="(rank,index) in ranking_datas" :key="rank.user_id">

                <flexbox-item v-if="index == 0" class="no1">
                    <p v-if="rank.nick_name">{{rank.nick_name}}</p>
                    <p v-else-if="rank.mobile">{{rank.mobile | oldCellphone}}</p>
                    <p v-else>{{rank.user_id}}</p>
                </flexbox-item>

                <flexbox-item v-else-if="index == 1" class="no2">
                    <p v-if="rank.nick_name">{{rank.nick_name}}</p>
                    <p v-else-if="rank.mobile">{{rank.mobile | oldCellphone}}</p>
                    <p v-else>{{rank.user_id}}</p>
                </flexbox-item>

                <flexbox-item v-else-if="index == 2" class="no3">
                    <p v-if="rank.nick_name">{{rank.nick_name}}</p>
                    <p v-else-if="rank.mobile">{{rank.mobile | oldCellphone}}</p>
                    <p v-else>{{rank.user_id}}</p>
                </flexbox-item>

                <flexbox-item :span="5" v-else><span>{{index + 1}}</span>
                    <p v-if="rank.nick_name">{{rank.nick_name}}</p>
                    <p v-else-if="rank.mobile">{{rank.mobile | oldCellphone}}</p>
                    <p v-else>{{rank.user_id}}</p>
                </flexbox-item>
                
                <flexbox-item class="here"><i v-if="rank.user_id == user_id">我在这里</i></flexbox-item>
                <flexbox-item align="right" :span="2">{{rank.total_score}}分</flexbox-item>
            </flexbox>
        </div>
    </div>    
</template>
<script>
import { Flexbox, FlexboxItem } from "vux";
import { EnglishRanking } from "@/api/http";
export default {
    components: {
        Flexbox,
        FlexboxItem
    },
    data(){
        return {
            my_data: {},
            ranking_datas: [],
            user_id: window.user_id,
        }
    },
    created() {
        const data = {
            access_token: window.access_token,
            catalog_id: this.$route.params.catalog_id,    // 英语单元id
            top_n: '50'
        };
        EnglishRanking(data)
        .then(res => {
            console.log(res);
            console.log(user_id);
            this.my_data = res.my_data;
            this.ranking_datas = res.ranking_datas;
        })
        .catch(err => {

        })
    }
}
</script>



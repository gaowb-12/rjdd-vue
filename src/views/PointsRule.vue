<template>
    <div class="points_rule">
        <p class="rule_describe">{{pointsTitle}}</p>
        <ul class="rule_ul">            
            <li v-for="(item, index) in pointsRule" :key="index">
                <h2 @click="rule_hideShow(index)">{{index+1}}.{{ item.title }}<span class="v3css_icon_movedown"></span></h2>
                <dl>
                    <dt>{{ item.content.dt }}</dt>
                    <dd>
                        <table width="100%">
                            <tr>
                                <th v-for="(th,index) in item.content.table.th" :key="index">{{ th }}</th>
                            </tr>
                            <tr v-for="(tr,index) in item.content.table.levelAll" :key="index">
                                <td v-for="(td,index) in tr.level" :key="index">{{ td }}</td>
                            </tr>
                        </table>
                    </dd>
                    <dd v-for="(dd, index) in item.content.dd" :key="index">
                        ( {{index + 1}} ) {{ dd.dd_title }}
                        <p style="margin-left: .6rem;" v-for="(p,index) in dd.dd_list" :key="index">{{ p }}</p>
                    </dd>
                </dl>
            </li>
        </ul>
    </div>
</template>

<script>
import { PointsRule } from '@/api/http';

export default {
    data(){
        return {
            isActive: false,
            pointsTitle: null,
            pointsRule: null,
        }
    },
    created(){
        PointsRule()
        .then((res) => {
            this.pointsTitle = res.pointsTitle;
            this.pointsRule = res.pointsRule;
        })
        .catch((err) => {
            console.log(err);
        })
    },
    methods: {
        rule_hideShow(index){
            const aDl = document.querySelectorAll("dl");
            const aSpan = document.querySelectorAll("span");
            if([...aDl][index].style.display == 'block'){
                [...aDl][index].style.display = 'none';
                [...aSpan][index].className = 'v3css_icon_movedown';
            }else{
                [...aDl][index].style.display = 'block';
                [...aSpan][index].className = 'v3css_icon_movedown v3css_icon_moveup';
            }
        }
    }
}
</script>

<template>
    <div class="item-coupon" :class="{unused}" :superimposed="coupon.superimposed" :id="coupon.id">
        <div class="money">￥<span>{{coupon.face_value}}</span></div>
        <div class="info">
            <h2>{{coupon.name}}</h2>
            <p class="remark">{{coupon.remark}}</p>
            <p>{{coupon.start_time | formatTime}}-{{coupon.end_time | formatTime}}</p>
            <!-- 0不可叠加，1可叠加 -->
            <span v-if="coupon.superimposed==0">不可叠加使用</span>
        </div>
        <!-- 插入优惠券的状态 -->
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props:['coupon','unused','superimposed'],
        filters:{
            //过滤时间
            formatTime(time){
                const date=new Date(time.replace(/-/g, "/"))
                return date.getFullYear()+"."+(date.getMonth()+1<10?'0'+(date.getMonth()+1):(date.getMonth()+1))+"."+(date.getDate()<10?"0"+date.getDate():date.getDate())
            }
        }
    }
</script>
<style>
    .item-coupon{
        position: relative;
        overflow: hidden;
        margin-bottom: 0.25rem;
        background-color: #fff;
        height: 2.2rem;
    }
    .item-coupon .money{
        width: 2.3rem;
        height: 100%;
        line-height: 2.2rem;
        text-align: center;
        float: left;
        background:url(../assets/images/coupon-bg.png) left no-repeat;
        background-size: cover;
        color:#fff;
        font-size:0.3rem;
    }
    .item-coupon.unused .money{
        background:url(../assets/images/coupon-bg-invalid.png) left no-repeat;
        background-size: cover;
    }
    .item-coupon .money span{
        font-size:0.52rem;
    }
    .item-coupon .info{
        overflow: hidden;
        border: 2px solid #e4e7e9;
        border-left: none;
        padding: 0.2rem;
        height: 100%;
        box-sizing: border-box;
    }
    .item-coupon .info h2{
        font-size:0.28rem;
        margin-bottom: 0.15rem;
    }
    .item-coupon .info p{
        width: 84%;
        font-size:0.24rem;
        margin-bottom: 0.12rem;
        color:#666666;
    }
    /* .item-coupon .info p.remark{
        font-size:9px;
    } */
    .item-coupon.unused,.item-coupon.unused .info p,.item-coupon.unused .info h2{
        color:#999;
    }
    .item-coupon .info span{
        border: 1px solid #eb4e41;
        color: #eb4e41;
        border-radius:2px;
        padding: 0.04rem;
        margin-top: 0.15rem;
    }
    .item-coupon .coupon-select,.item-coupon .coupon-expired,.item-coupon .coupon-used,.item-coupon .coupon-ineffective{
        position: absolute;
        top: 50%;
        right: 0.35rem;
        transform: translateY(-50%);
    }
    .item-coupon .coupon-select{
        width: 0.46rem;
        height: 0.46rem;
        background: url(../assets/images/coupon-unselected.png) center no-repeat;
        background-size: contain;
    }
    .item-coupon .coupon-select.selected{
        background: url(../assets/images/coupon-selected.png) center no-repeat;
        background-size: contain;
    }
    .item-coupon.unused .coupon-expired{
        right: 0.25rem;
        width: 1rem;
        height: 1rem;
        background: url(../assets/images/coupon-expired.png) center no-repeat;
        background-size: contain;
    }
    .item-coupon.unused .coupon-used{
        right: 0.25rem;
        width: 1rem;
        height: 1rem;
        background: url(../assets/images/coupon-used.png) center no-repeat;
        background-size: contain;
    }
    .item-coupon.unused .coupon-ineffective{
        right: 0.25rem;
        width: 1rem;
        height: 1rem;
        background: url(../assets/images/coupon-ineffective.png) center no-repeat;
        background-size: contain;
    }
</style>



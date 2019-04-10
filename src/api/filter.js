/**
 * 全局过滤器
 */

// 保存两位小数
let keepTwoNum = value => {
    return value.toFixed(2)
}

// 价格添加人民币标识(￥)
let rmbPrice = value => {
    return '￥' + (value / 100).toFixed(2)
}

// 折扣金额添加人民币标识(￥)
let discountRmbPrice = value => {
    return '￥' + (value).toFixed(2)
}

// 订购人数转换
let userCount = value => {
    return (value / 10000).toFixed(2)
}
// 有效期天数转为月份
let month = value => {    
    return value = parseInt(value / 30)
}
// 添加过滤器，手机号中间四位用*号代码
let oldCellphone = value => {
    let start = value.slice(0,4);
    let end = value.slice(-4);
    return `${start}****${end}`;
}
// 用户反馈--原始数据格式：yyyy-MM-dd HH:mm:ss
    // yyyy-MM-dd HH:mm
    let create_time = value => {
        let time = ""
        value = value.split(" ")
        for(let i=0; i<value.length; i++){
            value[i] = value[i].split(":");
            time = value[1][0] + ":" + value[1][1];
        }
        return value[0] + " " + time
    }

    //MM
    let create_month = value => {
        let month = ""
        value = value.split(" ")
        for(let i=0; i<value.length; i++){
            value[i] = value[i].split("-");
            month = value[0][1]
        }
        if(month < 10){
            month = month.split("");
            return month[1]
        }else{
            return `${month}`
        }
    }
    //dd
    let create_day = value => {
        let day = ""
        value = value.split(" ")
        for(let i=0; i<value.length; i++){
            value[i] = value[i].split("-");
            day = value[0][2]
        }
        if(day < 10){
            day = day.split("");
            return day[1]
        }else{
            return `${day}`
        }
    }

// IOS审核，删除订单日期
let deleteTime = value => {
    var deleteArr = value.split("-");
    deleteArr.pop();
    value = deleteArr.join();
    return value
}

// mp3时间格式
let timeFormat = value => {
    if(value < 10){
        return '00:0' + parseInt(value);
    }else if(value >= 10 && value < 60){
        return '00:' + parseInt(value);
    }else if(value > 60){
        let min = Math.floor(value/60);
        if(min < 10){
            min = "0" + min
        }
        let sec = parseInt(value % 60);
        if(sec < 10){
            sec = "0" + sec;
        }
        return min + ':' + sec;
    }
}

export { 
    keepTwoNum,
    rmbPrice,
    userCount,
    month,
    oldCellphone,
    create_time,
    create_day,
    create_month,
    deleteTime,
    discountRmbPrice,
    timeFormat
}
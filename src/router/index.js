import Vue from 'vue'
import Router from 'vue-router'
import Loginpage from '@/views/Loginpage'
import Regpage from '@/views/Regpage'
import Mpwdpage from '@/views/Mpwdpage'
import Protocol from '@/views/Protocol'
import Privacy from '@/views/Privacy'
import User from '@/views/User'
import About from '@/views/About'
import Responsible from '@/views/Responsible'
import AccountSecurity from '@/views/AccountSecurity'
import GoCheckuser from '@/views/GoCheckuser'
import MyOrderAll from '@/views/MyOrderAll'
import Odetail from '@/views/Odetail'
import Payit from '@/views/Payit'
import Detail from '@/views/Detail'
import GoChmobile from '@/views/GoChmobile'
import Chmobile from '@/views/Chmobile'
import Userinfo from '@/views/Userinfo'
import DevManage from '@/views/DevManage'
import ActicodeExchange from '@/views/ActicodeExchange'
import ContactUs from '@/views/ContactUs'
import OconfirmCombo from '@/views/OconfirmCombo'
import OconfirmRemind from '@/views/OconfirmRemind'
import Read from '@/views/Read'
import Poetry from '@/views/Poetry'
import NotFound404 from '@/views/404'
import Feedback from '@/views/Feedback'
import FeedbackDetail from '@/views/FeedbackDetail'
import FeedbackComment from '@/views/FeedbackComment'
import Invite from '@/views/Invite'
import InviteReg from '@/views/InviteReg'
import InviteShare from '@/views/InviteShare'
import Shopping from '@/views/Shopping'
import MyCoupon from '@/views/MyCoupon'
import Evaluation from '@/views/Evaluation'
import Promotions from '@/views/Promotions'
import Teaching from '@/views/Teaching'
import Oral from '@/views/Oral'
import Assistant from '@/views/Assistant'
import MyPoints from '@/views/MyPoints'
import PointsRule from '@/views/PointsRule'
import BindPhone from '@/views/BindPhone'
import TestReport from '@/views/TestReport'
import Ranking from '@/views/Ranking'
import EnWordShare from '@/views/EnWordShare'
import ReadSearch from '@/views/ReadSearch'
import UnitExercise from '@/views/UnitExercise'
import MethodSkill from '@/views/MethodSkill'
import PreviewShare from '@/views/PreviewShare'

// 数学课程
import MathCourse from '@/views/MathCourse'
import Mathematics from '@/views/Mathematics'


// 人教点读宣传页--star
import Muqiao from '@/views/spread/Muqiao'
import Zhihong from '@/views/spread/Zhihong'
import Baichuan from '@/views/spread/Baichuan'
import Kousuan from '@/views/spread/Kousuan'
import MuqiaoReg from '@/views/spread/MuqiaoReg'
import ZhihongReg from '@/views/spread/ZhihongReg'
import BaichuanReg from '@/views/spread/BaichuanReg'
import KousuanReg from '@/views/spread/KousuanReg'
import Recommend from '@/views/spread/Recommend'
// 人教点读宣传页--end

Vue.use(Router)

const router = new Router({
  mode: "history",
  base:"/3.5/h5/",
  scrollBehavior(to, from, savePosition){
    if(savePosition){
      return savePosition;
    } else {
      return {x: 0, y:0}
    }
  },
  routes: [
    // 初始
    {
      path: '/',
      redirect: Loginpage
    },
    // 登录
    {
      path: '/loginpage',
      name: 'Loginpage',
      component: Loginpage,
      meta:{
        title:"登录人教点读"
      }
    },
    // 用户注册
    {
      path: '/regpage',
      name: 'Regpage',
      component: Regpage,
      meta:{
        title:"用户注册"
      }
    },
    // 忘记密码
    {
      path: '/mpwdpage',
      name: 'Mpwdpage',
      component: Mpwdpage,
      meta:{
        title:"修改密码"
      }
    },
    // 绑定手机号
    {
      path: '/bindphone',
      name: 'BindPhone',
      component: BindPhone,
      meta:{
        title:"绑定手机号"
      }
    },
    // 用户协议
    {
      path: '/protocol',
      name: 'Protocol',
      component: Protocol,
      meta:{
        title:"用户协议"
      }
    },
    // 用户隐私
    {
      path: '/privacy',
      name: 'Privacy',
      component: Privacy,
      meta:{
        title:"用户隐私"
      }
    },
    // 用户中心
    {
      path: '/user',
      name: 'User',
      component: User,
      meta:{
        title:"用户中心",
        login: true
      }
    },
    // 账户安全
    {
      path: '/account_security',
      name: 'AccountSecurity',
      component: AccountSecurity,
      meta:{
        title:"账户安全"
      }
    },
    // 更换手机号--验证身份
    {
      path: '/go_checkuser',
      name: 'GoCheckuser',
      component: GoCheckuser,
      meta:{
        title:"更换手机号"
      }
    },
    // 更换手机号--修改手机
    {
      path: '/go_chmobile/:pep_userid',
      name: 'GoChmobile',
      component: GoChmobile,
      meta:{
        title:"更换手机号"
      }
    },
    // 更换手机号--成功
    {
      path: '/chmobile',
      name: 'Chmobile',
      component: Chmobile,
      meta:{
        title:"更换手机号"
      }
    },
    // 我的订单
    {
      path: '/my_order_all/:order_state',
      name: 'MyOrderAll',
      component: MyOrderAll,
      meta:{
        title:"我的订单"
      }
    },
    //订单详情
    {
      path: '/odetail/:orderId',
      name: 'Odetail',
      component: Odetail,
      meta:{
        title:"订单详情"
      }
    },
    //订单详情重定向
    {
      path: '/reodetail/:orderId',
      name: 'reOdetail',
      redirect: '/odetail/:orderId'
    },
    //商品详情
    {
      path: '/detail/:book_id/:device_type/:bought?',
      name: 'Detail',
      component: Detail,
      meta:{
        title:"商品详情",
        login: true
      }
    },
    //支付方式
    {
      path: '/payit/:orderId',
      name: 'Payit',
      component: Payit,
      meta:{
        title:"支付方式"
      }
    },
    // 确认订单
    {
      path: '/oconfirm_combo/:pid/:num/:book_id/:device_type',
      name: 'OconfirmCombo',
      component: OconfirmCombo,
      meta:{
        title:"确认订单",
        login: true
      }
    },
    // 未支付订单--友情提醒
    {
      path: '/oconfirm_remind',
      name: 'OconfirmRemind',
      component: OconfirmRemind,
      meta:{
        title:"订单提示信息"
      }
    },
    // 个人信息
    {
      path: '/userinfo',
      name: 'Userinfo',
      component: Userinfo,
      meta:{
        title:"个人信息"
      }
    },
    // 我的反馈--列表
    {
      path: '/feedback',
      name: 'feedback',
      component: Feedback,
      meta:{
        title:"我的反馈"
      }
    },
    // 我的反馈--详情
    {
      path: '/feedback_detail/:feedbackID',
      name: 'feedback_detail',
      component: FeedbackDetail,
      meta:{
        title:"我的反馈"
      }
    },
    // 我的反馈--提交新反馈
    {
      path: '/feedback_comment/:positiopn?/:positiopn_data?/:dev_name?/:ua_data?',
      name: 'feedback_comment',
      component: FeedbackComment,
      meta:{
        title:"提交新反馈"
      }
    },
    // 设备管理
    {
      path: '/dev_manage',
      name: 'DevManage',
      component: DevManage,
      meta:{
        title:"设备管理"
      }
    },
    // 激活码兑换
    {
      path: '/acticode_exchange',
      name: 'ActicodeExchange',
      component: ActicodeExchange,
      meta:{
        title:"激活码兑换"
      }
    },
    // 联系我们
    {
      path: '/contact_us',
      name: 'ContactUs',
      component: ContactUs,
      meta:{
        title:"联系我们"
      }
    },
    // 关于我们
    {
      path: '/about',
      name: 'About',
      component: About,
      meta:{
        title:"关于我们"
      }
    },
    // 免责声明
    {
      path: '/responsible',
      name: 'Responsible',
      component: Responsible,
      meta:{
        title:"免责声明"
      }
    },
    // 系统设置
    {
      path: '/setSystem',
      name: 'setSystem',
      component: Loginpage,
      meta:{
        title:"系统设置"
      }
    },
    // 央视主持人课文朗读
    {
      path: '/read',
      name: 'read',
      component: Read,
      meta:{
        title:"央视主持人课文朗读"
      }
    },
    // 中小学语文诗词朗读
    {
      path: '/poetry',
      name: 'poetry',
      component: Poetry,
      meta:{
        title:"中小学语文诗词朗读"
      }
    },
    // 邀请新用户--app拉新h5
    {
      path: '/invite',
      name: 'Invite',
      component: Invite,
      meta:{
        title:"邀请好友赢福利",
        login: true
      }
    },
    // 邀请新用户--微信h5
    {
      // path: '/invite_reg/:user_id',
      path: '/invite_reg',
      name: 'InviteReg',
      component: InviteReg,
      meta:{
        title:"好友邀您领福利"
      }
    },
    // 邀请新用户--微信h5中唤醒app
    {
      path: '/invite_share',
      name: 'InviteShare',
      component: InviteShare,
      meta:{
        title:"人教点读客户端"
      }
    },
    {
      path: '/mycoupon',
      name: 'mycoupon',
      component: MyCoupon,
      meta:{
        title:"我的优惠券"
      }
    },
    // 语音测评分享
    {
      path: '/evaluation/:user_id/:group_id',
      name: 'evaluation',
      component: Evaluation,
      meta:{
        title:"人教点读朗读评测"
      }
    },
    // 活动宣传列表
    {
      path: '/promotions',
      name: 'promotions',
      component: Promotions,
      meta:{
        title:"活动宣传列表"
      }
    },
    // 教辅内容解析
    {
      path: '/teaching/:id',
      name: 'teaching',
      component: Teaching,
      meta:{
        title:"内容解析"
      }
    },

    // 点读h5宣传android/ios四个渠道--star
    {
      path: '/spread/muqiao',
      name: 'muqiao',
      component: Muqiao,
      meta:{
        title:"人教点读课本等你免费领取"
      }
    },
    {
      path: '/spread/zhihong',
      name: 'zhihong',
      component: Zhihong,
      meta:{
        title:"人教点读课本等你免费领取"
      }
    },
    {
      path: '/spread/kousuan',
      name: 'kousuan',
      component: Kousuan,
      meta:{
        title:"人教点读课本等你免费领取"
      }
    },
    {
      path: '/spread/baichuan',
      name: 'baichuan',
      component: Baichuan,
      meta:{
        title:"人教点读课本等你免费领取"
      }
    },
    {
      path: '/spread/baichuan_reg',
      name: 'BaichuanReg',
      component: BaichuanReg,
      meta:{
        title:"人教点读课本等你免费领取"
      }
    },
    {
      path: '/spread/muqiao_reg',
      name: 'MuqiaoReg',
      component: MuqiaoReg,
      meta:{
        title:"人教点读课本等你免费领取"
      }
    },
    {
      path: '/spread/zhihong_reg',
      name: 'ZhihongReg',
      component: ZhihongReg,
      meta:{
        title:"人教点读课本等你免费领取"
      }
    },
    {
      path: '/spread/kousuan_reg',
      name: 'KousuanReg',
      component: KousuanReg,
      meta:{
        title:"人教点读课本等你免费领取"
      }
    },
    // 点读h5宣传android/ios四个渠道--end

    // 安卓推荐给好友
    {      
      path: '/spread/recommend',
      name: 'Recommend',
      component: Recommend,
      meta:{
        title:"人教点读"
      }
    },

    // 口算教辅
    {      
      path: '/oral/:ISBN/:type/:folder',
      name: 'Oral',
      component: Oral,
      meta:{
        title:"教辅"
      }
    },
    // 教辅分享
    {      
      path: '/assistant',
      name: 'Assistant',
      component: Assistant,
      meta:{
        title:"人教点读"
      }
    },   
    // 双11狂欢购物节
    {
      path: '/shopping/:channel',
      name: 'Shopping',
      component: Shopping,
      meta:{
        title:"人教点读狂欢购物节"
      }
    },
    // 我的积分
    {
      path: '/my_points',
      name: 'MyPoints',
      component: MyPoints,
      meta:{
        title:"我的积分",
        login: true
      }
    },
    // 积分规则
    {
      path: '/points_rule',
      name: 'PointsRule',
      component: PointsRule,
      meta:{
        title:"积分规则"
      }
    },
    // 数学课程--单元主页
    {
      path: '/math_course/:chapter_id?',
      name: 'MathCourse',
      component: MathCourse,
      meta:{
        title:""
      }
    },
    // 测试报告
    {
      path: '/test_report/:catalogid',
      name: 'TestReport',
      component: TestReport,
      meta:{
        title:"评测报告"
      }
    },
    // 排名
    {
      path: '/ranking/:catalog_id',
      name: 'Ranking',
      component: Ranking,
      meta:{
        title:"排名"
      }
    },
    // 人教点读单词练--分享
    {
      path: '/en_word_share/:catalogid/:nick_name/:head_image?',
      name: 'EnWordShare',
      component: EnWordShare,
      meta:{
        title:"人教点读单词练"
      }
    },
    // 央视主持人-搜索页
    {
      path: '/read_search/:type?',
      name: 'ReadSearch',
      component: ReadSearch,
      meta:{
        title:"搜索"
      }
    },
    // 综合练习
    {
      path: '/unit_exercise/:categoryId?',
      name: 'UnitExercise',
      component: UnitExercise,
      meta:{
        title:"综合练习"
      }
    },
    // 方法技巧
    {
      path: '/method_skill/:category_id?',
      name: 'MethodSkill',
      component: MethodSkill,
      meta:{
        title:"方法技巧"
      }
    },
    // 数学预习课分享/语文名师辅导课分享
    {
      path: '/preview/:course?',
      name: 'PreviewShare',
      component: PreviewShare,
      meta:{
        title:"人教点读"
      }
    },
    // 数学练习
    {
      path: '/mathematics/:book_id',
      name: 'Mathematics',
      component: Mathematics,
      meta:{
        title:"练习"
      }
    },

    // 404
    {
      path: '*',
      name: 'NotFound404',
      component: NotFound404,
      meta:{
        title:"我错了"
      }
    }
  ]
})
export default router

router.beforeEach((to, from, next) => {
  if(to.meta.title) {
    document.title = to.meta.title
  }
  if(to.matched.some((item) => item.meta.login)){

    let user_id = localStorage.getItem("user_id")
    if(user_id){
      next()
    }else{
      router.push({
        path: "/loginpage",
        query: {
          redirect: to.path.slice(1)
        }
      })
    }

  }else{

  }
  next()
})
// pages/WEITAO/weitao/weitao.js
import { taogetCat, taogetList, taogetOne, taogetComment, taoaddComment, taoaddAnswer, taozan } from '../../../services/API'
import { dalay, js_date_time} from '../../../utils/utils'

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navs: {},
    activeType: 1,
    commentsfuzhi:[
      {   avatar:"https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqRRTvvCBnHhFbqA7Tl1MGEpZhjicjIFbHNpncGAianS0UJHFcpCCYxg8TgXiciaPbLS8GZiaQN5CX0NJQ/132",
        comments:0,
        description:"早上好☀️，清晨的阳光透进我的心房，美好的一天由美开始。我要皂起来啦！",
        gender:2,
        id:71,
        images: ["/uploads/201807/9cf72ee2-3c4f-41e5-b5bf-f336fe4083b5.jpg", "/uploads/201807/9cf72ee2-3c4f-41e5-b5bf-f336fe4083b5.jpg"],
        item:35,
        level:1,
        liked:false,
        likes:0,
        name:"小feng子",
        profession:"",
        skin:"",
        subtitle: "",
        title:"早上好☀️，清晨的阳光透进我的心房，美好的一天由美开始。我要皂起来啦！",
        updatedat:1532569051,
        user:1134,
        views:1,
      },
      {
        avatar: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqRRTvvCBnHhFbqA7Tl1MGEpZhjicjIFbHNpncGAianS0UJHFcpCCYxg8TgXiciaPbLS8GZiaQN5CX0NJQ/132",
        comments: 0,
        description: "早上好☀️，清晨的阳光透进我的心房，美好的一天由美开始。我要皂起来啦！",
        gender: 2,
        id: 71,
        images: ["/uploads/201807/9cf72ee2-3c4f-41e5-b5bf-f336fe4083b5.jpg", "/uploads/201807/9cf72ee2-3c4f-41e5-b5bf-f336fe4083b5.jpg"],
        item: 35,
        level: 1,
        liked: false,
        likes: 0,
        name: "小feng子",
        profession: "",
        skin: "",
        subtitle: "",
        title: "早上好☀️，清晨的阳光透进我的心房，美好的一天由美开始。我要皂起来啦！",
        updatedat: 1532569051,
        user: 1134,
        views: 1,
      },
    ],

    taolist:[],
  
  },
  gotoUrl(e) {
    const url = e.currentTarget.dataset.url;

    wx.navigateTo({
      url: url,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  tabNavBar(e) {
    let type = ''
    type = e.currentTarget.dataset.type;

    this.setData({ activeType: type })
    this.taogetList({ cat_id: type})
  },


  taogetList(e){
    taogetList(e).then(({ status, result, msg }) => {
      if (status == 1) {

        const coupons = (result.data || []).map(item => {
          let startDate = js_date_time(item.add_time).split(",");
          console.log(startDate)
          return {
            add_time: startDate,
            article_id: item.article_id,
            click: item.click,
            comment_num: item.comment_num,
            cover_img: item.cover_img,
            title: item.title,
            zan_num: item.zan_num
          }
        });
        console.log(coupons)
        this.setData({
          taolist: coupons
        })

      }
    })
  },

  onLoad: function (options) {
    
    taogetCat().then(({ status, result, msg }) => {
      console.log(result[0].cat_id)
      if (status == 1) {
        this.setData({
          navs: result,
          activeType: result[0].cat_id
        })

      }
    })
    this.taogetList();




  
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
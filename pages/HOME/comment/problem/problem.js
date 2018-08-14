// pages/HOME/comment/problem/problem.js
import { questionlist, questionadd } from '../../../../services/API'
import { dalay } from '../../../../utils/utils'
const app = getApp()
Page({
  data: {
    http: app.http,
    host: app.host,

    wenda:[],

    goodsid:"",
    comment:'',
    page:1

  
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
  onLoad: function (options) {
        // 问答
    app.wxAPI.showLoading('加载中...');
    questionlist({ goods_id: options.id }).then(({ status, result, msg }) => {
      if (status == 1) {
        this.setData({
          // goodsid: options.id,
          wenda: result.data,
        })
        // console.log(options.id)
      } else {
        app.wxAPI.alert(msg);
      }
      app.wxAPI.hideLoading();
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {


  },

  // 获取输入
  onInput(e) {
    setTimeout(() => {
      this.setData({
        comment: e.detail.value
      })
    }, 50)
  },
  // 提问
  questionadd() {
    console.log(this.data.comment);
    app.wxAPI.showLoading('提交...');
    questionadd({ goods_id: 1, content: this.data.comment }).then(({ status, result, msg }) => {
      if (status == 1) {
        this.setData({
        })
      } else {
        app.wxAPI.alert(msg);
      }
      app.wxAPI.hideLoading();
    })
  },

})
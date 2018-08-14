// pages/HOME/comment/mjxlist/mjxlist.js
import { showlist, showinfo, showadd, showanswer, showzan } from '../../../../services/API';
import { js_date_time } from '../../../../utils/utils';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    http: app.http,
    host: app.host,
    maijiaxiu: [],
    comment:"",
    parentid:"",

    pingluntrue:false,
    zantrue: false,


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



    // 单个
    showinfo({ show_id: options.id }).then(({ status, result, msg }) => {
      if (status == 1) {
        this.setData({
          maijiaxiu: result,
          parentid: options.id
        })

      }
    })

   


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
  fabupinglun: function () {

  },
  pinglun: function () {
    this.setData({
      pingluntrue: true,
    })
  },
  pinglunguanbi: function () {
    this.setData({
      pingluntrue:false,
    })
  },
  dianzan: function () {
    showzan({ show_id: this.data.parentid}).then(({ status, result, msg }) => {
      if (status == 1) {
        this.setData({
        })
      } else {
        app.wxAPI.alert(msg);
      }
      app.wxAPI.hideLoading();
    })

  },

  // 获取输入
  onInput(e) {
    setTimeout(() => {
      this.setData({
        comment: e.detail.value
      })
    }, 50)
  },
  // 评论
  showanswer() {

    app.wxAPI.showLoading('提交...');
    showanswer({ parent_id: this.data.parentid, content: this.data.comment }).then(({ status, result, msg }) => {
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

import { taogetComment, taoaddComment, taoaddAnswer } from '../../../services/API'
import { dalay, js_date_time } from '../../../utils/utils'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    main: {},
    plalert: false,
    article_id:'',
    comment: "",
    total:0,
    comment_id:0,

  },

  setpingjia(e) {
    this.setData({
      comment: e.detail.value
    })
  },
  onInput(e) {
    setTimeout(() => {
      this.setData({
        comment: e.detail.value
      })
    }, 50)
  },
  plalert: function (e) {
    let comment_id = e.currentTarget.dataset.id
    this.setData({
      plalert: true,
      comment_id: comment_id
    })
  },
  gbplalert: function () {
    this.setData({
      plalert: false,
    })
  },

  //  回复评论post
  taoaddAnswer: function (e) {
    taoaddAnswer({ content: this.data.comment, comment_id: this.data.comment_id}).then(({ status, result, msg }) => {
      if (status == 1) {
        this.setData({
          plalert: false,
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 单个
    taogetComment({ article_id: options.article_id }).then(({ status, result, msg }) => {
      if (status == 1) {
        const coupons = (result.data || []).map(item => {
          let startDate = js_date_time(item.add_time).split(",");
          return {
            startTime: startDate,
            comment_id: item.comment_id,
            content: item.content,
            user: item.user,
            user_id: item.user_id,
            answer: item.answer,
          }

          const couponstwo = (item.answer.data || []).map(item => {
            let startDatetwo = js_date_time(item.add_time).split(",");
            return {
              startTimetwo: startDatetwo,
              comment_id: item.comment_id,
              content: item.content,
              user: item.user,
              user_id: item.user_id,

            }
          });
        });

        this.setData({
          main: coupons,
          total: result.total
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
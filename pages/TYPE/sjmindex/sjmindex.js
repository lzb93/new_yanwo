// pages/TYPE/sjm/sjm.js
import { encloseindex, enclosegetPrize, encloseshare } from '../../../services/API';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    smjindex:{},
    jieguo:"xxx",
    bushu:"",
    yhquan:{},
    // paimin:"",

  },

  /**
   * 生命周期函数--监听页面加载
   */

  encloseindex(params) {
    encloseindex().then(({ status, result, msg }) => {
      if (status == 1) {
        this.setData({
          smjindex: result
        })
      }
    })
  },

  enclosegetPrize(params) {
    enclosegetPrize(params).then(({ status, result, msg }) => {
      if (status == 1) {
        this.setData({
          yhquan: result
        })
        this.encloseindex();
      }
    })
  },

  encloseshare(params) {
    encloseshare(params).then(({ status, result, msg }) => {
      if (status == 1) {
        this.encloseindex();
      }
    })
  },
  onShow: function (options) {
    var myuse = wx.getStorageSync("jieguo");
    console.log(myuse)
    if (myuse){
      if (myuse.detail.data[0].dataxs == false) {
        this.setData({
          jieguo: myuse.detail.data[0].dataxs
        })
        this.enclosegetPrize({ result: myuse.detail.data[0].dataxs })
      } else {
        this.setData({
          bushu: myuse.detail.data[0].bushu,
          // paimin: myuse.detail.paimin,
          jieguo: myuse.detail.data[0].dataxs
        })
        this.enclosegetPrize({ result: myuse.detail.data[0].dataxs })
      }

      wx.clearStorage({
        key: 'jieguo',
        success: function (res) {
          console.log("清楚缓存");
        }
      })
    }
    this.encloseindex();

  },
  doingsjm: function (e){
    wx.navigateTo({
      url: `/pages/TYPE/sjm/sjm`
    })
  },
  ganbialert:function(e) {
    this.setData({
      jieguo: "xxx",
    })
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let that=this
    if (res.from === 'button') {


    }
    return {
      title: "围住红包",
      path: '/pages/TYPE/sjmindex/sjmindex',

      success: function (res) {
        console.log("分享围住红包");
        that.encloseshare();

        // 转发成功
      },
      fail: function (res) {
        // 转发失败

      }
    }
  }
})
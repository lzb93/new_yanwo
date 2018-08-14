
import { taogetOne, taozan, taoaddComment} from '../../../services/API'
import { dalay, js_date_time} from '../../../utils/utils'

const WxParse = require('../../../utils/wxParse/wxParse.js')

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    main:{},
    plalert:false,
    article_id:'',
    comment:"",
    maincon_time:""
  
  },
  taozan:function(e){
    taozan({ article_id: this.data.article_id }).then(({ status, result, msg }) => {
      if (status == 1) {
        this.setData({
          main: result,
          maincon: result.content
        })
        WxParse.wxParse('article', 'html', result.content, this, 0);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
  plalert:function(){
    this.setData({
      plalert: true,
    })
  },
  gbplalert: function () {
    this.setData({
      plalert: false,
    })
  },
  //  发布评论
  taoaddComment: function (e) {
    taoaddComment({ content: this.data.comment, article_id: this.data.article_id }).then(({ status, result, msg }) => {
      if (status == 1) {
        this.setData({
          main: result,

        })

      }
    })
  },
  onLoad: function (options) {
    // 单个
    taogetOne({ article_id: options.article_id }).then(({ status, result, msg }) => {
      if (status == 1) {
        this.setData({
          article_id:options.article_id,
          main: result,
          maincon:result.content,
          maincon_time: js_date_time(result.add_time),
        })
        WxParse.wxParse('article', 'html', result.content, this, 0);
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


})
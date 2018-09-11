import { reservegetInfo, goodsdetail, addCart, collectGoods, killActivity, reserveAddOrder } from '../../../services/API';
import { js_date_time,js_date_time_ri } from '../../../utils/utils';

const WxParse = require('../../../utils/wxParse/wxParse.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reserve_start: "1970-11-11",
    reserve_end: "1970-11-11",
    http: app.http,
    host: app.host,
    showPop: false,
    itemId: '',
    goodsId: '',
    goods: {},
    gallerys: [],
    specList:[],
    from: 'buy',
    loading: false
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      reserve_start: e.detail.value
    })

  },
  bindDateChange_end: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      reserve_end: e.detail.value
    })

  },

  reserveAddOrder: function (params) {
    reserveAddOrder(params).then(({ status, result, msg }) => {
      if (status === 1) {
        if (from === 'buy') {
          wx.switchTab({ url: '/pages/CART/cart/cart' });
        } else {
          this.closePop();
          app.wxAPI.toast("加入成功");
        }
      } else {
        app.wxAPI.alert(msg)
      }
    })
  },
 
 

  onLoad(options) {
    var newdata = js_date_time_ri(Date.parse(new Date())/1000);
    this.setData({
      itemId: options.itemId || '',
      goodsId: options.id,
      reserve_id: options.reserve_id,
      reserve_start: newdata,
      reserve_end: newdata,
    })

    this.reservegetInfo({ reserve_id: options.reserve_id });
    goodsdetail({ id: options.id }).then(({ status, result, msg }) => {
      if (status == 1) {
        this.setData({
          goodsContent: result.goods_content
        })
        WxParse.wxParse('article', 'html', result.goods_content, this, 5);
      }
    })
  },
  reservegetInfo(params) {
    this.setData({
      loading: true
    })
    app.wxAPI.showLoading("加载中...");
    reservegetInfo(params)
      .then(({ status, result, msg }) => {
        app.wxAPI.hideLoading();
        this.setData({
          loading: false
        })
        if (status == 1) {


          this.setData({
            goods: result.goods,
            // specList: result.spec_goods_price,   //根据规格对应价格
            discount: result.discount,
            goods_id: result.goods_id

          })
          // this.initSpec();
        }
      })
      .catch(() => {
        app.wxAPI.hideLoading();
        this.setData({
          loading: false
        })
        app.wxAPI.alert('加载失败！')
          .then(() => {
            wx.switchTab({
              url: `/pages/HOME/home/home`
            })
          })
      })
  },
  openPop(e) {
    if (!this.data.specList) {
      app.wxAPI.alert('数据加载中，请稍等！');
      return;
    }
    if (e) {
      const type = e.currentTarget.dataset.type;
      this.setData({
        showPop: true,
        from: type
      })
    }
    this.initSpec();
  },

  initSpec() {        //SKU  预定没用到
    const length = this.data.specList.length;
    let activeSpec = {};
    if (length == 0) {
      activeSpec = {
        num: 1,
        store: this.data.goods.store_count,
        price: this.data.goods.now_price,
        goodsId: this.data.goodsId
      }
      this.setData({
        activeSpec
      })
    } else {
      this.formatSpec();
    }
  },
  selectSpec(e) {
    const specs = e.currentTarget.dataset.specs;
    const name = e.currentTarget.dataset.name;
    const id = e.currentTarget.dataset.id;
    (specs || []).forEach((spec) => {
      if (spec.name == name) {
        (spec.list || []).forEach((item) => {
          item.selected = item.item_id == id ? true : false;
        })
      }
    })
    this.setData({ specs })
    this.formatSpec();

  },
  formatSpec() {
    let names = [];
    (this.data.specs || []).forEach((spec) => {
      (spec.list || []).forEach((item) => {
        if (item.selected) {
          names.push(item.item_id);
        }
      })
    })
    names.sort();
    let name = '';
    (names || []).forEach(item => {
      name += '_' + item;
    })
    let selectSpec = (this.data.specList || []).find((item) => {
      return ("_" + item.key) == name;
    })
    if (!selectSpec) {
      return;
    }
    if (selectSpec.prom_type == 1) {
      killActivity({ goods_id: selectSpec.goods_id, item_id: selectSpec.item_id })
        .then(({ status, result, msg }) => {
          if (status == 1) {
            this.setData({
              activeSpec: {
                promType: result.prom_type,
                goodsId: this.data.goodsId,
                itemId: selectSpec.item_id,
                price: result.prom_price || (app.userInfo.is_member == 2 ? selectSpec.member_price : selectSpec.price),
                store: result.prom_store_count || selectSpec.store_count,
                num: 1,
                remark: result.prom_type == 1 ? '该规格正参与限时秒杀!' : ''
              }
            })
          }
        })
      return;
    }
    this.setData({
      activeSpec: {
        goodsId: this.data.goodsId,
        itemId: selectSpec.item_id,
        price: app.userInfo.is_member == 2 ? selectSpec.member_price : selectSpec.price,
        store: selectSpec.store_count,
        num: 1
      }
    })
  },
  closePop() {
    this.setData({
      showPop: false
    })
  },
  upNum() {
    let activeSpec = this.data.activeSpec;
    if (activeSpec.num < activeSpec.store) {
      activeSpec.num = ++activeSpec.num
      this.setData({ activeSpec })
    }
  },
  downNum() {
    let activeSpec = this.data.activeSpec;
    if (activeSpec.num > 1) {
      activeSpec.num = --activeSpec.num
      this.setData({ activeSpec })
    }
  },
  onblur(e) {
    let num = e.detail.value;
    let activeSpec = this.data.activeSpec;
    if (num > 0 && num <= activeSpec.store) {
      activeSpec.num = num;
      this.setData({ activeSpec })
    } else if (num > activeSpec.store) {
      activeSpec.num = activeSpec.store;
      this.setData({ activeSpec })
    } else if (num <= 0) {
      activeSpec.num = 1;
      this.setData({ activeSpec })
    }
  },
  onInput(e) {
    let num = e.detail.value;
    let activeSpec = this.data.activeSpec;
    if (num > activeSpec.store) {
      activeSpec.num = activeSpec.store;
      this.setData({ activeSpec })
    }
  },
  sure(e) {
    let token = app.token;
    if (!token) {
      // 没登录处理....
      app.wxAPI.alert('未登陆!')
        .then(() => {
          wx.reLaunch({
            url: `/pages/USER/user/user?from=pages/KILL/detail/detail&id=${this.data.goodsId}&reserve_id=${this.data.reserve_id}`
          })
          // if (this.data.itemId) {
           
          // } else {
          //   wx.reLaunch({
          //     url: `/pages/USER/user/user?from=pages/KILL/detail/detail&id=${this.data.goodsId}`
          //   })
          // }
        })
      return
    }
    const from = this.data.from;
    const activeSpec = this.data.activeSpec;
    let params = {
      goods_id: activeSpec.goodsId,
      goods_num: activeSpec.num,

      reserve_start: this.data.reserve_start,
      reserve_end: this.data.reserve_end,
      // item_id: activeSpec.itemId || 0
    }

    reserveAddOrder(params).then(({ status, result, msg }) => {
      if (status === 1) {
        this.closePop();
        wx.navigateTo({ url: '/pages/CART/payment/payment?orderSn=' + result.order_sn });
        app.wxAPI.toast("加入成功");
      } else {
        app.wxAPI.alert(msg)
      }
    })

    // addCart(params).then(({ status, result, msg }) => {
    //   if (status === 1) {
    //     if (from === 'buy') {
    //       wx.switchTab({ url: '/pages/CART/cart/cart' });
    //     } else {
    //       this.closePop();
    //       app.wxAPI.toast("加入成功");
    //     }
    //   } else {
    //     app.wxAPI.alert(msg)
    //   }
    // })
  },
  collectFn(e) {
    let token = app.token;
    if (!token) {
      // 没登录处理....
      app.wxAPI.alert('未登陆!')
        .then(() => {
          wx.reLaunch({
            url: `/pages/USER/user/user?from=pages/KILL/detail/detail&id=${this.data.goodsId}&reserve_id=${this.data.reserve_id}`
          })
          // if (this.data.itemId) {
          //   wx.reLaunch({
          //     url: `/pages/USER/user/user?from=pages/KILL/detail/detail&id=${this.data.goodsId}&reserve_id=${this.data.reserve_id}`
          //   })
          // } else {
          //   wx.reLaunch({
          //     url: `/pages/USER/user/user?from=pages/KILL/detail/detail&id=${this.data.goodsId}`
          //   })
          // }
        })
      return
    }
    const goodsId = this.data.goodsId;
    const isCollect = this.data.goods.isCollect ? 0 : 1;
    collectGoods({ goods_id: goodsId, type: isCollect }).then(({ status, result, msg }) => {
      if (status == 1) {
        let goods = this.data.goods;
        goods.isCollect = isCollect;
        this.setData({ goods });
        if (isCollect) {
          app.wxAPI.toast("已收藏");
        }
      }
    })
  },
  excange() {
    let token = app.token;
    if (!token) {
      // 没登录处理....
      app.wxAPI.alert('未登陆!')
        .then(() => {
          wx.reLaunch({
            url: `/pages/USER/user/user?from=pages/KILL/detail/detail&id=${this.data.goodsId}&reserve_id=${this.data.reserve_id}`
          })
        })
      return
    }

    const integralNum = app.userInfo.pay_points;
    const goods = this.data.goods;
    if (integralNum > goods.exchange_integral) {
      app.wxAPI.alert('积分不足，无法兑换！');
      return;
    }
    wx.navigateTo({
      url: `/pages/INTEGRAL/payOrder/payOrder?id=${goods.goodsId}`
    })
    // let params = {
    //   goods_id: goods.goodsId,
    //   goods_num: 1
    // }
    // integral(params)
    //   .then(({status, result, msg}) => {
    //     console.log(status, result, msg);
    //   })
  }
})
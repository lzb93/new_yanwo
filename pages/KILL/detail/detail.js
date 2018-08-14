import { goodsInfo, goodsdetail, addCart, collectGoods, killActivity, questionlist, showIndex} from '../../../services/API';
import { js_date_time } from '../../../utils/utils';

const WxParse = require('../../../utils/wxParse/wxParse.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    http: app.http,
    host: app.host,
    showPop: false,
    itemId: '',
    goodsId: '',
    goods: {},
    gallerys: [],
    from: 'buy',
    loading: false,

    // 问答和买家秀块

    wenda:[],
    maijiaxiu:{},
    

  },
  onLoad(options) {
    console.log(options.id)
    this.setData({
      itemId: options.itemId || '',
      goodsId: options.id
    })

    this.goodsInfo({ id: options.id });
    goodsdetail({ id: options.id }).then(({ status, result, msg }) => {
      if (status == 1) {
        this.setData({
          goodsContent: result.goods_content
        })
        WxParse.wxParse('article', 'html', result.goods_content, this, 5);
      }
    })
    
    // 问题列表
    questionlist({ goods_id: options.id }).then(({ status, result, msg }) => {
      if (status == 1) {
        this.setData({
          wenda: result.data,
        })

      }
    })
    showIndex({ goods_id: options.id }).then(({ status, result, msg }) => {
      if (status == 1) {
        this.setData({
          maijiaxiu: result
        })

      }
    })
 

   
  },
  goodsInfo(params) {
    this.setData({
      loading: true
    })
    app.wxAPI.showLoading("加载中...");
    goodsInfo(params)
      .then(({ status, result, msg }) => {
        app.wxAPI.hideLoading();
        this.setData({
          loading: false
        })
        if (status == 1) {
          const activity = result.activity;
          const goodsInfo = result.goods;
          let goods = {};

          const specList = result.goods_spec_list;
          let specs = (specList || []).map((spec) => {
            const items = [];
            (spec.spec_list || []).forEach((item, index) => {
              if (result.spec_goods_price && this.data.itemId) {
                const specPrice = result.spec_goods_price;
                let specPriceItem = (specPrice || []).find(item => {
                  return item.item_id == this.data.itemId;
                });
                const itemIds = specPriceItem.key.split("_");
                if (~(itemIds || []).findIndex((a) => {
                  return a == item.item_id;
                })) {
                  items.push({
                    item: item.item,
                    item_id: item.item_id,
                    src: item.src,
                    selected: true
                  })
                } else {
                  items.push({
                    item: item.item,
                    item_id: item.item_id,
                    src: item.src,
                    selected: false
                  })
                }
              } else {
                items.push({
                  item: item.item,
                  item_id: item.item_id,
                  src: item.src,
                  selected: index == 0 ? true : false
                })
              }
            })
            return {
              name: spec.spec_name,
              list: items
            }
          })

          goods = {
            goodsId: goodsInfo.goods_id,
            isCollect: goodsInfo.is_collect,
            name: goodsInfo.goods_name,
            remark: goodsInfo.goods_remark,
            img: goodsInfo.original_img,
            marketPrice: goodsInfo.market_price,
            VIPPrice: goodsInfo.member_price,
            price: goodsInfo.shop_price,
            // 标签
            label_position: goodsInfo.label_position,
            label_img: goodsInfo.label_img,

          }

          if (activity.prom_type == 1 && specs.length == 0) {
            goods.promType = activity.prom_type;
            // goods.price = activity.prom_price;
            goods.store = activity.prom_store_count;
            goods.saleNum = activity.virtual_num;
            goods.promPrice = activity.prom_price;
            
          } else if (goodsInfo.exchange_integral > 0) {
            goods.integral = goodsInfo.exchange_integral;
            // goods.price = goodsInfo.shop_price;
            goods.store = goodsInfo.store_count;
            goods.saleNum = goodsInfo.sales_sum;
          } else {
            goods.promType = activity.prom_type;
            // goods.price = goodsInfo.shop_price;
            goods.store = goodsInfo.store_count;
            goods.saleNum = goodsInfo.sales_sum;
          }

          const comments = [];
          (result.comment || []).map((item) => {
            comments.push({
              add_time: js_date_time(item.add_time),
              content: item.content,
              username: item.username,
              head_pic: item.head_pic
            })
          });
          goods.statistics = goodsInfo.statistics;
          this.setData({
            goods: goods,
            gallerys: result.gallery,
            specs: specs,
            specList: result.spec_goods_price,
            comments: comments
          })
          if (this.data.itemId) {
            this.setData({
              showPop: true
            })
            this.openPop();
          }
          app.statistics = this.data.goods.statistics;
          this.initSpec();
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

  initSpec() {
    const length = this.data.specList.length;
    let activeSpec = {};
    if (length == 0) {
      if(this.data.goods.promType == 1) {
        activeSpec = {
          num: 1,
          store: this.data.goods.store,
          price: this.data.goods.promPrice,
          goodsId: this.data.goodsId,
          promType: this.data.goods.promType
        }
      } else {
        activeSpec = {
          num: 1,
          store: this.data.goods.store,
          price: this.data.goods.VIPPrice,
          goodsId: this.data.goodsId
        }
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
          if (this.data.itemId) {
            wx.reLaunch({
              url: `/pages/USER/user/user?from=pages/KILL/detail/detail&id=${this.data.goodsId}&itemId=${this.data.itemId}`
            })
          } else {
            wx.reLaunch({
              url: `/pages/USER/user/user?from=pages/KILL/detail/detail&id=${this.data.goodsId}`
            })
          }
        })
      return
    }
    const from = this.data.from;
    const activeSpec = this.data.activeSpec;
    let params = {
      goods_id: activeSpec.goodsId,
      goods_num: activeSpec.num,
      item_id: activeSpec.itemId || 0
    }
    addCart(params).then(({ status, result, msg }) => {
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
  collectFn(e) {
    let token = app.token;
    if (!token) {
      // 没登录处理....
      app.wxAPI.alert('未登陆!')
        .then(() => {
          if (this.data.itemId) {
            wx.reLaunch({
              url: `/pages/USER/user/user?from=pages/KILL/detail/detail&id=${this.data.goodsId}&itemId=${this.data.itemId}`
            })
          } else {
            wx.reLaunch({
              url: `/pages/USER/user/user?from=pages/KILL/detail/detail&id=${this.data.goodsId}`
            })
          }
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
          if (this.data.itemId) {
            wx.reLaunch({
              url: `/pages/USER/user/user?from=pages/KILL/detail/detail&id=${this.data.goodsId}&itemId=${this.data.itemId}`
            })
          } else {
            wx.reLaunch({
              url: `/pages/USER/user/user?from=pages/KILL/detail/detail&id=${this.data.goodsId}`
            })
          }
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
import { integralMall, integralBanner } from '../../../services/API';

const app = getApp();
Page({
  data: {
    userInfo: app.userInfo,
    host: app.host,
    http: app.http,
    p: 1,
    isAgain: true,
    isNomore: false,
    items: [],
    banners: []
  },
  onLoad() {
    this.setData({
      userInfo: app.userInfo
    })
    integralBanner()
      .then(({status, result, msg}) => {
        if(status == 1) {
          this.setData({
            banners: result
          })
        }
      })
  },
  onShow() {
    this.integralMall({p: this.data.p});
  },
  integralMall(params) {
    integralMall(params)
      .then(({status, result, msg}) => {
        if(status == 1) {
          const list = result.goods_list;
          this.setData({
            items: this.data.items.concat(list),
            p: ++this.data.p,
            isAgain: true
          })

          this.finish(list);
        }
      })
  },
  finish(arr) {
    if (arr.length < 10) {
      this.setData({
        isAgain: false,
        isNomore: true
      })
    }
  },
  navigatorTo(e) {
    const id = e.currentTarget.dataset.id;
    if(~id) {
      wx.navigateTo({
        url: `/pages/KILL/detail/detail?id=${id}`
      })
    } 
  }
})
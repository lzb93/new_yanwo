import { integral, integral2 } from '../../../services/API';

const app = getApp();
Page({
  data: {
    http: app.http,
    host: app.host,
    loading: false
  },
  onLoad(options) {
    //判断是否会员
    if (app.userInfo.is_member == 2) {
      this.setData({
        isMember: true
      })
    }
    this.setData({
      goodsId: options.id
    })
  },
  onShow() {
    app.orderAddress && this.setData({
      address: app.orderAddress
    });

    app.wxAPI.showLoading('加载中...');
    this.setData({
      loading: true
    })
    let params = {
      goods_id: this.data.goodsId,
      goods_num: 1,
      address_id: this.data.address.address_id || ''
    };
    integral(params)
      .then(({ status, result, msg }) => {
        app.wxAPI.hideLoading();
        this.setData({
          loading: false
        })
        if (status == 1) {
          this.setData({
            address: result.userAddress,
            goods: result.goods,
            num: result.goods_num,
            price: result.goods_price
          })
          this.integral2({ goods_id: result.goods.goods_id, address_id: this.data.address.address_id || '', goods_num: 1,});
        } else if (status == -2) {
          app.wxAPI.confirm("去新建一个收货地址？")
            .then(() => {
              wx.navigateTo({
                url: '/pages/USER/addAddress/addAddress?from=payOrder'
              })
            })
            .catch(() => {
              wx.navigateBack()
            })
        } else {
          app.wxAPI.alert(msg)
            .then(() => {
              wx.navigateBack()
            })
        }
      })
  },
  integral2(params) {
    integral2(params)
      .then(({status, result, msg}) => {
        if(status == 1) {

        } else if(status == 0) {
          app.wxAPI.alert('账户积分不足！')
            .then(() => {
              wx.navigateBack({
                delta: 2
              });
            })
        }
      })
  },
  changeAddress() {
    wx.navigateTo({
      url: '/pages/USER/address/address?type=payOrder'
    })
  },
  save() {
    let params = {
      goods_id: this.data.goodsId,
      goods_num: 1,
      address_id: this.data.address.address_id || '',
      act: 'submit_order'
    }
    app.wxAPI.confirm('确认兑换？')
    .then(() => {
      integral2(params)
        .then(({ status, result, msg }) => {
          if (status == 1) {
            app.wxAPI.toast('兑换成功')
            setTimeout(() => {
              wx.redirectTo({
                url: `/pages/USER/order/order?type=ALL`
              })
            }, 1500)
          } else {
            app.wxAPI.alert(msg);
          }
        })
    })
    .catch(() => {

    })
    
    
  }
})
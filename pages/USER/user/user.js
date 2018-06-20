import { teamList } from '../../../services/API';
import { auth } from '../../../services/auth'; 

const app = getApp();
Page({
  data: {
    userInfo: '',
    from: '',
    id: '',
    userNav: [
      {
        type: 'TEAM',
        src: '../../../images/icon_user_team.png',
        name: '拼团订单'
      },
      {
        type: 'WAITPAY',
        src: '../../../images/icon_user_pay.png',
        name: '待付款'
      },
      {
        type: 'WAITSEND',
        src: '../../../images/icon_user_pend.png',
        name: '待发货'
      },
      {
        type: 'WAITRECEIVE',  
        src: '../../../images/icon_user_goods.png',
        name: '待收货'
      },
      {
        type: 'WAITCCOMMENT',
        src: '../../../images/icon_user_finish.png',
        name: '待评论'
      }
    ],
    items: [
      {
        name: '退款列表',
        src: '../../../images/icon_user_tui.png',
        url: '/pages/USER/refundOrder/refundOrder'
      },
      {
        name: '售后/换货',
        src: '../../../images/icon_user_shouhou.png',
        url: '/pages/USER/refund/refund'
      },
      {
        name: '商品收藏',
        src: '../../../images/icon_user_collect.png',
        url: '/pages/USER/collect/collect'
      },
      {
        name: '领劵中心',
        src: '../../../images/icon_user_coupon.png',
        url: '/pages/USER/notused/notused'
      }
    ]
  },
  onLoad(options) {
    this.setData({ 
      userInfo: app.userInfo,
      from: options.from || '',
      id: options.id || '',
      itemId: options.item_id || '',
      teamId: options.team_id || ''
    });
    let token = app.token;
    if (!token) {
      auth(() => {
        this.setData({ userInfo: app.userInfo })
      })
    }
  },
  onShow() {
    
  },
  openUserNav(e) {
    let token = app.token;
    if (!token) {
      app.wxAPI.alert('未登录!')
      return
    }
    const type = e.currentTarget.dataset.type;
    if (type == 'TEAM') {
      wx.navigateTo({
        url: `/pages/TEAM/order/order`
      })
    } else {
      wx.navigateTo({
        url: `/pages/USER/order/order?type=${type}`
      })
    }
  },
  tabList(e) {
    let token = app.token;
    if (!token) {
      app.wxAPI.alert('未登录!')
      return
    }
    const index = e.currentTarget.dataset.index;
    const items = this.data.items;
    wx.navigateTo({
      url: items[index].url
    })
  },

  // 授权
  bindGetUserInfo(e) {
    app.auth(() => {
      this.setData({ userInfo: app.userInfo })
    }, this.data.from, (this.data.id || 0), (this.data.itemId || 0), this.data.teamId)
  }
})
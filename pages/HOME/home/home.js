import { homePage } from '../../../services/API'
import { dalay } from '../../../utils/utils'

const app = getApp();

Page({
  data: {
    http: app.http,
    host: app.host,
    first: '',
    third: '',
    banners: '',
    navTabs: [
      {
        src: '../../../images/icon_home_kill.png',
        name: '秒杀专区',
        url: '/pages/KILL/kill/kill'
      },
      {
        src: '../../../images/icon_home_team.png',
        name: '拼团专区',
        url: '/pages/TEAM/team/team'
      },
      {
        src: '../../../images/icon_home_zhekou.png',
        name: '预购专区',
        url: '/pages/ADVANCE/advance/advance'
        // name: '限时折扣'
      },
      {
        url: '/pages/MODULES/enroll/enroll',
        src: '../../../images/icon_home_tuangou.png',
        name: '团购专区'
      },
      {
        url: '/pages/MODULESNAV/hotel/hotel',
        src: '../../../images/icon_home_cuxiao.png',
        name: '预定'
      }
    ]
  },
  onLoad() {
    // wx.navigateTo({
    //   url: `/pages/TYPE/sjm/sjm`
    // })
  },
  onShow() {
    app.wxAPI.showLoading('加载中...');
    homePage().then(({ status, result, msg }) => {
    
    
      if (status == 1) {
        this.setData({
          banners: result.banner,
          first: result.first,
          third: result.third,
          sort: result.sort
        })
      } else {
        app.wxAPI.alert(msg);
      }
      app.wxAPI.hideLoading();
    })
  },
  onblur(e) {
    this.setData({
      keyword: e.detail.value
    })
  },
  oninput(e) {
    let keyword = e.detail.value
    if (keyword != '') {
      this.setData({
        isEmpt: true,
        keyword
      })
    } else {
      this.setData({
        isEmpt: false
      })
    }
    return keyword.trim()
  },
  empt() {
    setTimeout(() => {
      this.setData({
        keyword: '',
        isEmpt: false
      })
    }, 50)
  },
  search() {
    const keyword = this.data.keyword;
    if (keyword) {
      wx.navigateTo({
        url: `/pages/HOME/searchResult/searchResult?keyword=${keyword}`
      })
    }
  },
  tabList(e) {
    const index = e.currentTarget.dataset.index;
    const list = this.data.navTabs;
    if(!list[index].url) {
      app.wxAPI.alert('该功能未开启！');
      return;
    } else {
      wx.navigateTo({
        url: list[index].url
      })
    }
  },
  onShareAppMessage(res) {
    return {
      title: '元百年男性保健品',
      path: '/pages/HOME/home/home'
    }
  }
})
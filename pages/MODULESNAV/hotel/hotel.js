import { teamList, reservegetlist } from '../../../services/API';
import { dalay } from '../../../utils/utils'

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    http: app.http,
    host: app.host,
    banners: [{
      img:"/public/upload/ad/2018/08-03/638dce003da2ea0f88aa3cda57f91c55.jpg",
      goods_id:155,
    },{
        img: "/public/upload/ad/2018/07-04/434d97373ba16fea17dcde7802cc0b11.jpg",
        goods_id: 33,
    }],
    products: [],
    page: 1,
    isAgain: true,
    isNomore: false,
  },
  reservegetlist(params) {
    reservegetlist({ page: this.data.page }).then(({ status, result, msg }) => {
      if (status == 1) {
        const products = result.data || [];
        const arr = this.data.products.concat(products);
        this.setData({
          products: arr,
          page: ++this.data.page,
          isAgain: true
        })
        this.finish(products);
      } else {
        app.wxAPI.alert(msg)
      }
    })
  },
  onLoad() {
    // this.getTeamList({ page: this.data.page });
    this.reservegetlist({ page: this.data.page });

  },
  onReachBottom() {
    if (!dalay(1000)) return;
    if (!this.data.isAgain) return;
    this.setData({ isAgain: false });
    this.getTeamList({ page: this.data.page });
    this.reservegetlist({ page: this.data.page });
  },
  getTeamList(params) {
    teamList({ p: this.data.page }).then(({ status, result, msg }) => {
      if (status == 1) {
        const products = result || [];
        const arr = this.data.products.concat(products);
        this.setData({
          products: arr,
          page: ++this.data.page,
          isAgain: true
        })
        this.finish(products);
      } else {
        app.wxAPI.alert(msg)
      }
    })
  },
  //结束处理
  finish(arr) {
    if (arr.length < 2) {
      this.setData({
        isAgain: false,
        isNomore: true
      })
    }
  },
  onShareAppMessage(res) {

  }
})
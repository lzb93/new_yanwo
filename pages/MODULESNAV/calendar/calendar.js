Page({
  data: {
    markerData: [],
  },
  onLoad: function () {
    let self = this;
    wx.showLoading({ mask: true });
    //模仿异步
    setTimeout(() => {
      self.setData({
        markerData: [{ 'date': '2018/8/30', 'num': 6 },
        { 'date': '2018/8/5', 'num': 2 },
        { 'date': '2018/8/6', 'num': '你好' }]
      });
      //通过调用子组件的setMarker方法实现刷新
      self.selectComponent("#markerCalendar").setMarker();
      wx.hideLoading();
    }, 2000);
  },
  outputMarker: function (e) {
    let ticketInfo = e.detail;
    console.log(`在${ticketInfo.markerDate}这一天有${ticketInfo.tiketNum}张票`);
  }
})
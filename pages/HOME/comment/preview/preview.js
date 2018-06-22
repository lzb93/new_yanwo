// pages/HOME/comment/preview/preview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // lunbo
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 500,
    swiperCurrent: 0,
    activeCate: 0,

    // 滑动
    startX: 0, //开始坐标
    startY: 0,
    imgclick: true,

    imgs: [
      {
        id: '12',
        time: '2018.11.11',
        name: 'total_sum',
        img: ["https://memb.meilashidai.cn/public/upload/goods/thumb/154/goods_thumb_154_200_200.jpeg", "https://memb.meilashidai.cn/public/upload/goods/thumb/155/goods_thumb_155_300_300.jpeg", "https://memb.meilashidai.cn/public/upload/goods/thumb/155/goods_thumb_155_300_300.jpeg"],
        imglen:"3",
        tit: '买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜',
        con: '买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜',
        zuijiapinglun: '买家秀！！！！！买鞋爱神的箭阿斯的骄傲搜',
        zan: '123',
        pinglun: '22',
        yuedu: "23113"
      },


    ],
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  // 重新设置dot
  swiperChange: function (e) {
    console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },

  // //手指触摸动作开始 记录起点X坐标
  // touchstart: function (e) {
  //   console.log(12313)
  //   //开始触摸时 重置所有删除
 
  //   this.setData({
  //     startX: e.changedTouches[0].clientX,
  //     startY: e.changedTouches[0].clientY,

  //   })
  // },
  // //滑动事件处理
  // touchmove: function (e) {
  //   var that = this,
  //     index = e.currentTarget.dataset.index,//当前索引
  //     startX = that.data.startX,//开始X坐标
  //     startY = that.data.startY,//开始Y坐标
  //     touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
  //     touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
  //     //获取滑动角度
  //     angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
      
  //   //滑动超过30度角 return
  //   if (Math.abs(angle) > 30) return;
  
  //     if (touchMoveX > startX) //右滑
  //       console.log("right")
  //     else //左滑
  //       console.log("left")
   

  //   //更新数据
  
  // },
  // /**
  //  * 计算滑动角度
  //  * @param {Object} start 起点坐标
  //  * @param {Object} end 终点坐标
  //  */
  // angle: function (start, end) {
  //   var _X = end.X - start.X,
  //     _Y = end.Y - start.Y
  //   //返回角度 /Math.atan()返回数字的反正切值
  //   return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  // },

})
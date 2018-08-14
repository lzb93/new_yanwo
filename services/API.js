import request, { get, post } from '../utils/request'
import config from '../utils/config'
// 登录（获取token）
export function thirdLogin(params) {
  return post(config.host + 'c=User&a=thirdLogin', params)
}
// 首页数据
export function homePage() {
  return get(config.host + 'c=Index&a=home')
}
//分类页面
export function getCategory() {
  return get(config.host + 'c=Index&a=getCategory')
}
//分类加载更多
export function getGoodsList(params) {
  return get(config.host + 'c=Index&a=getGoodsList', params)
}
//获取订单详情
export function getOrderDetail(params) {
  return get(config.host + 'c=Order&a=order_detail', params)
}
//获取秒杀时间点
export function killTime(params) {
  return post(config.host + 'c=activity&a=flash_sale_time', params)
}
//获取秒杀数据
export function killData(params) {
  return post(config.host + 'c=activity&a=flash_sale_list', params)
}
//获取秒杀价格
export function killActivity(params) {
  return get(config.host + 'c=Goods&a=goods_activity', params)
}

//积分轮播
export function integralBanner(params) {
  return get(config.host + 'c=Index&a=integralBanner', params)
}
//积分商城
export function integralMall(params) {
  return get(config.host + 'c=Goods&a=integralMall', params)
}
//积分立即兑换
export function integral(params) {
  return post(config.host + 'c=Cart&a=integral', params)
}
//积分立即兑换提交
export function integral2(params) {
  return post(config.host + 'c=Cart&a=integral2', params)
}

//拼团首页
export function teamList(params) {
  return get(config.host + 'c=Team&a=AjaxTeamList', params)
}
//拼团详情
export function teamDetail(params) {
  return get(config.host + 'c=Team&a=info', params)
}
//获取拼团队伍信息
export function teamInfo(params) {
  return get(config.host + 'c=Team&a=ajaxTeamFound', params)
}
//拼团下单
export function addOrder(params) {
  return post(config.host + 'c=Team&a=addOrder', params)
}
//拼团订单结算页
export function teamOrder(params) {
  return post(config.host + 'c=Team&a=order', params)
}
//拼团获取订单详情
export function getOrderInfo(params) {
  return post(config.host + 'c=Team&a=getOrderInfo', params)
}
//获取更多拼团订单
export function getMoreTeam(params) {
  return get(config.host + 'c=order&a=team_list', params)
}
//获取分享页
export function getTeamFound(params) {
  return get(config.host + 'c=Team&a=found', params)
}

//获取商品详情
export function goodsInfo(params) {
  return post(config.host + 'c=Goods&a=goodsInfo', params)
}
//收藏商品
export function collectGoods(params) {
  return post(config.host + 'c=Goods&a=collectGoodsOrNo', params)
}
//获取商品详情内容
export function goodsdetail(params) {
  return get(config.host + 'c=Goods&a=goodsContent', params)
}
//获取商品评价
export function getGoodsComment(params) {
  return post(config.host + 'c=Goods&a=getGoodsComment', params)
}

// 问答模块list
export function questionlist(params) {
  return post(config.http + '/index.php?m=api&c=question&a=getList', params)
}
// 获取单个问答
export function questioninfo(params) {
  return post(config.http + '/index.php?m=api&c=question&a=getOne', params)
}
// 发表问题
export function questionadd(params) {
  return post(config.http + '/index.php?m=api&c=question&a=addQuestion', params)
}
// 回答问题 question/answer/
export function questionanswer(params) {
  return post(config.http + '/index.php?m=api&c=question&a=addAnswer', params)
}




// 买家秀模块
// 买家秀list
export function showlist(params) {
  return post(config.http + '/index.php?m=api&c=show&a=getList', params)
}

// 买家秀list  showIndex
export function showIndex(params) {
  return post(config.http + '/index.php?m=api&c=show&a=getIndex', params)
}
// 获取单个问答
export function showinfo(params) {
  return post(config.http + '/index.php?m=api&c=show&a=getOne', params)
}
// 发表问题
export function showadd(params) {
  return post(config.http + '/index.php?m=api&c=show&a=addshow', params)
}
// 回答问题 question/answer/
export function showanswer(params) {
  return post(config.http + '/index.php?m=api&c=show&a=addAnswer', params)
}

// zan
export function showzan(params) {
  return post(config.http + '/index.php?m=api&c=show&a=zan', params)
}





//加入购物车
export function addCart(params) {
  return post(config.host + 'c=Cart&a=addCart', params)
}
//购物车列表
export function cartList(params) {
  return post(config.host + 'c=Cart&a=cartList', params)
}
//删除购物车产品
export function delCart(params) {
  return post(config.host + 'c=Cart&a=delCart', params)
}
//获取订单表格
export function orderEdit(params) {
  return post(config.host + 'c=Cart&a=cart2', params)
}
//提交订单
export function saveOrder(params) {
  return post(config.host + 'c=Cart&a=cart3', params)
}
// 获取微信支付需要的信息
export function getPaymentOrder(params) {
  return get(config.host + 'c=Cart&a=cart4', params)
}
//支付
export function doPay(params) {
  return post(config.host + 'c=Wxpay&a=dopay', params)
}
//确定收货
export function orderConfirm(params) {
  return post(config.host + 'c=User&a=orderConfirm', params)
}
//取消订单
export function cancelOrder(params) {
  return get(config.host + 'c=User&a=cancelOrder', params)
}
//取消订单(已支付)
export function refundOrder(params) {
  return post(config.host + 'c=Order&a=refund_order', params)
}
//申请售后
export function returnGoods(params) {
  return post(config.host + 'c=Order&a=return_goods', params)
}
//订单退款
export function returnGodds(params) {
  return get(config.host + 'c=order&a=return_goods_info', params)
}
//售后列表
export function refundGoodsList(params) {
  return post(config.host + 'c=user&a=return_goods_list', params)
}
//退款列表
export function refundOrderList(params) {
  return post(config.host + 'c=order&a=return_goods_list', params)
}
//查看物流
export function getExpress(params) {
  return get(config.host + 'c=user&a=express', params)
}
//获取物流
export function getQueryExpress(params) {
  return get(config.host + 'c=user&a=queryExpress', params)
}
//评价
export function getGoodsaddcomment(params) {
  return post(config.host + 'c=User&a=add_comment', params)
}


//获取收货地址列表
export function getAddressList() {
  return get(config.host + 'c=User&a=getAddressList')
}
//编辑或添加收货地址
export function addAddress(params) {
  return post(config.host + 'c=User&a=addAddress', params)
}
//设置默认收货地址
export function setDefaultAddress(params) {
  return post(config.host + 'c=User&a=setDefaultAddress', params)
}
//删除收货地址
export function delAddress(params) {
  return post(config.host + 'c=User&a=del_address', params)
}

//获取订单列表
export function getOrderList(params) {
  return get(config.host + 'c=User&a=getOrderList', params)
}
//获取收藏商品列表
export function getGoodsCollect(params) {
  return get(config.host + 'c=User&a=getGoodsCollect', params)
}
//获取我的优惠卷
export function getCouponList(params) {
  return get(config.host + 'c=User&a=getCouponList', params)
}
//领劵中心
export function couponList(params) {
  return get(config.host + 'c=Activity&a=coupon_list', params)
}
//领取优惠券
export function getCoupon(params) {
  return post(config.host + 'c=Activity&a=get_coupon', params)
}

//省市区获取
export function getRegion(params) {
  return get(config.host + 'c=index&a=get_region', params)
}

//商品搜索
export function search(params) {
  return get(config.host + 'c=Goods&a=search', params)
}


// 微淘

// 获取分类(导航栏)
// index.php ? m = api & c=tao & a=getCat
export function taogetCat(params) {
  return get(config.host + 'c=tao&a=getCat', params)
}


// 获取列表
// index.php ? m = api & c=tao & a=getList
export function taogetList(params) {
  return get(config.host + 'c=tao&a=getList', params)
}


// 获取单篇文章
// index.php ? m = api & c=tao & a=getOne & article_id=get / post
export function taogetOne(params) {
  return get(config.host + 'c=tao&a=getOne', params)
}

// 获取评论
// index.php ? m = api & c=tao & a=getComment & article_id=
// get / post
export function taogetComment(params) {
  return get(config.host + 'c=tao&a=getComment', params)
}

// 发表评论post
// index.php ? m = api & c=tao & a=addComment & article_id=
// 必填参数content
export function taoaddComment(params) {
  return get(config.host + 'c=tao&a=addComment', params)
}


// 回复评论post
// index.php ? m = api & c=tao & a=addAnswer & comment_id=
// 必填参数content
export function taoaddAnswer(params) {
  return get(config.host + 'c=tao&a=addAnswer', params)
}

// 点赞
// index.php ? m = api & c=tao & a=zan & article_id=
// get / post
export function taozan(params) {
  return get(config.host + 'c=tao&a=zan', params)
}


// 围住红包模块接口 
// 获取游戏配置信息  index.php?m=api&c=enclose&a=index

export function encloseindex(params) {
  return get(config.host + 'c=enclose&a=index', params)
}


// 达到分数条件，领取奖品
// index.php ? m = api & c=enclose & a=getPrize
// 必填参数step(int)步数
export function enclosegetPrize(params) {
  return get(config.host + 'c=enclose&a=getPrize', params)
}

// 分享游戏，成功游戏次数 + 1
// index.php ? m = api & c=enclose & a=share
export function encloseshare(params) {
  return get(config.host + 'c=enclose&a=share', params)
}
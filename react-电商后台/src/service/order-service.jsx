import Util    from 'util/mm.jsx'
const _mm = new Util()

class Order {
  // 获取订单列表
  getOrderList(listParam) {
    let url  = ''
    const  data  = {
          pageNum: listParam.pageNum
        };
    if(listParam.listType === 'list'){
      url = '/manage/order/list.do';
    } else if (listParam.listType === 'searchList') {
      url = '/manage/order/search.do'
      data.orderNo = listParam.orderNo;
    }
    return _mm.request({
      type  : 'post',
      url   : url,
      data  : data
    })
  }

  // 获取订单详情
  getOrder(orderNo) {
    return _mm.request({
      type  : 'post',
      url   : '/manage/order/detail.do',
      data  : {
        orderNo : orderNo
      }
    })
  }
}

export default Order
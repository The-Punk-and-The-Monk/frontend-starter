import React        from 'react';
import { Link }     from 'react-router-dom'
import PageTitle    from 'component/page-title/index.jsx'
import TableList    from 'util/table-list/index.jsx'
import Pagination   from 'util/pagination/index.jsx'
import ListSearch   from './order-list-search.jsx'


import Util         from 'util/mm.jsx'
const _mm = new Util()
import Order         from 'service/order-service.jsx'
const _order = new Order();

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list : [],
      pageNum : 1,
      listType: 'list'    // list / search
    }
  }

  componentDidMount(){
    this.loadOrderList();
  }

  // 加载商品列表
  loadOrderList() {
    const listParam = {
      listType  : this.state.listType,
      pageNum   : this.state.pageNum
    }

    // 如果是搜索的话, 需要传入搜索类型和搜索关键字
    if(this.state.listType === 'searchList'){
      listParam.orderNo = this.state.orderNo;
    }

    // 请求接口
    _order.getOrderList(listParam).then(res => {
      this.setState(res)
    }, errMsg => {
      this.setState({
        list: [],
      })
      _mm.errorTips(errMsg)
    })
  }

  // 搜索
  onSearch = (orderNo) => {
    const listType = orderNo === '' ? 'list' : 'searchList'
    this.setState({
      listType      : listType,
      pageNum       : 1, 
      orderNo
    }, () => {
      this.loadOrderList()
    })
  }

  // 页数发生变化的时候
  onPageNumChange(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadOrderList();
    })
  }

  render() {
    const tableHeads = ['订单号', '收件人', '订单状态', '订单总价', '订单时间', '操作', ]
    const listBody = this.state.list.map(
      (order, index) => {
        return (
          <tr key={order.orderNo}>
            <td>
              <Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
            </td>
            <td>{order.receiverName}</td>
            <td>{order.statusDesc}</td>
            <td>{order.payment}</td>
            <td>{order.createTime}</td>
            <td>
              <Link to={`/order/detail/${order.orderNo}`}>详情</Link>
            </td>
          </tr>
        );
      }) 
    
    return (
      <div id='page-wrapper'>
        <PageTitle title="订单列表">
          <div className='page-header-right'>
            <Link to="/order/save" className="btn btn-primary">
              <i className="fa fa-plus"></i>
              &nbsp;添加商品
            </Link>
          </div>
        </PageTitle>
        <ListSearch onSearch={this.onSearch}/>
        <TableList tableHeads={tableHeads}>
          {
            listBody
          }
        </TableList>
        <Pagination current={this.state.pageNum} total={this.state.total} onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
      </div>
    )
  }
}

export default OrderList
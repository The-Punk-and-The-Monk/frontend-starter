import React, { PureComponent } from 'react';
import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';
import './detail.scss'

import Order from 'service/order-service.jsx'
const _order = new Order()
import Util         from 'util/mm.jsx'
const _mm = new Util()

/**
 *
 *
 * @class OrderDetail
 * @extends {React.Component}
 */
class OrderDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNo: this.props.match.params.orderNo,
      orderInfo: {}
    }
  }

  componentDidMount(){
    this.loadOrder();
  }

  loadOrder(){
    _order.getOrder(this.state.orderNo).then(res=>{
      this.setState({
        orderInfo: res
      });
    }, (errMsg)=>{
      _mm.errorTips(errMsg)
    })
  }
  

  /**
   *
   *
   * @return {Elem}
   * @memberof OrderDetail
   */
  render() {
    const shippingVo = this.state.orderInfo.shippingVo || {};
    const productList = this.state.orderInfo.orderItemVoList || [];
    const tableHeads = ['商品图片', '商品信息', '单价', '数量', '合计',]
    const listBody = productList.map(
      (product, index) => {
        return (
          <tr key={product.productId}>
            <td>
              <img 
                className="p-img"
                src={`${this.state.orderInfo.imageHost}${product.productImage}`} 
                alt={product.productName}
              />
            </td>
            <td>{product.productName}</td>
            <td>{product.currentUnitPrice}</td>
            <td>{product.quantity}</td>
            <td>{product.totalPrice}</td>
          </tr>
        );
      }) 

    return (
      <div id="page-wrapper">
        <PageTitle title="订单详情" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">订单号</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.orderInfo.orderNo}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">创建时间</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.orderInfo.createTime}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">收件人</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {shippingVo.receiverName},&nbsp;
                {shippingVo.receiverProvince}
                {shippingVo.receiverCity}
                {shippingVo.receiverAddress}
                {shippingVo.receiverMobile || shippingVo.receiverPhone}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">订单状态</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.orderInfo.statusDesc}
                {
                  this.state.orderInfo.status === 20 
                  ? <button className="btn btn-default btn-sm btn-sent-goods">立即发货</button>
                  : null
                }
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">支付方式</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">订单金额</label>
            <div className="col-md-5">
              <p className="form-control-static">{this.state.orderInfo.payment}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品列表</label>
            <div className="col-md-10">
              <TableList tableHeads={tableHeads}>
                {
                  listBody
                }
              </TableList>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDetail;

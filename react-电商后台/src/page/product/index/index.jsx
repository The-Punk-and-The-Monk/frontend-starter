import React        from 'react';
import { Link }     from 'react-router-dom'
import PageTitle    from 'component/page-title/index.jsx'
import TableList    from 'util/table-list/index.jsx'
import Pagination   from 'util/pagination/index.jsx'
import ListSearch   from './index-list-search.jsx'

import './index.scss'

import Util         from 'util/mm.jsx'
const _mm = new Util()
import Product         from 'service/product-service.jsx'
const _product = new Product();

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list : [],
      pageNum : 1,
      listType: 'list'
    }
  }

  componentDidMount(){
    this.loadProductList();
  }

  // 加载商品列表
  loadProductList() {
    const listParam = {
      listType  : this.state.listType,
      pageNum   : this.state.pageNum
    }

    // 如果是搜索的话, 需要传入搜索类型和搜索关键字
    if(this.state.listType === 'searchList'){
      listParam.searchType = this.state.searchType;
      listParam.searchKeyword = this.state.searchKeyword;
    }

    // 请求接口
    _product.getProductList(listParam).then(res => {
      this.setState(res)
    }, errMsg => {
      this.setState({
        list: [],
      })
      _mm.errorTips(errMsg)
    })
  }

  // 搜索
  onSearch = (searchType, searchKeyword) => {
    const listType = searchKeyword === '' ? 'list' : 'searchList'
    this.setState({
      listType      : listType,
      pageNum       : 1, 
      searchType    : searchType, 
      searchKeyword : searchKeyword
    }, () => {
      this.loadProductList()
    })
  }

  // 页数发生变化的时候
  onPageNumChange(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadProductList();
    })
  }

  // 商品上下架
  onSetProductStatus(e, productId, currentStatus){
    const newStatus = currentStatus = 1 ? 2 : 1
    const confirmTips = currentStatus == 1
      ? '确定要下架该商品?' : '确定要上架该商品?';
    if(window.confirm(confirmTips)){
      _product.setProductStatus({
        productId: productId,
        status: newStatus
      }).then(res => {
        _mm.successTips(res);
        this.loadProductList();
      }, errMsg => {
        _mm.errorTips(errMsg)
      })
    }
  }

  render() {
    const listBody = this.state.list.map(
      (product, index) => {
        return (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>
              <p>{product.name}</p>
              <p>{product.subtitle}</p>
            </td>
            <td>{product.price}</td>
            <td>
                <p>{product.status == 1 ? '在售' : '已下架'}</p>
                <button className="btn btn-warning btn-xs" onClick={(e) => {this.onSetProductStatus(e, product.id, product.status)}}>{product.status == 1 ? '下架' : '上架'}</button>
            </td>
            <td>
              <Link className="opera" to={`/product/detail/${product.id}`}>详情</Link>
              <Link className="opera" to={`/product/save/${product.id}`}>编辑</Link>
            </td>
          </tr>
        );
      }) 
    
    return (
      <div id='page-wrapper'>
        <PageTitle title="商品列表">
          <div className='page-header-right'>
            <Link to="/product/save" className="btn btn-primary">
              <i className="fa fa-plus"></i>
              &nbsp;添加商品
            </Link>
          </div>
        </PageTitle>
        <ListSearch onSearch={this.onSearch}/>
        <TableList tableHeads={['商品ID', '商品信息', '价格', '状态', '操作']}>
          {
            listBody
          }
        </TableList>
        <Pagination current={this.state.pageNum} total={this.state.total} onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
      </div>
    )
  }
}

export default ProductList
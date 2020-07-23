import React from 'react';
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import TableList from 'util/table-list/index.jsx'
import './index.scss'

import Util    from 'util/mm.jsx'
const _mm = new Util()
import Product from 'service/product-service.jsx'
const _product = new Product()

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list : [],
      parentCategoryId : this.props.match.params.categoryId || 0
    }
  }

  componentDidMount(){
    this.loadCategoryList();
  }

  componentDidUpdate(prevProps, prevState){
    const oldPath = prevProps.location.pathname,
          newPath = this.props.location.pathname,
          newId = this.props.match.params.categoryId || 0
    if(oldPath !== newPath){
      this.setState({
        parentCategoryId: newId
      }, () => {
        this.loadCategoryList()
      })
    }
  }

  loadCategoryList() {
    _product.getCategoryList(this.state.parentCategoryId).then(res => {
      this.setState({
        list: res
      })
    }, errMsg => {
      this.setState({
        list: [],
      })
      _mm.errorTips(errMsg)
    })
  }

  onUpdateName = (categoryId, categoryName) => {
    const newName = window.prompt('请输入新的品类名称', categoryName)
    if(newName) {
      _product.updateCategoryName({
        categoryId: categoryId,
        categoryName: newName
      }).then(res => {
        _mm.successTips(res.msg);
        this.loadCategoryList();
      }, errMsg => {
        _mm.errorTips(errMsg);
      })
    }
  }

  render() {
    const listBody = this.state.list.map(
      (category, index) => {
        return (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>
              <a className='operation'
                onClick={() => this.onUpdateName(category.id, category.name)}
              >更改名称</a>
              {
                category.parentId === 0 
                ? <Link to={"/product-category/index/" + category.id}>查看二级品类</Link>
                : null
              }
            </td>
          </tr>
        );
      })


    return (
      <div id='page-wrapper'>
        <PageTitle title="品类列表" />
        <div className="row">
          <div className="col-md-12">
            <p>父品类ID: {this.state.parentCategoryId}</p>
          </div>
        </div>
        <TableList tableHeads={['品类ID', '品类名称', "操作"]}>
          {
            listBody
          }
        </TableList>
      </div>
    )
  }
}

export default CategoryList
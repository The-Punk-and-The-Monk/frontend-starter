import React from 'react';
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import TableList from 'util/table-list/index.jsx'
import './index.scss'

import Util    from 'util/mm.jsx'
const _mm = new Util()
import Product from 'service/product-service.jsx'
const _product = new Product()

class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryList : [],
      parentCategoryId : 0,
      categoryName: ""
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
    _product.getCategoryList().then(res => {
      this.setState({
        categoryList: res
      })
    }, errMsg => {
      _mm.errorTips(errMsg)
    })
  }

  onValueChange = (event) => {
    const name = event.target.name,
          value = event.target.value
    this.setState({
      [name]: value
    })
  }

  onSubmit = (e) => {
    const categoryName = this.state.categoryName
    if(categoryName){
      _product.saveCategory({
        parentId:this.state.parentCategoryId,
        categoryName
      }).then((res) => {
        _mm.successTips(res.msg)
        this.props.history.push('/product-category/index')
      }, (errMsg) => {
        _mm.errorTips(errMsg)
      })
    }else{
      _mm.errorTips("请输入品类名称")
    }
  }


  render() {
    return (
      <div id='page-wrapper'>
        <PageTitle title="品类列表" />
        <div className="row">
          <div className="col-md-12">
            <div className="form-horizontal">
              <div className="form-group">
                <label className="col-md-2 control-label">所属品类</label>
                <div className="col-md-5">
                  <select name="parentCategoryId" 
                    className="form-control"
                    onChange={this.onValueChange}
                  >
                    <option value="0">根品类</option>
                    {
                      this.state.categoryList.map((category, index) => {
                        return (<option value={category.id} key={category.id}>根品类/{category.name}</option>)
                      })
                    }
                  </select>
                </div>
            </div>
              <div className="form-group">
                <label className="col-md-2 control-label">品类名称</label>
                <div className="col-md-5">
                  <div className="input-group">
                    <input type="text" className="form-control" 
                      placeholder="请输入品类名称"
                      name="categoryName"
                      value={this.state.stock}
                      onChange={this.onValueChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button type="submit" className="btn btn-primary"
                    onClick={this.onSubmit}
                  >提交</button>
                </div>
              </div>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddCategory
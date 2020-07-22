import React, { PureComponent } from 'react';
import Util         from 'util/mm.jsx'
const _mm = new Util()
import Product         from 'service/product-service.jsx'
const _product = new Product();

// 品类选择器
class CategorySelector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstCategoryList: [],
      firstCategoryId: 0,
      secondCategoryList: [],
      secondCategoryId: 0
    }
  }

  componentDidMount() {
    this.loadFirstCategory();
  }

  componentWillReceiveProps(nextProps) {
    const categoryIdChange = this.props.categoryId !== nextProps.categoryId
    const parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId
    if(!categoryIdChange && !parentCategoryIdChange){
      return;
    }
    if(nextProps.parentCategoryId === 0){
      this.setState({
        firstCategoryId: nextProps.categoryId,
        secondCategoryId: 0
      })
    }else{
      this.setState({
        firstCategoryId: nextProps.parentCategoryId,
        secondCategoryId: nextProps.categoryId
      }, () => {
        parentCategoryIdChange && this.loadSecondCategory();
      })
    }
  }

  // 加载一级分类
  loadFirstCategory() {
    _product.getCategoryList().then(res => {
      this.setState({
        firstCategoryList: res
      });
    }, errMsg => {
      _mm.errorTips(errMsg)
    })
  }

  // 加载二级品类
  loadSecondCategory = () => {
    if(this.state.firstCategoryId){
      _product.getCategoryList(this.state.firstCategoryId).then(res => {
        this.setState({
          secondCategoryList: res
        });
      }, errMsg => {
        _mm.errorTips(errMsg)
      })
    }
  }

  // 传给父组件选中的结果
  onPropsCategoryChange = () => {
    if(typeof this.props.onCategoryChange === 'function'){
      if(this.state.secondCategoryId){
        this.props.onCategoryChange(this.state.firstCategoryId, this.state.secondCategoryId)
      }else{
        this.props.onCategoryChange(this.state.firstCategoryId, 0)
      }
    }
  }

  onFirstCategoryChange = (e) => {
    const newValue = e.target.value || 0;
    this.setState({
      firstCategoryId: newValue,
      secondCategoryId: 0,
      secondCategoryList: []
    }, () => {
      // 更新二级品类
      this.loadSecondCategory();
      this.onPropsCategoryChange();
    })
  }

  onSecondCategoryChange = (e) => {
    const newValue = e.target.value || 0;
    this.setState({
      secondCategoryId: newValue,
    }, () => {
      this.onPropsCategoryChange();
    })
  }

  /**
   * @return {Elem}
   * @memberof CategorySelector
   */
  render() {
    return (
      <div className="col-md-3">
        <select name="" id="" className="form-control"
          disabled={this.props.disabled}
          value={this.state.firstCategoryId}
          onChange={this.onFirstCategoryChange}
        >
          <option value="">请选择一级分类</option>
          {
            this.state.firstCategoryList.map(
              (category) => <option key={category.id} value={category.id}>{category.name}</option>
              )
          }
        </select>
        <select name="" id="" className="form-control"
          disabled={this.props.disabled}
          value={this.state.secondCategoryId}
          onChange={this.onSecondCategoryChange}
        >
          <option value="">请选择二级分类</option>
          {
            this.state.secondCategoryList.map(
              (category) => <option key={category.id} value={category.id}>{category.name}</option>
              )
          }
        </select>
      </div>
    );
  }
}

export default CategorySelector;

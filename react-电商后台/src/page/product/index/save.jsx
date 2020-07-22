import React, { PureComponent } from 'react';
import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from 'page/product/index/category-selector.jsx';
import FileUploader from 'util/file-uploader/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx';
import './save.scss'

import Product from 'service/product-service.jsx'
const _product = new Product()
import Util         from 'util/mm.jsx'
const _mm = new Util()

/**
 *
 *
 * @class ProductSave
 * @extends {React.Component}
 */
class ProductSave extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: parseInt(this.props.match.params.pid),
      categoryId: 0,
      parentCategoryId: 0,
      subImages: [],
      detail: '',
      name: "",
      subtitle: "",
      price: "",
      stock: "",
      status: 1    // 商品状态 在售
    }
  }
  componentDidMount(){
    this.loadProduct();
  }

  loadProduct(){
    if(this.state.id){
      _product.getProduct(this.state.id).then(res=>{
        const images = res.subImages.split(',')
        res.subImages = images.map((imgUri) => {
          return {
            uri: imgUri,
            url: res.imageHost + imgUri
          }
        })
        res.defaultDetail = res.detail
        this.setState(res);
      }, (errMsg)=>{
        _mm.errorTips(errMsg)
      })
    }
  }

  //简单字段的改变: 商品名称, 商品描述, 价格, 库存
  onValueChange = (e) => {
    const name = e.target.name,
          value = e.target.value.trim(); 
    this.setState({
      [name]: value
    })
  }

  onCategoryChange = (firstCategoryId, secondCategoryId) => {
    this.setState({
      categoryId: secondCategoryId,
      parentCategoryId: firstCategoryId
    })
  }

  onUploadSuccess = (res) => {
    const newSubImages = this.state.subImages
    newSubImages.push(res)
    this.setState({
      subImages: newSubImages
    })
  }

  onUploadError = (errMsg) => {
    _mm.errorTips(errMsg || "上传图片失败")
  }

  onImageDelete = (e) => {
    const index = e.target.dataset.index
    const newSubImages = this.state.subImages
    newSubImages.splice(index, 1)
    this.setState({
      subImages: newSubImages
    })
  }

  // 富文本编辑器的变化
  onRichEditorValueChange = (value) => {
    this.setState({
      detail: value
    })
  }

  // 提交表单
  onSubmit = (event) => {
    const product = {
      name: this.state.name,
      subtitle: this.state.subtitle,
      categoryId: parseInt(this.state.categoryId),
      subImages: this.state.subImages.map((image)=> image.uri).join(','),
      detail: this.state.detail,
      price: parseFloat(this.state.price),
      stock: parseInt(this.state.stock),
      status: this.state.status
    }

    // 表单验证
    const productCheckResult = _product.checkProduct(product);
    if(this.state.id){
      product.id = this.state.id;
    }
    if(productCheckResult.status){
      _product.saveProduct(product).then((res) => {
        _mm.successTips(res);
        this.props.history.push('/product/index')
      }, (errMsg) => {
        _mm.errorTips(errMsg);
      })
    } else {
      _mm.errorTips(productCheckResult.msg);
    }
  }
  
  /**
   *
   *
   * @return {Elem}
   * @memberof ProductSave
   */
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title={this.state.id ? "编辑商品" : "添加商品"} />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
              <input type="text" className="form-control" 
                placeholder="请输入商品名称" 
                name='name'
                value={this.state.name}
                onChange={this.onValueChange}
                />
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
              <input type="text" className="form-control" 
                placeholder="请输入商品描述" 
                name="subtitle"
                value={this.state.subtitle}
                onChange={this.onValueChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategorySelector 
              onCategoryChange={this.onCategoryChange}
              categoryId={this.state.categoryId}
              parentCategoryId={this.state.parentCategoryId}
            />
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">商品价格</label>
            <div className="col-md-3">
              <div className="input-group">
                <input type="number" className="form-control" placeholder="价格" aria-describedby="basic-addon2" 
                  name="price"
                  value={this.state.price}
                  onChange={this.onValueChange}
                />
                <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">商品库存</label>
            <div className="col-md-3">
              <div className="input-group">
                <input type="number" className="form-control" placeholder="库存" aria-describedby="basic-addon2" 
                  name="stock"
                  value={this.state.stock}
                  onChange={this.onValueChange}
                />
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">商品图片</label>
            <div className="col-md-10">
              {
                this.state.subImages.length 
                ? this.state.subImages.map(
                  (image, index) => (
                    <div className="uploaded-image-container" key={image.url}>
                      <img src={image.url} alt=''/>
                      <i className="fa fa-close" data-index={index} onClick={this.onImageDelete} />
                    </div>
                  )
                )
                : <div>请上传图片</div>
              }
            </div>
            <div className="col-md-offset-2 col-md-10">
              <FileUploader 
                onSuccess={this.onUploadSuccess}
                onErrot={this.onUploadError}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10">
              <RichEditor 
                defaultDetail={this.state.defaultDetail}
                onValueChange={this.onRichEditorValueChange}/>
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
    );
  }
}

export default ProductSave;

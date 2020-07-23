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
 * @class ProductDetail
 * @extends {React.Component}
 */
class ProductDetail extends React.Component {
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
        this.setState(res);
      }, (errMsg)=>{
        _mm.errorTips(errMsg)
      })
    }
  }

  /**
   *
   *
   * @return {Elem}
   * @memberof ProductDetail
   */
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="商品详情" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
              <input type="text" className="form-control" 
                placeholder="请输入商品名称" 
                name='name'
                value={this.state.name}
                disabled
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
                disabled
              />
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategorySelector 
              onCategoryChange={this.onCategoryChange}
              categoryId={this.state.categoryId}
              disabled
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
                  disabled
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
                  disabled
                />
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">商品图片</label>
            <div className="col-md-10">
              {
                this.state.subImages.map(
                  (image, index) => (
                    <div className="uploaded-image-container" key={image.url}>
                      <img src={image.url} alt=''/>
                    </div>
                  )
                )
              }
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10" dangerouslySetInnerHTML={{__html:this.state.detail}}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;

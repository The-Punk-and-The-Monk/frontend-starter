import Util    from 'util/mm.jsx'
const _mm = new Util()

class Product {
  // 获取用户列表
  getProductList(listParam) {
    let url  = ''
    const  data  = {
          pageNum: listParam.pageNum
        };

    if(listParam.listType === 'list'){
      url = '/manage/product/list.do';
    } else if (listParam.listType === 'searchList') {
      url = '/manage/product/search.do'
      data[listParam.searchType] = listParam.searchKeyword;
    }
    return _mm.request({
      type  : 'post',
      url   : url,
      data  : data
    })
  }

  // 获取商品详情
  getProduct(productId) {
    return _mm.request({
      type  : 'post',
      url   : '/manage/product/detail.do',
      data  : {
        productId : productId || 0
      }
    })
  }

  //变更商品销售状态 
  setProductStatus(productInfo){
    return _mm.request({
      type  : 'post',
      url   : '/manage/product/set_sale_status.do',
      data  : productInfo
    })
  }

  saveProduct(product){
    return _mm.request({
      type  : 'post',
      url   : '/manage/product/save.do',
      data  : product
    })
  }

  //新增品类
  saveCategory(category){
    return _mm.request({
      type  : 'post',
      url   : '/manage/category/add_category.do',
      data  : category
    })
  }

  // 修改品类名称
  updateCategoryName(category){
    return _mm.request({
      type  : 'post',
      url   : '/manage/category/set_category_name.do',
      data  : category
    })
  }

  // 检查保存商品的表单数据
  checkProduct(product) {
    const result = {
      status: true,
      msg: '验证通过'
    }
    if(typeof product.name !== 'string' || product.name.length === 0){
      return {
        status: false,
        msg: "商品名称不能为空! "
      }
    }
    if(typeof product.subtitle !== 'string' || product.subtitle.length === 0){
      return {
        status: false,
        msg: "商品描述不能为空! "
      }
    }
    if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)){
      return {
        status: false,
        msg: "请选择商品品类! "
      }
    }
    if(typeof product.price !== 'number' || !(product.price >= 0)){
      return {
        status: false,
        msg: "请输入正确的价格! "
      }
    }
    if(typeof product.stock !== 'number' || !(product.stock >= 0)){
      return {
        status: false,
        msg: "请输入正确的库存数量! "
      }
    }

    return result
  }

  /**
   * 品类相关
   * 根据父品类id, 获取子品类列表
   */
  getCategoryList(getCategoryList) {
    return _mm.request({
      type: 'post',
      url: "/manage/category/get_category.do",
      data: {
        categoryId: getCategoryList || 0
      }
    })
  }
}

export default Product
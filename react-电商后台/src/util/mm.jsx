class MUtil {
  request(param){
    return new Promise((resolve, reject) => {
      $.ajax({
        type        : param.type      || 'get',
        url         : param.url       || "",
        dataType    : param.dataType  || 'json',
        data        : param.data      || null,
        success     : res => {
          if (0 === res.status) {
            typeof resolve === 'function' && resolve(res.data, res.msg);
          } else if (10 === res.status) {
            this.doLogin();
          } else {
            typeof reject === 'function' && reject(res.msg || res.data);
          }
        },
        error       : err => {
          typeof reject === 'function' && reject(err.statusText);
        }
      })
    })
  };

  // 跳转登录
  doLogin(){
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
  }

  // 获取URL参数
  getUrlParam(name){ 
    // xxx.com?param=123&param1=456
    const queryString = window.location.search.split('?')[1] || ''
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
    const regResult = queryString.match(reg);
    return regResult ? decodeURIComponent(regResult[2]) : null;
  }

  successTips(successMsg){
    alert(successMsg || '操作成功')
  }

  errorTips(errMsg){
    alert(errMsg || 'none')
  }

    // localStorage存储
  setStorage(name, data){
    const dataType = typeof data;
    if(dataType === 'object'){
      window.localStorage.setItem(name, JSON.stringify(data))
    } else if (['number','string', 'boolean'].indexOf(dataType) >= 0){
      window.localStorage.setItem(name, data)
    } else {
      alert('该类型不能用于本地存储')
    }
  }

  // 取出localStorage存储内容
  getStorage(name){
    const data = window.localStorage.getItem(name);
    if(data){
      return JSON.parse(data);
    } else {
      return ''
    }
  }

  // 删除localStorage内容
  removeStorage(name) {
    window.localStorage.removeItem(name)
  }
}

export default MUtil;
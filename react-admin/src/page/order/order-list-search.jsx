import React from 'react'


class ListSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      orderNo : ""
    }
  }

  onValueChange(e) {
    const name = e.target.name, 
          value = e.target.value.trim();
    this.setState({
      [name]: value
    }, () => {
      if(this.state.orderNo == ''){
        this.onSearch()
      }
    })
  }

  onSearch = () => {
    this.props.onSearch(this.state.orderNo)
  }

  onSearchKeywordKeyUp(e) {
    if(e.keyCode === 13){
      this.onSearch();
    }
  }

  render() {
    return (
      <div className="form-inline search-wrap">
        <div className="form-group">
          <select 
            className="form-control"
          >
            <option value="productId">按订单号查询</option>
          </select>
        </div>
        <div className="form-group">
          <input 
            className="form-control" 
            name='orderNo'
            onChange={(e) => this.onValueChange(e)}
            onKeyUp={e => this.onSearchKeywordKeyUp(e)}
          />
        </div>
        <button 
          className="btn btn-primary"
          onClick={e => this.onSearch(e)}
        >搜索</button>
      </div>
    )
  }
}

export default ListSearch



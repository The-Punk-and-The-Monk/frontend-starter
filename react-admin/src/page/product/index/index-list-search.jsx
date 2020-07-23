import React from 'react'


class ListSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchType    : "productId", // productId / productName
      searchKeyword : ""
    }
  }

  onValueChange(e) {
    const name = e.target.name, 
          value = e.target.value.trim();
    this.setState({
      [name]: value
    }, () => {
      this.onSearch()
    })
  }

  onSearch = () => {
    this.props.onSearch(this.state.searchType, this.state.searchKeyword)
  }

  onSearchKeywordKeyUp(e) {
    if(e.keyCode === 13){
      this.onSearch();
    }
  }

  onKeyDown = (e) => {
    if (this.state.searchType === 'productId' && !(e.key.match(/\d/) || e.key == 'Backspace' || e.key === 'Enter')) {
      e.preventDefault()
    }
  }

  render() {
    return (
      <div className="form-inline search-wrap">
        <div className="form-group">
          <select 
            className="form-control"
            name='searchType'
            onChange={(e) => this.onValueChange(e)}
          >
            <option value="productId">按商品ID查询</option>
            <option value="productName">按商品名称查询</option>
          </select>
        </div>
        <div className="form-group">
          <input 
            className="form-control" 
            name='searchKeyword'
            onChange={(e) => this.onValueChange(e)}
            onKeyDown={this.onKeyDown}
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



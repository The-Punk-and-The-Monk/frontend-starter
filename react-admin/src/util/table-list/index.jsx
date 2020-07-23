import React from 'react';

class TableList extends React.Component{
  render() {
    // 表头信息
    const tableHeader = this.props.tableHeads.map(
      (tableHead, index) => <th key={tableHead + '-' + index}>{tableHead}</th>
    )

    // 列表内容
    const listBody = this.props.children 

    //列表的信息
    const listInfo = (
      <tr>
        <td colSpan={this.props.tableHeads.lenght} className='text-center'>没有找到相应的结果</td>
      </tr>
    )

  const tableBody = listBody.length > 0 ? listBody : listInfo

    return (
      <div className='row'>
        <div className="col-md-12">
          <table className='table table-striped table-border'>
            <thead>
              <tr>
                {tableHeader}
              </tr>
            </thead>
            <tbody>
              {tableBody}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default TableList


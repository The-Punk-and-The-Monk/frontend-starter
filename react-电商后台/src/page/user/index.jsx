import React from 'react';
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'util/pagination/index.jsx'

import Util    from 'util/mm.jsx'
const _mm = new Util()
import User from 'service/user-service.jsx'
const _user = new User();

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list : [],
      pageNum : 1
    }
  }

  componentDidMount(){
    this.loadUserList();
  }

  loadUserList() {
    _user.getUserList(this.state.pageNum).then(res => {
      this.setState(res)
    }, errMsg => {
      this.setState({
        list: [],
      })
      _mm.errorTips(errMsg)
    })
  }

  onPageNumChange(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadUserList();
    })
  }

  render() {
    const listBody = this.state.list.map(
      (user, index) => {
        return (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{new Date(user.createTime).toLocaleString()}</td>
          </tr>
        );
      })
    
      const listError = (
        <tr>
          <td colSpan={5} className='text-center'>没有找到相应的结果</td>
        </tr>
      )

    const tableBody = this.state.list.length > 0 ? listBody : listError 

    return (
      <div id='page-wrapper'>
        <PageTitle title="用户列表" />
        <div className='row'>
          <div className="col-md-12">
            <table className='table table-striped table-border'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>用户名</th>
                  <th>邮箱</th>
                  <th>电话</th>
                  <th>注册时间</th>
                </tr>
              </thead>
              <tbody>
                {tableBody}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination current={this.state.pageNum} total={this.state.total} onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
      </div>
    )
  }
}

export default UserList
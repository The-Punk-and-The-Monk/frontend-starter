import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store'
import {
  ListItem,
  ListInfo,
  LoadMore
} from '../style'

class List extends Component {
  render() {
    const { articleList, getMoreList, articlePage } = this.props
    return ( 
      <div>
        {
          articleList.map((item, index) => {
            return (
              <ListItem key={item.get('title') + item.get('id') + index}>
                <img 
                  className='list-pic'
                  src={item.get('imgUrl')}
                  alt=''
                />
                <ListInfo>
                  <h3 className='title'>{item.get('title')}</h3>
                  <p className='desc'>{item.get('desc')}</p>
                </ListInfo>
              </ListItem>
            )
          })
        }
        <LoadMore onClick={() => getMoreList(articlePage)}>阅读更多</LoadMore>
      </div>
      
    )
  }
}

const mapState = (state) => {
  return {
    articleList: state.get('home').get('articleList'),
    articlePage: state.get('home').get('articlePage')
  }
}

const mapDispatch = (dispatch) => ({
  getMoreList(articlePage) {
    dispatch(actionCreators.getMoreList(articlePage))
  }
})

export default connect(mapState, mapDispatch)(List);
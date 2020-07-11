import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store'
// import { Link } from 'react-router-dom'
import {
  ListItem,
  ListInfo,
  LoadMore,
  StyledLink
} from '../style'

class List extends PureComponent {
  render() {
    const { articleList, getMoreList, articlePage } = this.props
    return ( 
      <div>
        {
          articleList.map((item, index) => {
            return (
                <ListItem key={item.get('title') + item.get('id') + index}>
                  <StyledLink to={'/detail/' + item.get('id')}>
                    <img 
                      className='list-pic'
                      src={item.get('imgUrl')}
                      alt=''
                    />
                  </StyledLink>
                  <ListInfo>
                    <StyledLink to={'/detail/' + item.get('id')}>
                      <h3 className='title'>{item.get('title')}</h3>
                    </StyledLink>
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
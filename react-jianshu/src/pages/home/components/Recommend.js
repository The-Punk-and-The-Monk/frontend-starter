import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  RecommendWrapper,
  RecommendItem
} from '../style'

class Recommend extends Component {
  render() {
    const { recommendList } = this.props

    return (
      <RecommendWrapper>
        {
          recommendList.map((item) => (
            <RecommendItem
              key={item.get('imgUrl') + item.get('id')}
              imgUrl={item.get('imgUrl')}
            >
            </RecommendItem>
          ))
        }
      </RecommendWrapper>
    )
  }
}


const mapState = (state) => ({
  recommendList: state.get('home').get('recommendList')
})

export default connect(mapState, null)(Recommend);
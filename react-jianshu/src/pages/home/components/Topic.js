import React, { Component } from 'react';
import { connect } from 'react-redux'
import { 
  TopicWrapper,
  TopicItem
} from '../style'

class Topic extends Component {
  render() {
    const { topicList } = this.props
    return (
      <TopicWrapper>
        {
          topicList.map((item) => {
            return (
              <TopicItem key={item.get('title') + item.get('id')}>
                <img 
                  src={item.get('imgUrl')}
                  className='topic-pic'
                  alt='failed'
                />
                {item.get('title')}
              </TopicItem>
            )
          })
        }
      </TopicWrapper>
    )
  }
}

const mapState = (state) => ({
  topicList: state.get('home').get('topicList')
})

export default connect(mapState, null)(Topic);
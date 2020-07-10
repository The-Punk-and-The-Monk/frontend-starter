import React, { Component } from 'react';
import store from './store/index';
import { connect } from 'react-redux';

const TodoList = (props) => {
  const { inputValue, changeInputValue, handleClick, list } = props

  return (
    <div>
      <div>
        <input 
          value={inputValue}
          onChange={changeInputValue}
        />
        <button 
          onClick={handleClick}
        >提交</button>
      </div>
      <ul>
        {
          list.map((item, index) => {
            return (
              <li key={item}>{item}</li>
            )
          })
        }
      </ul>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeInputValue(e) {
      const action = {
        type: 'change_input_value',
        value: e.target.value
      }
      console.log(e)
      dispatch(action)
    },

    handleClick(e) {
      const action = {
        type: 'add_item',
      }
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
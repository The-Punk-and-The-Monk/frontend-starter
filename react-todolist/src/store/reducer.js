const defaultState = {
  inputValue: '',
  list: []
}

export default (prevState = defaultState, action) => {
  if (action.type === 'change_input_value') {
    const newState = JSON.parse(JSON.stringify(prevState));
    newState.inputValue = action.value;
    return newState;
  }

  if (action.type === 'add_item') {
    const newState = JSON.parse(JSON.stringify(prevState));
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    return newState
  }

  return prevState;
}
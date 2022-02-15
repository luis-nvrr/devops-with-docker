let currentNotification

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      return { message: action.data.message, type: action.data.type }

    case 'DELETE_NOTIFICATION':
      return {}

    default:
      return state
  }
}

export const setNotification = (message, type, time) => {
  clearTimeout(currentNotification)
  return (dispatch) => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: { message, type }
    })

    currentNotification = setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

const removeNotification = () => {
  return {
    type: 'DELETE_NOTIFICATION'
  }
}
export default reducer

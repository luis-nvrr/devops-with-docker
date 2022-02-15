import userService from '../services/user'
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_USERS':
      return action.payload.users
    case 'CREATE_USER':
      return [...state, action.payload.user]
    default:
      return state
  }
}

export const initialize = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({ type: 'INITIALIZE_USERS', payload: { users } })
  }
}

export const createUser = (userData) => {
  return async (dispatch) => {
    try {
      const userCreated = await userService.register(userData)
      dispatch({ type: 'CREATE_USER', payload: { user: userCreated } })
    } catch (error) {
      dispatch(setNotification('User could not be created', 'error', 5))
    }
  }
}

export default reducer

import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOADUSER':
      return action.payload.user

    case 'LOGIN':
      return action.payload.user

    case 'LOGOUT':
      return null

    case 'DENEGATE':
      return null

    default:
      return state
  }
}

export const loginUser = (loginData) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(loginData)

      window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch({ type: 'LOGIN', payload: { user } })
      dispatch(setNotification('Logged in', 'success', 5))
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 'error', 5))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    blogService.removeToken()
    dispatch({ type: 'LOGOUT' })
    dispatch(setNotification('Logged out', 'success', 5))
  }
}

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const localStorageUser = JSON.parse(loggedUserJSON)
      dispatch({ type: 'LOADUSER', payload: { user: localStorageUser } })
      blogService.setToken(localStorageUser.token)
    } else {
      dispatch({ type: 'DENEGATE' })
    }
  }
}

export default reducer

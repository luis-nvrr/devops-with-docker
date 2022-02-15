import axios from 'axios'
import apiClient from './config'

const baseUrl = `${apiClient}/blogs`

let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const removeToken = () => {
  token = null
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const update = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

const comment = async (blog, comment) => {
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, comment)
  return response.data
}

export default { getAll, create, setToken, removeToken, update, remove, comment }

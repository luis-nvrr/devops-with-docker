import axios from 'axios'
import apiClient from './config'

const baseUrl = `${apiClient}/login`

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }

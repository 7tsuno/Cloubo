import axios from 'axios'
import { DOMAIN } from 'constants/api'
import { PAGE } from 'constants/page'

axios.defaults.baseURL = DOMAIN
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    config.headers.authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const getOptionsWithPayload = (api, payload) => {
  switch (api.config.method) {
    case 'GET':
      return {
        params: payload
      }
    case 'POST':
      return {
        data: payload
      }
    case 'DELETE':
      return {
        url: `${api.config.url}/${payload}`
      }
  }
}

export const useSender = (api) => {
  const sender = async (payload) => {
    const options = getOptionsWithPayload(api, payload)
    try {
      const result = await axios({
        ...api.config,
        ...options
      })
      return result
    } catch (error) {
      window.location.href = PAGE.login.path
    }
  }

  return [sender]
}

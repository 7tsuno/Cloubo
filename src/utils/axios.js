import axios from 'axios'
import { DOMAIN } from 'constants/api'
import { PAGE } from 'constants/page'

axios.defaults.withCredentials = true

const baseOptions = {
  baseURL: DOMAIN,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
}

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
        ...baseOptions,
        ...api.config,
        ...options
      })
      return { result, error: {} }
    } catch (error) {
      console.error(error.toString())
      window.location.href = PAGE.login.path
      return { result: {}, error }
    }
  }

  return [sender]
}

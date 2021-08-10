import axios, { AxiosRequestConfig } from 'axios'
import { DOMAIN } from 'constants/api'

if (DOMAIN) {
  axios.defaults.baseURL = DOMAIN
}
axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'

const getOptionsWithPayload = (
  api: { config: AxiosRequestConfig },
  payload: any
) => {
  switch (api.config.method) {
    case 'GET':
      return {
        params: payload,
      }
    case 'POST':
      return {
        data: payload,
      }
    case 'DELETE':
      return {
        url: `${api.config.url}/${payload}`,
      }
  }
}

export const auth0Axios =
  <T, U>(api: { config: AxiosRequestConfig }) =>
  async (payload: T, token: string): Promise<U> => {
    const options = getOptionsWithPayload(api, payload)
    const result = await axios({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...api.config,
      ...options,
    })
    return result.data
  }

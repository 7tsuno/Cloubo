import { AxiosRequestConfig } from 'axios'

export const DOMAIN = process.env.REACT_APP_API_ENDPOINT

export const API: { [NAME: string]: { config: AxiosRequestConfig } } = {
  GET_RECORDS: {
    config: {
      url: '/api/v1/records',
      method: 'GET',
    },
  },
  POST_RECORD: {
    config: {
      url: '/api/v1/records',
      method: 'POST',
    },
  },
  DELETE_RECORD: {
    config: {
      url: '/api/v1/records',
      method: 'DELETE',
    },
  },
}

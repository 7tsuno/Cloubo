export const DOMAIN = process.env.REACT_APP_API_ENDPOINT

console.log(DOMAIN)

export const API = {
  LOGIN: {
    config: {
      url: '/api/v1/login',
      method: 'POST'
    },
    options: { manual: true }
  },
  GET_RECORDS: {
    config: {
      url: '/api/v1/records',
      method: 'GET'
    },
    options: { manual: true }
  },
  POST_RECORD: {
    config: {
      url: '/api/v1/records',
      method: 'POST'
    },
    options: { manual: true }
  },
  DELETE_RECORD: {
    config: {
      url: '/api/v1/records',
      method: 'DELETE'
    },
    options: { manual: true }
  }
}

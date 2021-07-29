import axios from 'axios'
import { makeUseAxios } from 'axios-hooks'
import { DOMAIN } from 'constants/api'
// import { PAGE } from 'constants/page'
import { JwtContext } from 'contexts/JwtContext'
import { useContext } from 'react'

export const useAxios = () =>
  makeUseAxios({
    axios: axios.create({
      baseURL: DOMAIN,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      responseType: 'json'
    })
  })

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
  const [jwt] = useContext(JwtContext)
  const [{ data, loading, error }, send] = useAxios()(
    {
      ...api.config,
      headers: {
        Authorization: jwt
      }
    },
    api.options
  )

  const sender = async (payload) => {
    const options = getOptionsWithPayload(api, payload)
    try {
      const result = await send(options)
      return { result, error: {} }
    } catch (error) {
      console.error(error.toString())
      // window.location.href = PAGE.error.path
      return { result: {}, error }
    }
  }

  return [[data, loading, error], sender]
}

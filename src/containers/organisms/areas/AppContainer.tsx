import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { getRecordsAsync } from 'stores/records'
import { useAuth0 } from '@auth0/auth0-react'
import { selectDate } from 'stores/date'

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  const dispatch = useAppDispatch()
  const { year } = useAppSelector(selectDate)
  const { getAccessTokenSilently } = useAuth0()
  const auth0Token = async (callBack: (token: string) => void) => {
    const accessToken = await getAccessTokenSilently()
    callBack(accessToken)
  }

  // 年が変わったらレコードを取り直す
  useEffect(() => {
    auth0Token((token) => {
      dispatch(
        getRecordsAsync({
          payload: {
            year,
          },
          token,
        })
      )
    })
  }, [year])
  return <>{children}</>
}

interface AppContainerProps {
  children: React.ReactNode
}

export default AppContainer

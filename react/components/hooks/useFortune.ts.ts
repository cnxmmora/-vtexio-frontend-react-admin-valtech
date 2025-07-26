// hooks/useFortune.ts
import { useEffect, useState } from 'react'
import { useLazyQuery } from 'react-apollo'
import GET_RANDO_COOKIE from '../../graphql/getRandomCookie.graphql'

export type FortuneType = {
  id: string
  CookieFortune: string
}

export const useFortune = () => {

  const [myFortune, setMyFortune] = useState<string | null>(null)
  const [luckyNumber, setLuckyNumber] = useState<string | null>(null)

  const [getDataCookie, { data: myCookie, loading }] = useLazyQuery(GET_RANDO_COOKIE, {
    fetchPolicy: 'no-cache',
  })


  useEffect(() => {
    if (myCookie?.getRandomCookieData) {
      if (myFortune != myCookie?.getRandomCookieData?.CookieFortune) {
        setMyFortune(myCookie?.getRandomCookieData?.CookieFortune)
      } else {
        getDataCookie()
      }
      setLuckyNumber(generateLuckyNumber())
    }
  }, [myCookie])

  const generateLuckyNumber = () => {
    const random = () => Math.floor(10 + Math.random() * 90)
    return `${random()} ${random()} ${random()}`
  }

  const handleClick = () => {
    setLuckyNumber(generateLuckyNumber())
    getDataCookie()
  }

  return {
    loading,
    myFortune,
    luckyNumber,
    handleClick,
  }
}


// components/FortuneCookie.tsx
import React from 'react'
import FortuneButton from './FortuneButton'
import { useFortune } from '../hooks/useFortune.ts'

type Props = {
 content:string;
 subtitleContent:string;
}

const FortuneCookie = ({content,subtitleContent}:Props) => {
  const { loading, myFortune, luckyNumber, handleClick } = useFortune()

  return (
    <FortuneButton
    subTitle={subtitleContent}
      buttonTitle={content}
      loading={loading}
      myFortune={myFortune}
      luckyNumber={luckyNumber}
      onClick={handleClick}
    />
  )
}


export default FortuneCookie

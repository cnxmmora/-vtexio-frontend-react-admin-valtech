import "./styles.css"
import React from 'react'
import { Spinner } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { index as RichText } from 'vtex.rich-text'

type Props = {
    buttonTitle: string | null
    subTitle: string | null
    loading: boolean
    myFortune: string | null
    luckyNumber: string | null
    onClick: () => void
}

const CSS_HANDLES = [
    'container',
    'button',
    'fortune',
    'lucky',
    'flex',
    'discloure'
]

const FortuneButton = ({ loading, myFortune, luckyNumber, onClick, buttonTitle, subTitle }: Props) => {

    const handles = useCssHandles(CSS_HANDLES);

    return (
        <div className={`${handles.container}`}>
            {loading ?
                <Spinner size={30} />
                :
                <div className={`${handles.discloure}`}>

                    {myFortune ?
                        <>
                            <button className={`${handles.button}`} onClick={onClick}>
                                <h3 className={`${handles.fortune}`}>{myFortune}</h3>
                            </button>
                            <div className={`${handles.flex}`}>
                                {subTitle && <RichText text={subTitle + "\n"+ luckyNumber} />}
                            </div>

                        </>
                        :
                        <button className={`${handles.button}`} onClick={onClick}>
                            {buttonTitle && <RichText text={buttonTitle} />}
                        </button>
                    }
                </div>
            }
        </div>
    )
}

export default FortuneButton

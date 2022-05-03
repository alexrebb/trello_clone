import CardAction from './CardActions'
import { Cards } from '../../types'
import { memo } from 'react'

interface props {
    cardState: Cards
}
const CardActionList: React.FC<props> = ({ cardState }) => {
    return (
        <>
            {cardState.cardData?.map((data) => (
                <CardAction
                    key={data.cardDataId}
                    action={data.action}
                    date={data.date}
                />
            ))}
        </>
    )
}

export default memo(CardActionList)

import CardAction from './CardActions'
import { memo } from 'react'
import { useRecoilValue } from 'recoil'
import { CardActionsState } from '../../store/atoms'

const CardActionList = () => {
    const currentActionList = useRecoilValue(CardActionsState)

    return (
        <>
            {currentActionList?.map((data) => (
                <CardAction
                    key={data.actionId}
                    action={data.action}
                    date={data.date}
                />
            ))}
        </>
    )
}

export default memo(CardActionList)

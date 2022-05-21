import Action from './Action'
import { memo } from 'react'
import { useRecoilValue } from 'recoil'
import { CardActionsState } from '../../store/atoms'

const ActionsList = () => {
    const currentActionList = useRecoilValue(CardActionsState)

    return (
        <>
            {currentActionList?.map((data) => (
                <Action
                    key={data.actionId}
                    action={data.action}
                    date={data.date}
                />
            ))}
        </>
    )
}

export default memo(ActionsList)

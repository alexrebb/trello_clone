import Card from './Card'
import { memo } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useSetRecoilState } from 'recoil'
import {
    CardIdState,
    isOpenModalState,
    CardActionsState,
} from '../../store/atoms'
import ActionsProvider from '../../services/ActionsProvider'

interface props {
    cardTitle: string
    cardId: string
    listId: string
    index: number
}

const CardContainer: React.FC<props> = ({
    cardTitle,
    cardId,
    index,
    listId,
}) => {
    const setActionListState = useSetRecoilState(CardActionsState)
    const setCardId = useSetRecoilState(CardIdState)
    const setIsOpemModal = useSetRecoilState(isOpenModalState)

    const onOpenModalCard = () => {
        setIsOpemModal(true)
        setCardId({
            cardId: cardId,
            listId: listId,
        })
        ActionsProvider.getCurrentActionList(cardId).then((res: any) => {
            if (res.errors) {
                console.log('Ошибка')
            } else {
                setActionListState(res)
            }
        })
    }

    return (
        <Draggable draggableId={cardId} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Card
                        onOpenModalCard={onOpenModalCard}
                        cardTitle={cardTitle}
                    />
                </div>
            )}
        </Draggable>
    )
}

export default memo(CardContainer)

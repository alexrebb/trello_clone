import styled from 'styled-components/macro'
import { HiOutlinePencil } from 'react-icons/hi'
import { memo } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useSetRecoilState } from 'recoil'
import {
    CardIdState,
    isOpenModalState,
    CardActionsState,
} from '../../store/atoms'
import { FaRegCommentDots } from 'react-icons/fa'
import ActionsProvider from '../../service/ActionsProvider'

const StyledIcon = styled.span`
    color: rgba(128, 128, 128, 0.9);
    display: none;
    margin-right: 5px;
`
const StyledCard = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    padding: 10px;
    margin: 5px 0;
    cursor: pointer;
    word-break: break-all;
    z-index: 2;
    &:hover {
        background-color: rgb(235, 236, 240);
        ${StyledIcon} {
            display: flex;
        }
    }
`
const StyledIconsWrapper = styled.div`
    display: flex;
`
const StyledActionAmountWrapper = styled.div`
    display: flex;
    align-items: center;
    color: rgba(128, 128, 128, 0.9);
    font-size: 14px;
`

interface props {
    cardTitle: string
    cardId: string
    listId: string
    index: number
}

const Card: React.FC<props> = ({ cardTitle, cardId, index, listId }) => {
    const setActionListState = useSetRecoilState(CardActionsState)
    const setCardId = useSetRecoilState(CardIdState)
    const setIsOpemModal = useSetRecoilState(isOpenModalState)

    const handleClick = () => {
        setIsOpemModal(true)
        setCardId({
            cardId: cardId,
            listId: listId,
        })
        ActionsProvider.getCurrentActionList(listId, cardId).then(
            (res: any) => {
                if (res.status === 200) {
                    setActionListState(res.data)
                }
            }
        )
    }

    return (
        <Draggable draggableId={cardId} index={index}>
            {(provided) => (
                <StyledCard
                    onClick={handleClick}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <span>{cardTitle}</span>
                    <StyledIconsWrapper>
                        <StyledIcon>
                            <HiOutlinePencil />
                        </StyledIcon>
                        {/* {actionAmount ? (
                            <StyledActionAmountWrapper>
                                <>
                                    {actionAmount} <FaRegCommentDots />
                                </>
                            </StyledActionAmountWrapper>
                        ) : (
                            <></>
                        )} */}
                    </StyledIconsWrapper>
                </StyledCard>
            )}
        </Draggable>
    )
}

export default memo(Card)

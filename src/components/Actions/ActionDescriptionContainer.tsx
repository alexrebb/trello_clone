import AddCardActionDescriptionInputForm from './AddCardActionDescriptionInputForm'
import AddCardActionDescription from './AddCardActionDescription'
import { useState, memo, useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ListsState, CardIdState } from '../../store/atoms'
import produce from 'immer'
import CardsProvider from '../../services/CardsProvider'

interface props {
    cardDescription: string
}

const ActionDescriptionContainer: React.FC<props> = ({ cardDescription }) => {
    const [isOpenInputForm, setIsOpenInputForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [state, setState] = useRecoilState(ListsState)
    const cardState = useRecoilValue(CardIdState)
    const cardId = cardState.cardId
    const listId = cardState.listId

    const onChangeCardDescription = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            if (!inputValue) return
            setIsOpenInputForm(false)
            const currentListIndex = state.findIndex((l) => l.listId === listId)
            const currentCardIndex = state[currentListIndex].cards.findIndex(
                (c) => c.cardId === cardId
            )
            CardsProvider.changeCardDescription(inputValue, listId, cardId)

            setState(
                produce(state, (draftState) => {
                    draftState[currentListIndex].cards[
                        currentCardIndex
                    ].cardDescription = inputValue
                })
            )
            setInputValue('')
        },
        [cardId, inputValue, listId, setState, state]
    )

    return (
        <>
            {!isOpenInputForm ? (
                <AddCardActionDescription
                    setIsOpenInputForm={setIsOpenInputForm}
                    cardDescription={cardDescription}
                />
            ) : (
                <AddCardActionDescriptionInputForm
                    onChangeCardDescription={onChangeCardDescription}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    setIsOpenInputForm={setIsOpenInputForm}
                />
            )}
        </>
    )
}

export default memo(ActionDescriptionContainer)

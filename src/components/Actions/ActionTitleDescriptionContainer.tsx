import AddActionTitleDesciption from './AddActionTitleDesciption'
import AddActionTitleDescriptionInputForm from './AddActionTitleDescriptionInputForm'
import { useRecoilValue, useRecoilState } from 'recoil'
import { filteredCardState } from '../../store/selectors'
import { ListsState, CardIdState } from '../../store/atoms'
import { useState, memo, useCallback } from 'react'

import produce from 'immer'
import CardsProvider from '../../services/CardsProvider'
import loggerErrors from '../../utils/logger'

const CardTitleDescription = () => {
    const [isOpenInputForm, setIsOpenInputForm] = useState(false)
    const currentCard = useRecoilValue(filteredCardState)
    const [inputValue, setInputValue] = useState('')
    const [state, setState] = useRecoilState(ListsState)
    const cardState = useRecoilValue(CardIdState)
    const cardId = cardState.cardId
    const listId = cardState.listId
    const cardTitle = currentCard.cardTitle

    const handleCloseForm = useCallback(() => {
        setIsOpenInputForm(false)
    }, [])

    const handleOpenForm = useCallback(() => {
        setIsOpenInputForm(true)
    }, [])

    const onChangeCardTitle = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            if (!inputValue) return
            setIsOpenInputForm(false)
            const currentListIndex = state.findIndex((l) => l.listId === listId)
            const currentCardIndex = state[currentListIndex].cards.findIndex(
                (c) => c.cardId === cardId
            )
            CardsProvider.changeCardTitle(inputValue, listId, cardId).catch(
                (err) => loggerErrors(err)
            )

            setState(
                produce(state, (draftState) => {
                    draftState[currentListIndex].cards[
                        currentCardIndex
                    ].cardTitle = inputValue
                })
            )
            setInputValue('')
        },
        [cardId, inputValue, listId, setState, state]
    )

    return (
        <>
            {!isOpenInputForm ? (
                <AddActionTitleDesciption
                    cardTitle={cardTitle}
                    handleOpenForm={handleOpenForm}
                />
            ) : (
                <AddActionTitleDescriptionInputForm
                    handleCloseForm={handleCloseForm}
                    inputValue={inputValue}
                    onChangeCardTitle={onChangeCardTitle}
                    setInputValue={setInputValue}
                />
            )}
        </>
    )
}

export default memo(CardTitleDescription)

import AddCardBtn from './AddCardBtn'
import AddCardInputForm from './AddCardInputForm'
import { useState, memo, useCallback } from 'react'
import produce from 'immer'
import { useRecoilState } from 'recoil'
import { ListsState } from '../../store/atoms'
import { v4 as uuid } from 'uuid'
import CardsProvider from '../../services/CardsProvider'
import loggerErrors from '../../utils/logger'

interface props {
    listId: string
}

const AddCardContainer: React.FC<props> = ({ listId }) => {
    const [isOpenInputForm, setIsOpenInputForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [state, setState] = useRecoilState(ListsState)

    const handleCloseInput = useCallback(() => setIsOpenInputForm(false), [])
    const handleOpenInput = useCallback(() => setIsOpenInputForm(true), [])

    const onAddNewCardHandler = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            if (!inputValue) return
            const newCard = {
                cardId: uuid(),
                cardTitle: inputValue,
                cardDescription: '',
            }

            const currentListIndex: number = state.findIndex(
                (list) => list.listId === listId
            )
            if (currentListIndex === -1) return

            CardsProvider.createCard(listId, newCard).catch((err) =>
                loggerErrors(err)
            )

            setState(
                produce(state, (draftState) => {
                    draftState[currentListIndex].cards.push(newCard)
                })
            )
            setIsOpenInputForm(false)
            setInputValue('')
        },
        [inputValue, listId, setState, state]
    )

    return (
        <>
            {!isOpenInputForm ? (
                <AddCardBtn handleOpenInput={handleOpenInput} />
            ) : (
                <AddCardInputForm
                    onAddNewCardHandler={onAddNewCardHandler}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    handleCloseInput={handleCloseInput}
                />
            )}
        </>
    )
}

export default memo(AddCardContainer)
